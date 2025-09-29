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
      numberRange: r(401, 417),
      vehicleTypes: [VehicleType.PD_FUSTW],
    },
    {
      numberRange: r(418, 419),
      vehicleTypes: [VehicleType.PD_BIKE],
    },
    {
      numberRange: r(420),
      vehicleTypes: [VehicleType.PD_DHuFKW],
    },
    {
      numberRange: r(426, 429),
      vehicleTypes: [VehicleType.PD_ZSTW],
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
      numberRange: r(421, 423),
      vehicleTypes: [VehicleType.PD_DHuFKW],
    },
    {
      numberRange: r(500, 509),
      vehicleTypes: [VehicleType.PD_FUEKW],
    },
    {
      numberRange: r(510, 519),
      vehicleTypes: [VehicleType.PD_LEBEFKW],
    },
    {
      numberRange: r(520, 528),
      vehicleTypes: [VehicleType.PD_GRUKW],
    },
    {
      numberRange: r(530, 532),
      vehicleTypes: [VehicleType.PD_WAWE10],
    },
    {
      numberRange: r(535),
      vehicleTypes: [VehicleType.PD_GEFKW],
    },
    {
      numberRange: r(538),
      vehicleTypes: [VehicleType.PD_LAUKW],
    },
    {
      numberRange: r(540, 545),
      vehicleTypes: [VehicleType.PD_SEK_ZF],
    },
    {
      numberRange: r(548, 549),
      vehicleTypes: [VehicleType.PD_SEK_MTF],
    },
    {
      numberRange: r(550, 555),
      vehicleTypes: [VehicleType.PD_MEK_ZF],
    },
    {
      numberRange: r(558, 559),
      vehicleTypes: [VehicleType.PD_MEK_MTF],
    },
  ],
};
