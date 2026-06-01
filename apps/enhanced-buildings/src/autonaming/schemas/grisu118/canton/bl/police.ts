import { BuildingType } from "@lss/api";
import { Schema } from "../../../Schema";
import { relaFederalPoliceStation, relaPoliceStation } from "../../rela/police";

export const blPoliceStation: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓KP Basel-Landschaft, [\w ]+ \[(?<nb>\d)]/,
  nameTemplate: "Birs {B_NB}{V_NB} {V_TYPE}",
  vehicleNamings: relaPoliceStation.vehicleNamings,
};

export const blPoliceStation1: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓KP Basel-Landschaft, [\w ]+ \[1(?<nb>\d)]/,
  nameTemplate: blPoliceStation.nameTemplate,
  vehicleNamings: blPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 100,
      end: it.numberRange.end + 100,
    },
  })),
};

export const blPoliceStation2: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓KP Basel-Landschaft, [\w ]+ \[2(?<nb>\d)]/,
  nameTemplate: blPoliceStation.nameTemplate,
  vehicleNamings: blPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 200,
      end: it.numberRange.end + 200,
    },
  })),
};

export const blFederalPoliceStation: Schema = {
  buildingType: BuildingType.FEDERAL_POLICE_STATION,
  nameRegex: /^🚓B-KP Basel-Landschaft, [\w ]+ \[(?<nb>\d+)]/,
  nameTemplate: blPoliceStation.nameTemplate,
  vehicleNamings: relaFederalPoliceStation.vehicleNamings,
};
