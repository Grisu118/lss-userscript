import { Schema } from "../../Schema";
import { relaHeavyRescue } from "../rela/heavy_rescue";

export const zsoHeavyRescue: Schema = {
  ...relaHeavyRescue,
  nameRegex: /^⚙️(?<org>[A-Z -]+)\[(?<nb>\d+)].*/,
};
