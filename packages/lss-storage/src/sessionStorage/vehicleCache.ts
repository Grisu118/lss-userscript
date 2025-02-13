import { fetchAllVehicles, Vehicle } from "@lss/api";
import dayjs from "dayjs";
import { CachedEntry, isUpToDate } from "./CachedEntry";
import { LSS_CACHE_STORAGE } from "./sessionStorage";

const VEHICLES_CACHE_KEY = "VEHICLES";
const VERSION = 1;

export type VehicleMap = Record<number, Vehicle>;
export type CachedVehicles = CachedEntry<VehicleMap>;

export const getVehicles = async (force?: boolean): Promise<CachedVehicles> => {
  const cachedVehicles = LSS_CACHE_STORAGE.getAsObject<CachedVehicles>(VEHICLES_CACHE_KEY);
  if (cachedVehicles && !force && isUpToDate(cachedVehicles, VERSION)) {
    return cachedVehicles;
  }
  const vehicles = await fetchAllVehicles();

  const vehicleMap: VehicleMap = {};
  vehicles.forEach((vehicle) => {
    vehicleMap[vehicle.id] = vehicle;
  });

  const value: CachedVehicles = {
    timestamp: dayjs().format(),
    version: VERSION,
    data: vehicleMap,
  };
  LSS_CACHE_STORAGE.set(VEHICLES_CACHE_KEY, value);
  return value;
};
