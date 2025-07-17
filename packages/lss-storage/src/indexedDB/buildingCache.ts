import { Building, fetchAllBuildings } from "@lss/api";
import { CacheHandler } from "./CacheHandler";
import { LSS_INDEXED_DB_KEYS } from "./indexedDBWrapper";
import { CacheEntry } from "./Metadata";

const VERSION = 1;
const CACHE_HANDLER = new CacheHandler<Building>(LSS_INDEXED_DB_KEYS.BUILDINGS, VERSION, fetchAllBuildings);

export type BuildingMap = Record<number, Building>;
export type CachedBuildings = CacheEntry<BuildingMap>;

export const getBuildings = async (force?: boolean): Promise<CachedBuildings> => {
  return await CACHE_HANDLER.getAll(force);
};

export const getBuilding = async (id: string, force?: boolean): Promise<CacheEntry<Building | null>> => {
  return await CACHE_HANDLER.get(id, force);
};
