import { VehicleType } from "@lss/api";
import { VehicleTypeMapping } from "../Schema";

export const grisuVehicleTypeMapping: VehicleTypeMapping = {
  [VehicleType.FD_HLF_20]: "HTLF",
  [VehicleType.FD_HLF_10]: "HTLF",
  [VehicleType.FD_HLF_TRAIN]: "HTLF-S",
  [VehicleType.FD_ELW1]: "KDF",
  [VehicleType.FD_ELW1_DRONE]: "KDF",
  [VehicleType.FD_ELW2]: "ELF",
  [VehicleType.FD_ELW2_DRONE]: "ELF",
  [VehicleType.FD_MTW]: "PTF",
  [VehicleType.FD_DLK23]: "HRF",
  [VehicleType.FD_GWM]: "MGF",
};
