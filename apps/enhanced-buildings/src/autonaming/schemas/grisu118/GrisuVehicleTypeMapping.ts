import { VehicleType } from "@lss/api";
import { VehicleTypeMapping } from "../Schema";

export const grisuVehicleTypeMapping: VehicleTypeMapping = {
  [VehicleType.HLF_20]: "HTLF",
  [VehicleType.HLF_10]: "HTLF",
  [VehicleType.HLF_TRAIN]: "HTLF-S",
};
