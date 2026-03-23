import { BuildingType } from "@lss/api";
import { Schema } from "../../Schema";
import { relaFireDepartment } from "../rela/fire";
import { relaSeg } from "../rela/medic";

export const zsoSeg: Schema = {
  buildingType: BuildingType.MEDIC_SEG,
  nameRegex: /^⚕SEG (?<org>[A-Z ]+)\[(?<nb>\d+)].*/,
  nameTemplate: relaFireDepartment.nameTemplate,
  vehicleNamings: relaSeg.vehicleNamings,
};