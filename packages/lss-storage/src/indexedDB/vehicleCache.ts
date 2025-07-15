import { fetchAllVehicles, Vehicle } from "@lss/api";
import dayjs from "dayjs";
import { CachedEntry, isUpToDate } from "./CachedEntry";
import { LSS_INDEXED_DB } from "./indexedDBWrapper";

const VEHICLES_CACHE_KEY = "VEHICLES";
const VEHICLES_STORE = "vehicles";
const VERSION = 1;

export type VehicleMap = Record<number, Vehicle>;
export type CachedVehicles = CachedEntry<VehicleMap>;

export const getVehicles = async (force?: boolean): Promise<CachedVehicles> => {
  const cachedMetadata = await LSS_INDEXED_DB.getMetadata(VEHICLES_CACHE_KEY);

  if (cachedMetadata && !force && isUpToDate(cachedMetadata, VERSION)) {
    const vehicleMap = await LSS_INDEXED_DB.getAllItems<Vehicle>(VEHICLES_STORE);
    return {
      timestamp: cachedMetadata.timestamp,
      version: cachedMetadata.version,
      data: vehicleMap,
    };
  }

  const vehicles = await fetchAllVehicles();

  const vehicleMap: VehicleMap = {};
  vehicles.forEach((vehicle) => {
    vehicleMap[vehicle.id] = vehicle;
  });

  const metadata: CachedVehicles = {
    timestamp: dayjs().format(),
    version: VERSION,
    data: vehicleMap,
  };

  await LSS_INDEXED_DB.setAllItems(VEHICLES_STORE, vehicleMap);
  await LSS_INDEXED_DB.setMetadata(VEHICLES_CACHE_KEY, metadata);

  return metadata;
};

export const getVehicle = async (id: number): Promise<Vehicle | null> => {
  return await LSS_INDEXED_DB.getItem<Vehicle>(VEHICLES_STORE, id);
};

export const getAllVehiclesFromCache = async (): Promise<VehicleMap> => {
  return await LSS_INDEXED_DB.getAllItems<Vehicle>(VEHICLES_STORE);
};
