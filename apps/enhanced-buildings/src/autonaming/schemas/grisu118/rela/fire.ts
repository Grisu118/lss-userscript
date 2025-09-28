import { BuildingType, VehicleType } from "@lss/api";
import { Schema } from "../../Schema";

export const relaFireDepartment: Schema = {
  buildingType: BuildingType.FIRE_STATION,
  nameRegex: /^🚒WF (?<org>Rela) Industries (?<nb>\d+).*/,
  nameTemplate: "{ORG_CAP} {B_NB}/{V_NB} {V_TYPE}",
  vehicleNamings: [
    {
      numberRange: {
        start: 1,
        end: 2,
      },
      vehicleTypes: [VehicleType.FD_ELW1, VehicleType.FD_ELW1_DRONE],
    },
    {
      numberRange: {
        start: 3,
        end: 3,
      },
      vehicleTypes: [VehicleType.FD_ELW2, VehicleType.FD_ELW2_DRONE],
    },
    {
      numberRange: {
        start: 8,
        end: 9,
      },
      vehicleTypes: [VehicleType.FD_MTW, VehicleType.FD_MTF_DRONE],
    },
    {
      numberRange: {
        start: 10,
        end: 19,
      },
      vehicleTypes: [
        VehicleType.FD_HLF_20,
        VehicleType.FD_HLF_10,
        VehicleType.FD_HLF_TRAIN,
        VehicleType.FD_LF20,
        VehicleType.FD_LF10,
        VehicleType.FD_TLF_4000,
        VehicleType.FD_TLF_3000,
        VehicleType.FD_TLF_2000,
        VehicleType.FD_TLF_16_25,
        VehicleType.FD_MLF,
        VehicleType.FD_LF8_6,
        VehicleType.FD_KLF,
      ],
    },
    {
      numberRange: {
        start: 20,
        end: 20,
      },
      vehicleTypes: [VehicleType.FD_TLF_16_24TR, VehicleType.FD_SLF, VehicleType.FD_PTLF_4000],
    },
    {
      numberRange: {
        start: 31,
        end: 31,
      },
      vehicleTypes: [VehicleType.FD_GWA, { originalType: VehicleType.FD_GW_L1, customType: "ASF" }],
    },
    {
      numberRange: {
        start: 33,
        end: 34,
      },
      vehicleTypes: [VehicleType.FD_DLK23],
    },
    {
      numberRange: {
        start: 90,
        end: 90,
      },
      vehicleTypes: [VehicleType.FD_GWM],
    },
  ],
};
