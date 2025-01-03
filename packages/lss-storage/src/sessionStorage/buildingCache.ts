import { Building, fetchAllBuildings } from "@lss/api";
import dayjs from "dayjs";
import { CachedEntry, isUpToDate } from "./CachedEntry";
import { LSS_CACHE_STORAGE } from "./sessionStorage";

const BUILDINGS_CACHE_KEY = "BUILDINGS";

export type CachedBuildings = CachedEntry<Building[]>;

export const getBuildings = async (force?: boolean): Promise<CachedBuildings> => {
  const cachedBuildings = LSS_CACHE_STORAGE.getAsObject<CachedBuildings>(BUILDINGS_CACHE_KEY);
  if (cachedBuildings && !force && isUpToDate(cachedBuildings)) {
    return cachedBuildings;
  }
  const buildings = await fetchAllBuildings();
  const value = {
    timestamp: dayjs().format(),
    data: buildings,
  };
  LSS_CACHE_STORAGE.set(BUILDINGS_CACHE_KEY, value);
  return value;
};
