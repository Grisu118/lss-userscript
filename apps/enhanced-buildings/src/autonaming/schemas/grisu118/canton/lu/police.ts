import { BuildingType } from "@lss/api";
import { Schema } from "../../../Schema";
import { relaFederalPoliceStation, relaPoliceStation } from "../../rela/police";

export const luPoliceStation: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓KP Luzern, \w+ \[(?<nb>\d)]/,
  nameTemplate: "Pilatus {B_NB}{V_NB} {V_TYPE}",
  vehicleNamings: relaPoliceStation.vehicleNamings,
};

export const luPoliceStation1: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓KP Luzern, \w+ \[1(?<nb>\d)]/,
  nameTemplate: luPoliceStation.nameTemplate,
  vehicleNamings: luPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 100,
      end: it.numberRange.end + 100,
    },
  })),
};

export const luPoliceStation2: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓KP Luzern, \w+ \[2(?<nb>\d)]/,
  nameTemplate: luPoliceStation.nameTemplate,
  vehicleNamings: luPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 200,
      end: it.numberRange.end + 200,
    },
  })),
};

export const luFederalPoliceStation: Schema = {
  buildingType: BuildingType.FEDERAL_POLICE_STATION,
  nameRegex: /^🚓B-KP Luzern, \w+ \[(?<nb>\d+)]/,
  nameTemplate: luPoliceStation.nameTemplate,
  vehicleNamings: relaFederalPoliceStation.vehicleNamings,
};
