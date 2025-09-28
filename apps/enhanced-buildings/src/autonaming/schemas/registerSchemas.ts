import { grisuVehicleTypeMapping } from "./grisu118/GrisuVehicleTypeMapping";
import { relaFireDepartment } from "./grisu118/rela/fire";
import { SchemaRegistry } from "./SchemaRegistry";

export const registerSchemas = () => {
  SchemaRegistry.INSTANCE.registerGlobalVehicleTypeMapping(grisuVehicleTypeMapping);

  SchemaRegistry.INSTANCE.register(relaFireDepartment);
};
