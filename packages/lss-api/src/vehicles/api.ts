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
  return modifyVehicle(id, { caption: newName });
};

export const changeVehicleType = async (
  id: number,
  newType: string,
  ignoreDefault: boolean = false,
): Promise<Response> => {
  return modifyVehicle(id, { vehicle_type_caption: newType, vehicle_type_ignore_default_aao: ignoreDefault });
};

export const changeTractiveVehicle = async (id: number, vehicleId: number): Promise<Response> => {
  return modifyVehicle(id, { tractive_random: 0, tractive_vehicle_id: vehicleId });
};

export const modifyVehicle = async (
  id: number,
  data: {
    caption?: string;
    max_personnel?: number;
    vehicle_type_caption?: string;
    vehicle_type_ignore_default_aao?: boolean;
    tractive_random?: number;
    tractive_vehicle_id?: number;
  },
): Promise<Response> => {
  const requestData: Record<string, string | number> = {};

  if (data.caption !== undefined) {
    requestData["vehicle[caption]"] = data.caption;
  }
  if (data.max_personnel !== undefined) {
    requestData["vehicle[personal_max]"] = data.max_personnel;
  }
  if (data.vehicle_type_caption !== undefined) {
    requestData["vehicle[vehicle_type_caption]"] = data.vehicle_type_caption;
  }
  if (data.vehicle_type_ignore_default_aao !== undefined) {
    requestData["vehicle[vehicle_type_ignore_default_aao]"] = data.vehicle_type_ignore_default_aao ? 1 : 0;
  }
  if (data.tractive_random !== undefined) {
    requestData["vehicle[tractive_random]"] = data.tractive_random;
  }
  if (data.tractive_vehicle_id !== undefined) {
    requestData["vehicle[tractive_vehicle_id]"] = data.tractive_vehicle_id;
  }

  return editVehicle(id, requestData);
};
