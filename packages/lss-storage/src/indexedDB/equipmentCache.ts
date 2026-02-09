import { Equipment, fetchAllEquipments } from "@lss/api";
import { CacheHandler } from "./CacheHandler";
import { LSS_INDEXED_DB_KEYS } from "./indexedDBWrapper";
import { CacheEntry } from "./Metadata";

const VERSION = 1;
const CACHE_HANDLER = new CacheHandler<Equipment>(LSS_INDEXED_DB_KEYS.EQUIPMENTS, VERSION, fetchAllEquipments);

export type EquipmentMap = Record<number, Equipment>;
export type CachedEquipments = CacheEntry<EquipmentMap>;

export const getEquipments = async (force?: boolean): Promise<CachedEquipments> => {
  return await CACHE_HANDLER.getAll(force);
};

export const getEquipment = async (id: string, force?: boolean): Promise<CacheEntry<Equipment | null>> => {
  return await CACHE_HANDLER.get(id, force);
};
