import { Result } from "../Result";
import { Vehicle } from "./dto";

export const fetchAllVehicles = async (): Promise<Vehicle[]> => {
  const response = await fetch("/api/v2/vehicles");
  const body = await response.json();
  const result = body as Result<Vehicle[]>;
  return result.result;
};
