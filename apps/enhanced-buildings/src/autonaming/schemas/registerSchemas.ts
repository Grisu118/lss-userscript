import {
  agFederalPoliceStation,
  agFederalRegionalPoliceStation,
  agFederalRegionalPoliceStation2,
  agPoliceStation,
  agRegionalPoliceStation,
  agRegionalPoliceStation2,
} from "./grisu118/canton/ag/police";
import { grisuVehicleTypeMapping } from "./grisu118/GrisuVehicleTypeMapping";
import { relaFireDepartment } from "./grisu118/rela/fire";
import { relaMedic, relaSeg } from "./grisu118/rela/medic";
import { relaFederalPoliceStation, relaPoliceStation } from "./grisu118/rela/police";
import { SchemaRegistry } from "./SchemaRegistry";
import { zsoSeg } from "./grisu118/zso/medic";
import { relaHeavyRescue } from "./grisu118/rela/heavy_rescue";
import { zsoHeavyRescue } from "./grisu118/zso/heavy_rescue";
import { nsnwPoliceStation } from "./grisu118/nsnw/police";
import {
  luFederalPoliceStation,
  luPoliceStation,
  luPoliceStation1,
  luPoliceStation2,
} from "./grisu118/canton/lu/police";
import {
  blFederalPoliceStation,
  blPoliceStation,
  blPoliceStation1,
  blPoliceStation2,
} from "./grisu118/canton/bl/police";
import { deFederalPoliceStation } from "./grisu118/germany/police";

export const registerSchemas = () => {
  SchemaRegistry.INSTANCE.registerGlobalVehicleTypeMapping(grisuVehicleTypeMapping);

  SchemaRegistry.INSTANCE.register(
    relaFireDepartment,
    relaMedic,
    relaSeg,
    relaPoliceStation,
    relaFederalPoliceStation,
    relaHeavyRescue,
    agPoliceStation,
    agFederalPoliceStation,
    agRegionalPoliceStation,
    agFederalRegionalPoliceStation,
    agRegionalPoliceStation2,
    agFederalRegionalPoliceStation2,
    nsnwPoliceStation,
    zsoSeg,
    zsoHeavyRescue,

    // lu
    luPoliceStation,
    luPoliceStation1,
    luPoliceStation2,
    luFederalPoliceStation,

    // bl
    blPoliceStation,
    blPoliceStation1,
    blPoliceStation2,
    blFederalPoliceStation,

    // germany
    deFederalPoliceStation,
  );
};
