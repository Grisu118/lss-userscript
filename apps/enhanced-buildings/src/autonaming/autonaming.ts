import { Building } from "@lss/api";
import { registerSchemas } from "./schemas/registerSchemas";
import { SchemaRegistry } from "./schemas/SchemaRegistry";
import { VehicleManager } from "./VehicleManager";

registerSchemas();

export const autonaming = async (currentBuilding: Building): Promise<void> => {
  console.log("Load Autonaming for building", currentBuilding);
  // lookup if we have a naming scheme for this building
  const schema = SchemaRegistry.INSTANCE.getForBuilding(currentBuilding);
  if (!schema) {
    return;
  }
  console.log("Found schema for building", schema);

  // setup vehicle manager
  const vehicleManager = new VehicleManager(schema, currentBuilding);
  await vehicleManager.displayNamingStatus();
};
