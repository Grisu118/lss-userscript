import { BuildingType } from "@lss/api";
import { Schema } from "../../Schema";
import { relaFederalPoliceStation } from "../rela/police";

export const deFederalPoliceStation: Schema = {
  buildingType: BuildingType.FEDERAL_POLICE_STATION,
  nameRegex: /^🚓B-BP BW\[(?<nb>\d+)] \w+/,
  nameTemplate: "Friedrich {B_NB}/{V_NB} {V_TYPE}",
  vehicleNamings: relaFederalPoliceStation.vehicleNamings,
};
