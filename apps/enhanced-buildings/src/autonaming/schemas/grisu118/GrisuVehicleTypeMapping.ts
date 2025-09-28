import { VehicleType } from "@lss/api";
import { VehicleTypeMapping } from "../Schema";

export const grisuVehicleTypeMapping: VehicleTypeMapping = {
  [VehicleType.HLF_20]: "HTLF",
  [VehicleType.HLF_10]: "HTLF",
  [VehicleType.HLF_TRAIN]: "HTLF-S",
  [VehicleType.ELW1]: "KDF",
  [VehicleType.ELW1_DRONE]: "KDF",
  [VehicleType.ELW2]: "ELF",
  [VehicleType.ELW2_DRONE]: "ELF",
  [VehicleType.MTW]: "PTF",
  [VehicleType.DLK23]: "HRF",
  [VehicleType.GWM]: "MGF",
};
