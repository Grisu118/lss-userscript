import { fetchAllVehicles, Vehicle } from "@lss/api";
import { CacheHandler } from "./CacheHandler";
import { LSS_INDEXED_DB_KEYS } from "./indexedDBWrapper";
import { CacheEntry } from "./Metadata";

const VERSION = 1;
const CACHE_HANDLER = new CacheHandler<Vehicle>(LSS_INDEXED_DB_KEYS.VEHICLES, VERSION, fetchAllVehicles);

export type VehicleMap = Record<number, Vehicle>;
export type CachedVehicles = CacheEntry<VehicleMap>;

export const getVehicles = async (force?: boolean): Promise<CachedVehicles> => {
  return await CACHE_HANDLER.getAll(force);
};

export const getVehicle = async (id: number, force?: boolean): Promise<CacheEntry<Vehicle | null>> => {
  return await CACHE_HANDLER.get(id.toString(), force);
};
