import { Building, renameVehicle, VehicleType } from "@lss/api";
import { getVehicle } from "@lss/storage";
import { CustomVehicleType, ExtendedVehicleType, Schema } from "./schemas/Schema";
import { SchemaRegistry } from "./schemas/SchemaRegistry";

export interface VehicleEntry {
  id: number;
  vehicleType: VehicleType;
  currentName: string;
  newName?: string;
  vehicleTypeCaption?: string;
}

interface ParsedBuildingName {
  org?: string;
  nb?: number;
}

export class VehicleManager {
  private static readonly RENAME_BTN_ID = "ehb-rename-btn";
  private readonly vehicles: VehicleEntry[];
  private readonly schema: Schema;
  private readonly buildingName: ParsedBuildingName;

  constructor(schema: Schema, building: Building) {
    this.schema = schema;
    this.buildingName = VehicleManager.parseBuildingName(schema, building);
    this.vehicles = this.parseVehicles();
    console.debug("Found the following vehicles", this.vehicles);
  }

  public displayNamingStatus = async () => {
    await this.calculateNamesOfVehicles();

    // show status of naming in vehicle table
    this.vehicles.forEach((vehicle, index) => {
      const rowIndex = index + 1; // CSS nth-child is 1-based
      const selector = `#vehicle_table > tbody > tr:nth-child(${rowIndex}) > td:nth-child(2) > a`;
      const cell = document.querySelector<HTMLAnchorElement>(selector);

      if (cell) {
        // Remove any existing emoji
        const existingEmoji = cell.querySelector(".naming-status-emoji");
        if (existingEmoji) {
          existingEmoji.remove();
        }

        // Determine which emoji to show
        let emoji = "";
        let title = "";
        if (!vehicle.newName) {
          // No new name - show question mark
          emoji = "❓";
        } else if (vehicle.currentName === vehicle.newName) {
          // Names are equal - show checkmark
          emoji = "✅";
        } else {
          // Names are different - show exclamation
          emoji = "❗";
          title = vehicle.newName;
        }

        // Create emoji element and append it
        const emojiSpan = document.createElement("span");
        emojiSpan.className = "naming-status-emoji";
        emojiSpan.textContent = " " + emoji;
        emojiSpan.style.marginLeft = "5px";
        emojiSpan.title = title;

        cell.appendChild(emojiSpan);
      }
    });

    // add btn to trigger rename
    if (this.vehicles.some((it) => it.newName && it.currentName !== it.newName)) {
      const container = document.querySelector<HTMLDivElement>(".form-actions");

      const btn = document.createElement("btn");
      btn.id = VehicleManager.RENAME_BTN_ID;
      btn.className = "btn btn-default";
      btn.textContent = "Rename Vehicles";
      btn.addEventListener("click", () => this.triggerRename());

      // remove existing btn
      container?.querySelector(`#${VehicleManager.RENAME_BTN_ID}`)?.remove();

      container?.append(btn);
    }
  };

  private triggerRename = async () => {
    console.log("renaming...");
    const button = document.querySelector<HTMLButtonElement>(`#${VehicleManager.RENAME_BTN_ID}`);
    if (!button) throw new Error("Cannot find button");

    button.classList.add("loading", "disabled");
    button.disabled = true;
    button.textContent = `Rename Vehicles 0 / ${this.vehicles.length}`;

    let index = 1;
    for (const vehicle of this.vehicles) {
      if (vehicle.newName && vehicle.currentName !== vehicle.newName) {
        await renameVehicle(vehicle.id, vehicle.newName);
        button.textContent = `Rename Vehicles ${index} / ${this.vehicles.length}`;
      }
      index++;
    }
    location.reload();
  };

  private calculateNamesOfVehicles = async () => {
    // Load vehicle cache if we have custom vehicle types
    if (this.schema.vehicleNamings.some((naming) => this.hasCustomVehicleTypes(naming.vehicleTypes))) {
      await this.loadVehicleCache();
    }

    // Clear any existing new names
    this.vehicles.forEach((vehicle) => {
      vehicle.newName = undefined;
    });

    // Process each vehicle naming schema
    for (const vehicleNaming of this.schema.vehicleNamings) {
      // Get vehicle types for this naming (handle both array and single type)
      const vehicleTypes = Array.isArray(vehicleNaming.vehicleTypes)
        ? vehicleNaming.vehicleTypes
        : [vehicleNaming.vehicleTypes];

      // Filter vehicles that match this naming's vehicle types and don't already have a new name
      const matchingVehicles = this.vehicles.filter(
        (vehicle) => this.vehicleMatchesTypes(vehicle, vehicleTypes) && !vehicle.newName,
      );

      // Sort vehicles: first by type order in the schema, then by id
      const sortedVehicles = matchingVehicles.sort((a, b) => {
        const typeIndexA = this.getVehicleTypeIndex(a, vehicleTypes);
        const typeIndexB = this.getVehicleTypeIndex(b, vehicleTypes);

        if (typeIndexA !== typeIndexB) {
          return typeIndexA - typeIndexB;
        }

        return a.id - b.id;
      });

      // Assign numbers from the range to sorted vehicles
      const { start, end } = vehicleNaming.numberRange;
      const availableNumbers = end - start + 1;

      // Only assign names up to the available range
      const vehiclesToName = sortedVehicles.slice(0, availableNumbers);

      vehiclesToName.forEach((vehicle, index) => {
        const vehicleNumber = start + index;
        const matchedType = this.getMatchedVehicleType(vehicle, vehicleTypes);
        vehicle.newName = this.generateVehicleName(vehicle, vehicleNumber, matchedType);
      });
    }
  };

