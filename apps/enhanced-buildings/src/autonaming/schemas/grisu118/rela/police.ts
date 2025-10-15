import { BuildingType, VehicleType } from "@lss/api";
import { r, Schema } from "../../Schema";

export const relaPoliceStation: Schema = {
  buildingType: BuildingType.POLICE_STATION,
  nameRegex: /^🚓WS (?<org>Rela) Industries (?<nb>\d+).*/,
  nameTemplate: "{ORG_CAP} {B_NB}/{V_NB} {V_TYPE}",
  vehicleNamings: [
    {
      numberRange: r(400),
      vehicleTypes: [VehicleType.PD_FUSTW_DGL],
    },
    {
      numberRange: r(410, 424),
      vehicleTypes: [VehicleType.PD_FUSTW],
    },
    {
      numberRange: r(425, 427),
      vehicleTypes: [VehicleType.PD_ZSTW],
    },
    {
      numberRange: r(428, 429),
      vehicleTypes: [VehicleType.PD_BIKE],
    },
    {
      numberRange: r(430),
      vehicleTypes: [VehicleType.PD_DHuFKW],
    },
    {
      numberRange: r(435),
      vehicleTypes: [VehicleType.PD_GEFKW],
    },
  ],
};

export const relaFederalPoliceStation: Schema = {
  buildingType: BuildingType.FEDERAL_POLICE_STATION,
  nameRegex: /^🚓B-WS (?<org>Rela) Industries (?<nb>\d+).*/,
  nameTemplate: relaPoliceStation.nameTemplate,
  vehicleNamings: [
    {
      numberRange: r(401, 405),
      vehicleTypes: [VehicleType.PD_FUEKW],
    },
    {
      numberRange: r(406, 409),
      vehicleTypes: [VehicleType.PD_LEBEFKW],
    },
    {
      numberRange: r(431, 433),
      vehicleTypes: [VehicleType.PD_DHuFKW],
    },
    {
      numberRange: r(436),
      vehicleTypes: [VehicleType.PD_GEFKW],
    },
    {
      numberRange: r(438),
      vehicleTypes: [VehicleType.PD_LAUKW],
    },
    {
      numberRange: r(440, 442),
      vehicleTypes: [VehicleType.PD_WAWE10],
    },
    {
      numberRange: r(450, 458),
      vehicleTypes: [VehicleType.PD_GRUKW],
    },
    {
      numberRange: r(460, 465),
      vehicleTypes: [VehicleType.PD_SEK_ZF],
    },
    {
      numberRange: r(468, 469),
      vehicleTypes: [VehicleType.PD_SEK_MTF],
    },
    {
      numberRange: r(470, 475),
      vehicleTypes: [VehicleType.PD_MEK_ZF],
    },
    {
      numberRange: r(478, 479),
      vehicleTypes: [VehicleType.PD_MEK_MTF],
    },
  ],
};
