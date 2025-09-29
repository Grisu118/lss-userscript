import { BuildingType, VehicleType } from "@lss/api";
import { r, Schema } from "../../Schema";

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
      numberRange: r(3),
      vehicleTypes: [VehicleType.FD_ELW2, VehicleType.FD_ELW2_DRONE],
    },
    {
      numberRange: {
        start: 5,
        end: 5,
      },
      vehicleTypes: [VehicleType.MD_KDOW_ORGL],
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
        end: 15,
      },
      vehicleTypes: [
        VehicleType.FD_HLF_20,
        VehicleType.FD_HLF_10,
        VehicleType.FD_HLF_TRAIN,
        VehicleType.FD_LF20,
        VehicleType.FD_LF_20_16,
        VehicleType.FD_TLF_4000,
        VehicleType.FD_TLF_20_40,
        VehicleType.FD_TLF_3000,
        VehicleType.FD_TLF_2000,
        VehicleType.FD_TLF_16_25,
        VehicleType.FD_LF10,
        VehicleType.FD_MLF,
        VehicleType.FD_LF8_6,
        VehicleType.FD_KLF,
      ],
    },
    {
      numberRange: {
        start: 16,
        end: 19,
      },
      vehicleTypes: [VehicleType.FD_FLF],
    },
    {
      numberRange: {
        start: 20,
        end: 20,
      },
      vehicleTypes: [
        VehicleType.FD_TLF_16_24TR,
        VehicleType.FD_SLF,
        VehicleType.FD_PTLF_4000,
        VehicleType.FD_TLF_20_40SL,
      ],
    },
    {
      numberRange: {
        start: 21,
        end: 21,
      },
      vehicleTypes: [VehicleType.FD_ULF],
    },
    {
      numberRange: {
        start: 22,
        end: 22,
      },
      vehicleTypes: [VehicleType.FD_ALF],
    },
    {
      numberRange: {
        start: 23,
        end: 23,
      },
      vehicleTypes: [VehicleType.FD_GTLF],
    },
    {
      numberRange: {
        start: 24,
        end: 24,
      },
      vehicleTypes: [VehicleType.FD_TANKER, VehicleType.FD_SMALL_TANKER],
    },
    {
      numberRange: {
        start: 25,
        end: 25,
      },
      vehicleTypes: [
        VehicleType.FD_SW_1000,
        VehicleType.FD_SW_2000,
        VehicleType.FD_SW_2000TR,
        VehicleType.FD_SW_KATS,
        VehicleType.FD_GW_L2_W,
      ],
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
      vehicleTypes: [VehicleType.FD_DLK23, VehicleType.FD_TM50],
    },
    {
      numberRange: r(35),
      vehicleTypes: [VehicleType.FD_RT],
    },
    {
      numberRange: r(36),
      vehicleTypes: [{ originalType: VehicleType.FD_GW_L1, customType: "SRF" }],
    },
    {
      numberRange: r(37),
      vehicleTypes: [VehicleType.FD_RW],
    },
    {
      numberRange: r(39),
      vehicleTypes: [VehicleType.FD_FWK],
    },
    {
      numberRange: r(40),
      vehicleTypes: [VehicleType.FD_GWH],
    },
    {
      numberRange: r(41, 43),
      vehicleTypes: [VehicleType.FD_WLF],
    },
    {
      numberRange: r(44, 45),
      vehicleTypes: [
        { originalType: VehicleType.FD_GW_L1, customType: "LKW" },
        { originalType: VehicleType.FD_GW_L2, customType: "LKW" },
      ],
    },
    {
      numberRange: r(50, 58),
      vehicleTypes: [VehicleType.MD_RTW],
    },
    {
      numberRange: r(59),
      vehicleTypes: [VehicleType.MD_GRTW],
    },
    {
      numberRange: r(60),
      vehicleTypes: [VehicleType.MD_KDOW_LNA],
    },
    {
      numberRange: r(61, 62),
      vehicleTypes: [VehicleType.MD_NEF],
    },
    {
      numberRange: r(63),
      vehicleTypes: [VehicleType.MD_NAW],
    },
    {
      numberRange: r(64),
      vehicleTypes: [VehicleType.MD_ITW],
    },
    {
      numberRange: r(65),
      vehicleTypes: [VehicleType.MD_NEF],
    },
    {
      numberRange: r(90),
      vehicleTypes: [VehicleType.FD_GWM],
    },
    {
      numberRange: r(91),
      vehicleTypes: [VehicleType.FD_GWG, { originalType: VehicleType.FD_GW_L2, customType: "CWF" }],
    },
    {
      numberRange: r(92),
      vehicleTypes: [VehicleType.FD_DEKON_P, { originalType: VehicleType.FD_GW_L2, customType: "CWF-D" }],
    },
    {
      numberRange: r(93),
      vehicleTypes: [VehicleType.FD_GW_WERK],
    },
    {
      numberRange: r(101),
      vehicleTypes: [VehicleType.FD_AB_EL],
    },
    {
      numberRange: r(102),
      vehicleTypes: [VehicleType.FD_AB_HEAVY_RESCUE],
    },
    {
      numberRange: r(103),
      vehicleTypes: [VehicleType.FD_AB_BREATHING_PROTECTION],
    },
    {
      numberRange: r(104),
      vehicleTypes: [VehicleType.FD_AB_OIL, { originalType: VehicleType.FD_AB_L, customType: "OWC" }],
    },
    {
      numberRange: r(105),
      vehicleTypes: [VehicleType.FD_AB_HOSE_WATER],
    },
    {
      numberRange: r(106),
      vehicleTypes: [VehicleType.FD_AB_WATER],
    },
    {
      numberRange: r(107),
      vehicleTypes: [VehicleType.FD_AB_FAN],
    },
  ],
};
