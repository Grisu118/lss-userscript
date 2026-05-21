import { BuildingType, VehicleType } from "@lss/api";
import { r, Schema } from "../../Schema";
import { relaFireDepartment } from "./fire";

export const relaHeavyRescue: Schema = {
  buildingType: BuildingType.THW_STATION,
  nameRegex: /^⚙️HR (?<org>Rela) Industries (?<nb>\d+).*/,
  nameTemplate: relaFireDepartment.nameTemplate,
  vehicleNamings: [
    {
      numberRange: r(120),
      vehicleTypes: [VehicleType.THW_FUEKW],
    },
    {
      numberRange: r(121,122),
      vehicleTypes: [VehicleType.THW_MTW_TZ],
    },
    {
      numberRange: r(123),
      vehicleTypes: [VehicleType.THW_FUEKOMKW],
    },
    {
      numberRange: r(124),
      vehicleTypes: [VehicleType.THW_FUELA_TRAILER],
    },
    {
      numberRange: r(125),
      vehicleTypes: [VehicleType.THW_FMKW],
    },
    {
      numberRange: r(126),
      vehicleTypes: [VehicleType.THW_MTW_FGR_K],
    },
    {
      numberRange: r(127),
      vehicleTypes: [VehicleType.THW_MTW_TR_UL],
    },

    {
      numberRange: r(130, 131),
      vehicleTypes: [VehicleType.THW_GKW],
    },
    {
      numberRange: r(132),
      vehicleTypes: [VehicleType.THW_MzGW_FGR_BRB],
    },
    {
      numberRange: r(133),
      vehicleTypes: [VehicleType.THW_ANH_PLATFORM_FGR_BRB],
    },
    {
      numberRange: r(134, 135),
      vehicleTypes: [VehicleType.THW_MzKW],
    },
    {
      numberRange: r(136, 137),
      vehicleTypes: [VehicleType.THW_NEA50],
    },
    {
      numberRange: r(138),
      vehicleTypes: [VehicleType.THW_LKW7_LBW_FGR_E],
    },
    {
      numberRange: r(139),
      vehicleTypes: [VehicleType.THW_NEA200],
    },
    {
      numberRange: r(140),
      vehicleTypes: [VehicleType.THW_LKW_K9],
    },
    {
      numberRange: r(141),
      vehicleTypes: [VehicleType.THW_BRmG_R],
    },
    {
      numberRange: r(142),
      vehicleTypes: [VehicleType.THW_MLW5],
    },
    {
      numberRange: r(143),
      vehicleTypes: [VehicleType.THW_Anh_DLE],
    },
    {
      numberRange: r(144),
      vehicleTypes: [VehicleType.THW_MZGW_SB],
    },
    {
      numberRange: r(145),
      vehicleTypes: [VehicleType.THW_CRANE],
    },
    {
      numberRange: r(146,147),
      vehicleTypes: [VehicleType.THW_MTW_O],
    },
    {
      numberRange: r(148,149),
      vehicleTypes: [VehicleType.THW_ANH_HUND],
    },
    {
      numberRange: r(150),
      vehicleTypes: [VehicleType.THW_LKW7_LBW_FGR_WP],
    },
    {
      numberRange: r(151),
      vehicleTypes: [VehicleType.THW_ANH_7],
    },
    {
      numberRange: r(152),
      vehicleTypes: [VehicleType.THW_MLW4],
    },
    {
      numberRange: r(153),
      vehicleTypes: [VehicleType.THW_ANH_SWPU],
    },
    {
      numberRange: r(155),
      vehicleTypes: [VehicleType.THW_DIVE_KW],
    },
    {
      numberRange: r(156),
      vehicleTypes: [VehicleType.THW_LKW_7_LKR_19_TM],
    },
    {
      numberRange: r(157),
      vehicleTypes: [VehicleType.THW_ANH_MZB],
    },
    {
      numberRange: r(158),
      vehicleTypes: [VehicleType.THW_ANH_SCHLB],
    },
    {
      numberRange: r(159),
      vehicleTypes: [VehicleType.THW_ANH_MZAB],
    },
    {
      numberRange: r(168, 169),
      vehicleTypes: [VehicleType.THW_MTW_OV],
    },
  ],
};