  private async loadVehicleCache(): Promise<void> {
    try {
      // Update vehicle entries with vehicle_type_caption
      for (const vehicle of this.vehicles) {
        const cachedVehicleEntry = await getVehicle(vehicle.id);
        const cachedVehicle = cachedVehicleEntry.data;
        if (cachedVehicle?.vehicle_type_caption) {
          vehicle.vehicleTypeCaption = cachedVehicle.vehicle_type_caption;
        }
      }
    } catch (error) {
      console.warn("Failed to load vehicle cache:", error);
    }
  }

  private hasCustomVehicleTypes(vehicleTypes: ExtendedVehicleType | ExtendedVehicleType[]): boolean {
    const types = Array.isArray(vehicleTypes) ? vehicleTypes : [vehicleTypes];
    return types.some((type) => typeof type === "object" && "originalType" in type);
  }

  private vehicleMatchesTypes(vehicle: VehicleEntry, vehicleTypes: ExtendedVehicleType[]): boolean {
    return vehicleTypes.some((type) => {
      if (typeof type === "number") {
        // Regular VehicleType
        return vehicle.vehicleType === type;
      } else if (typeof type === "object" && "originalType" in type) {
        // CustomVehicleType
        const customType = type as CustomVehicleType;
        return vehicle.vehicleType === customType.originalType && vehicle.vehicleTypeCaption === customType.customType;
      }
      return false;
    });
  }

  private getVehicleTypeIndex(vehicle: VehicleEntry, vehicleTypes: ExtendedVehicleType[]): number {
    return vehicleTypes.findIndex((type) => {
      if (typeof type === "number") {
        return vehicle.vehicleType === type;
      } else if (typeof type === "object" && "originalType" in type) {
        const customType = type as CustomVehicleType;
        return vehicle.vehicleType === customType.originalType && vehicle.vehicleTypeCaption === customType.customType;
      }
      return false;
    });
  }

  private getMatchedVehicleType(
    vehicle: VehicleEntry,
    vehicleTypes: ExtendedVehicleType[],
  ): ExtendedVehicleType | undefined {
    return vehicleTypes.find((type) => {
      if (typeof type === "number") {
        return vehicle.vehicleType === type;
      } else if (typeof type === "object" && "originalType" in type) {
        const customType = type as CustomVehicleType;
        return vehicle.vehicleType === customType.originalType && vehicle.vehicleTypeCaption === customType.customType;
      }
      return false;
    });
  }

  private generateVehicleName = (
    vehicle: VehicleEntry,
    vehicleNumber: number,
    matchedType?: ExtendedVehicleType,
  ): string => {
    let template = this.schema.nameTemplate;

    // Replace organization placeholders
    if (this.buildingName.org) {
      template = template.replace(/{ORG}/g, this.buildingName.org);
      template = template.replace(/{ORG_CAP}/g, this.buildingName.org.toUpperCase());
    }

    // Replace building number
    if (this.buildingName.nb !== undefined) {
      template = template.replace(/{B_NB}/g, this.buildingName.nb.toString());
    }

    // Replace vehicle number
    template = template.replace(/{V_NB}/g, vehicleNumber.toString());

    // Replace vehicle type - handle CustomVehicleType
    let vehicleTypeMapping: string;

    if (matchedType && typeof matchedType === "object" && "customType" in matchedType) {
      // For CustomVehicleType, use the customType for templating
      vehicleTypeMapping = matchedType.customType;
    } else {
      // For regular VehicleType, use existing logic
      vehicleTypeMapping =
        this.schema.vehicleTypeMappings?.[vehicle.vehicleType] ??
        SchemaRegistry.INSTANCE.getGlobalVehicleTypeMapping()[vehicle.vehicleType] ??
        VehicleType[vehicle.vehicleType] ??
        vehicle.vehicleType.toString();
    }

    template = template.replace(/{V_TYPE}/g, vehicleTypeMapping);

    return template;
  };

  private parseVehicles = (): VehicleEntry[] => {
    const tableRows = document.querySelectorAll<HTMLTableRowElement>("#vehicle_table > tbody > tr");

    const entries: VehicleEntry[] = [];
    tableRows.forEach((tr) => {
      // first column: img with vehicle_type_id
      const img = tr.querySelector<HTMLImageElement>("td:nth-of-type(1) img");
      const vehicleTypeId = img?.getAttribute("vehicle_type_id");
      if (!vehicleTypeId) return;

      // second column: a with href and text
      const link = tr.querySelector<HTMLAnchorElement>("td:nth-of-type(2) a[href*='/vehicles/']");
      const href = link?.getAttribute("href") ?? "";
      const idStr = href.split("/").filter(Boolean).pop();
      if (!idStr) return;

      const caption = (link?.textContent ?? "").trim();
      if (!caption) return;

      const id = Number(idStr);
      const vehicleType = Number(vehicleTypeId) as VehicleType;

      if (Number.isNaN(id) || Number.isNaN(vehicleType)) throw new Error("id and vehicleType are not numbers");

      entries.push({
        id,
        currentName: caption,
        vehicleType,
      });
    });

    return entries;
  };

  private static parseBuildingName = (schema: Schema, building: Building): ParsedBuildingName => {
    const caption = building.caption ?? "";
    const match = schema.nameRegex.exec(caption);

    if (!match || !match.groups) {
      return {};
    }

    return {
      org: match.groups.org,
      nb: match.groups.nb ? Number(match.groups.nb) : undefined,
    };
  };
}
