import { fetchAllMissions, Mission } from "@lss/api";
import { CacheHandler } from "./CacheHandler";
import { LSS_INDEXED_DB_KEYS } from "./indexedDBWrapper";
import { CacheEntry } from "./Metadata";

const VERSION = 1;
const CACHE_HANDLER = new CacheHandler<Mission>(LSS_INDEXED_DB_KEYS.MISSIONS, VERSION, fetchAllMissions);

export type MissionMap = Record<string, Mission>;
export type CachedMissions = CacheEntry<MissionMap>;

export const getMissions = async (force?: boolean): Promise<CachedMissions> => {
  return await CACHE_HANDLER.getAll(force);
};

export const getMission = async (id: string, force?: boolean): Promise<CacheEntry<Mission | null>> => {
  return await CACHE_HANDLER.get(id, force);
};
