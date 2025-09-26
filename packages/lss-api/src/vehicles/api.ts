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
