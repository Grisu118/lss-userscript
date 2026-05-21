import { editVehicle } from "../form/formUtils";
import { Result } from "../Result";
import { Vehicle } from "./dto";

export const fetchAllVehicles = async (): Promise<Record<string, Vehicle>> => {
  const response = await fetch("/api/v2/vehicles");
  const body = await response.json();
  const result = body as Result<Vehicle[]>;
  const resultMap: Record<string, Vehicle> = {};
  for (const vehicle of result.result) {
    resultMap[vehicle.id] = vehicle;
  }
  return resultMap;
};

export const renameVehicle = async (id: number, newName: string): Promise<Response> => {
  return editVehicle(id, { "vehicle[caption]": newName });
};

export const changeVehicleType = async (
  id: number,
  newType: string,
  ignoreDefault: boolean = false,
): Promise<Response> => {
  return editVehicle(id, {
    "vehicle[vehicle_type_caption]": newType,
    "vehicle[vehicle_type_ignore_default_aao]": ignoreDefault ? 1 : 0,
  });
};

export const changeTractiveVehicle = async (id: number, vehicleId: number): Promise<Response> => {
  return editVehicle(id, { "vehicle[tractive_random]": 0, "vehicle[tractive_vehicle_id]": vehicleId });
};
