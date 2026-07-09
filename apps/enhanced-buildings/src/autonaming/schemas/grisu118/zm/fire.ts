import { BuildingType, VehicleType } from "@lss/api";
import { r, Schema } from "../../Schema";

export const zmFireDepartment: Schema = {
  buildingType: BuildingType.FIRE_STATION,
  nameRegex: /^💶ZM (?<org>[\w\\. ]+).*/,
  nameTemplate: "ZM {ORG_CAP} {V_NB} {V_TYPE}",
  vehicleNamings: [
    {
      numberRange: r(1),
      vehicleTypes: [VehicleType.FD_HLF_20],
    },
    {
      numberRange: r(2, 30),
      vehicleTypes: [VehicleType.FD_MTW],
    },
  ],
};
