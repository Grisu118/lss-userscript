import { BuildingType } from "@lss/api";
import { Schema } from "../../Schema";
import { relaFederalPoliceStation, relaPoliceStation } from "../rela/police";

export const agPoliceStation: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓KP Aargau, \w+ \[(?<nb>\d+)]/,
  nameTemplate: "Wyna {B_NB}{V_NB} {V_TYPE}",
  vehicleNamings: relaPoliceStation.vehicleNamings,
};

export const agRegionalPoliceStation: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓([RS])P [\w -üäö]+ \[(?<nb>\d+)].*/,
  nameTemplate: agPoliceStation.nameTemplate,
  vehicleNamings: agPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 100,
      end: it.numberRange.end + 100,
    },
  })),
};
export const agRegionalPoliceStation2: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓([RS])P [\w -üäö]+ \((?<nb>\d+)\).*/,
  nameTemplate: agPoliceStation.nameTemplate,
  vehicleNamings: agPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 200,
      end: it.numberRange.end + 200,
    },
  })),
};

export const agFederalPoliceStation: Schema = {
  buildingType: BuildingType.FEDERAL_POLICE_STATION,
  nameRegex: /^🚓B-KP Aargau, \w+ \[(?<nb>\d+)]/,
  nameTemplate: agPoliceStation.nameTemplate,
  vehicleNamings: relaFederalPoliceStation.vehicleNamings,
};

export const agFederalRegionalPoliceStation: Schema = {
  buildingType: BuildingType.FEDERAL_POLICE_STATION,
  nameRegex: /^🚓B-([RS])P [\w -üäö]+ \[(?<nb>\d+)].*/,
  nameTemplate: agPoliceStation.nameTemplate,
  vehicleNamings: agFederalPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 100,
      end: it.numberRange.end + 100,
    },
  })),
};

export const agFederalRegionalPoliceStation2: Schema = {
  buildingType: BuildingType.FEDERAL_POLICE_STATION,
  nameRegex: /^🚓B-([RS])P [\w -üäö]+ \((?<nb>\d+)\).*/,
  nameTemplate: agPoliceStation.nameTemplate,
  vehicleNamings: agFederalPoliceStation.vehicleNamings.map((it) => ({
    ...it,
    numberRange: {
      start: it.numberRange.start + 200,
      end: it.numberRange.end + 200,
    },
  })),
};
