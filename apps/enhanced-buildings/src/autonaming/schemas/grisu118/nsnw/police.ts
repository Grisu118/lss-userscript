import { BuildingType } from "@lss/api";
import { Schema } from "../../Schema";
import { relaPoliceStation } from "../rela/police";

export const nsnwPoliceStation: Schema = {
  buildingType: BuildingType.HIGHWAY_PATROL,
  nameRegex: /^🚓NSNW \w+ \[(?<nb>\d+)]/,
  nameTemplate: "NSNW {B_NB}{V_NB} {V_TYPE}",
  vehicleNamings: relaPoliceStation.vehicleNamings,
};
