import { BuildingType, VehicleType } from "@lss/api";
import { r, Schema } from "../../Schema";
import { relaFireDepartment } from "./fire";

export const relaMedic: Schema = {
  ...relaFireDepartment,
  buildingType: BuildingType.MEDIC_STATION,
  nameRegex: /^🚑RW (?<org>Rela) Industries (?<nb>\d+).*/,
};

export const relaSeg: Schema = {
  buildingType: BuildingType.MEDIC_SEG,
  nameRegex: /^⚕SEG (?<org>Rela) Industries (?<nb>\d+).*/,
  nameTemplate: relaFireDepartment.nameTemplate,
  vehicleNamings: [
    {
      numberRange: r(4),
      vehicleTypes: [VehicleType.MD_ELW1_SEG],
    },
    {
      numberRange: r(68, 69),
      vehicleTypes: [VehicleType.MD_RHF],
    },
    {
      numberRange: r(70, 72),
      vehicleTypes: [VehicleType.MD_GW_BT],
    },
    {
      numberRange: r(73, 76),
      vehicleTypes: [VehicleType.MD_BT_KOMBI],
    },
    {
      numberRange: r(77, 79),
      vehicleTypes: [VehicleType.MD_BT_LKW],
    },
    {
      numberRange: r(80),
      vehicleTypes: [VehicleType.MD_GW_UAS],
    },
    {
      numberRange: r(95),
      vehicleTypes: [VehicleType.MD_GW_SAN],
    },
    {
      numberRange: r(96, 98),
      vehicleTypes: [VehicleType.MD_KTW_B],
    },
    {
      numberRange: r(99),
      vehicleTypes: [VehicleType.MD_RTW],
    },
    {
      numberRange: r(180),
      vehicleTypes: [VehicleType.MD_GW_TESI],
    },
    {
      numberRange: r(181),
      vehicleTypes: [VehicleType.MD_TESI_TRAILER],
    },
    {
      numberRange: r(182),
      vehicleTypes: [VehicleType.MD_MTW_TESI],
    },
    {
      numberRange: r(183),
      vehicleTypes: [VehicleType.MD_LKW_TESI],
    },
    {
      numberRange: r(184),
      vehicleTypes: [VehicleType.MD_NEA50],
    },
  ],
};
