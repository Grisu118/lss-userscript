import {
  agFederalPoliceStation,
  agFederalRegionalPoliceStation,
  agFederalRegionalPoliceStation2,
  agPoliceStation,
  agRegionalPoliceStation,
  agRegionalPoliceStation2,
} from "./grisu118/canton/police";
import { grisuVehicleTypeMapping } from "./grisu118/GrisuVehicleTypeMapping";
import { relaFireDepartment } from "./grisu118/rela/fire";
import { relaMedic, relaSeg } from "./grisu118/rela/medic";
import { relaFederalPoliceStation, relaPoliceStation } from "./grisu118/rela/police";
import { SchemaRegistry } from "./SchemaRegistry";

export const registerSchemas = () => {
  SchemaRegistry.INSTANCE.registerGlobalVehicleTypeMapping(grisuVehicleTypeMapping);

  SchemaRegistry.INSTANCE.register(
    relaFireDepartment,
    relaMedic,
    relaSeg,
    relaPoliceStation,
    relaFederalPoliceStation,
    agPoliceStation,
    agFederalPoliceStation,
    agRegionalPoliceStation,
    agFederalRegionalPoliceStation,
    agRegionalPoliceStation2,
    agFederalRegionalPoliceStation2,
  );
};
