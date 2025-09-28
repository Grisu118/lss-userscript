import type { Building, BuildingType, VehicleType } from "@lss/api";
import type { Schema, VehicleNamingSchema, VehicleTypeMapping } from "./Schema";

export class SchemaRegistry {
  public static readonly INSTANCE = new SchemaRegistry();
  private readonly schemasByType = new Map<BuildingType, Schema[]>();
  private globalVehicleTypeMapping?: VehicleTypeMapping;

  /**
   * Register one or more schemas
   * - Validates there is no overlap of numberRange and vehicleTypes within each schema.vehicleNamings
   */
  register(...schemas: Schema[]): void {
    for (const s of schemas) {
      this.validateVehicleNamings(s.vehicleNamings);

      const list = this.schemasByType.get(s.buildingType) ?? [];
      list.push(s);
      this.schemasByType.set(s.buildingType, list);
    }
  }

  registerGlobalVehicleTypeMapping(mapping?: VehicleTypeMapping) {
    this.globalVehicleTypeMapping = mapping;
  }

  /**
   * Get the first schema matching a building:
   * - building_type equals schema.buildingType
   * - caption matches schema.nameRegex
   */
  getForBuilding(building: Building): Schema | undefined {
    const candidates = this.schemasByType.get(building.building_type as BuildingType);
    if (!candidates?.length) return undefined;

    const caption = building.caption ?? "";
    return candidates.find((s) => s.nameRegex.test(caption));
  }

  getGlobalVehicleTypeMapping(): VehicleTypeMapping {
    return this.globalVehicleTypeMapping ?? {};
  }

  /**
   * Ensures:
   * - number ranges do not overlap pairwise
   * - vehicle types do not appear in more than one entry
   */
  private validateVehicleNamings(namings: VehicleNamingSchema[]): void {
    // Validate ranges don't overlap
    const ranges = namings.map((n) => n.numberRange);
    for (let i = 0; i < ranges.length; i++) {
      const a = ranges[i];
      if (a.start > a.end) {
        throw new Error(`Invalid numberRange: start (${a.start}) > end (${a.end})`);
      }
      for (let j = i + 1; j < ranges.length; j++) {
        const b = ranges[j];
        if (SchemaRegistry.rangesOverlap(a.start, a.end, b.start, b.end)) {
          throw new Error(
            `Overlapping numberRange detected: [${a.start}, ${a.end}] overlaps with [${b.start}, ${b.end}]`,
          );
        }
      }
    }

    // Validate vehicle types don't overlap
    const seen = new Set<VehicleType>();
    for (const n of namings) {
      const types = Array.isArray(n.vehicleTypes) ? n.vehicleTypes : [n.vehicleTypes];
      for (const t of types) {
        if (seen.has(t)) {
          throw new Error(`VehicleType ${t} is assigned in multiple vehicleNamings`);
        }
        seen.add(t as VehicleType);
      }
    }
  }

  private static rangesOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
    return Math.max(aStart, bStart) <= Math.min(aEnd, bEnd);
  }
}
