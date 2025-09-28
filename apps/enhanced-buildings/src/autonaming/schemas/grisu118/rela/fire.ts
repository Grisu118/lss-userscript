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
      vehicleTypes: [VehicleType.ELW1, VehicleType.ELW1_DRONE],
    },
    {
      numberRange: {
        start: 3,
        end: 3,
      },
      vehicleTypes: [VehicleType.ELW2, VehicleType.ELW2_DRONE],
    },
    {
      numberRange: {
        start: 8,
        end: 9,
      },
      vehicleTypes: [VehicleType.MTW, VehicleType.MTF_DRONE],
    },
    {
      numberRange: {
        start: 10,
        end: 19,
      },
      vehicleTypes: [
        VehicleType.HLF_20,
        VehicleType.HLF_10,
        VehicleType.HLF_TRAIN,
        VehicleType.LF20,
        VehicleType.LF10,
        VehicleType.TLF_4000,
        VehicleType.TLF_3000,
        VehicleType.TLF_2000,
        VehicleType.TLF_16_25,
        VehicleType.MLF,
        VehicleType.LF8_6,
        VehicleType.KLF,
      ],
    },
    {
      numberRange: {
        start: 20,
        end: 20,
      },
      vehicleTypes: [VehicleType.TLF_16_24TR],
    },
    {
      numberRange: {
        start: 31,
        end: 31,
      },
      vehicleTypes: [VehicleType.GWA, { originalType: VehicleType.GW_L1, customType: "ASF" }],
    },
    {
      numberRange: {
        start: 33,
        end: 34,
      },
      vehicleTypes: [VehicleType.DLK23],
    },
    {
      numberRange: {
        start: 90,
        end: 90,
      },
      vehicleTypes: [VehicleType.GWM],
    },
  ],
};
