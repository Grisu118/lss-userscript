import { Building, fetchAllBuildings } from "@lss/api";
import dayjs from "dayjs";
import { CachedEntry, isUpToDate } from "./CachedEntry";
import { LSS_CACHE_STORAGE } from "./sessionStorage";

const BUILDINGS_CACHE_KEY = "BUILDINGS";
const VERSION = 1;

export type BuildingMap = Record<number, Building>;
export type CachedBuildings = CachedEntry<BuildingMap>;

export const getBuildings = async (force?: boolean): Promise<CachedBuildings> => {
  const cachedBuildings = LSS_CACHE_STORAGE.getAsObject<CachedBuildings>(BUILDINGS_CACHE_KEY);
  if (cachedBuildings && !force && isUpToDate(cachedBuildings, VERSION)) {
    return cachedBuildings;
  }
  const buildings = await fetchAllBuildings();

  const buildingMap: BuildingMap = {};
  buildings.forEach((building) => {
    buildingMap[building.id] = building;
  });

  const value = {
    timestamp: dayjs().format(),
    version: VERSION,
    data: buildingMap,
  };
  LSS_CACHE_STORAGE.set(BUILDINGS_CACHE_KEY, value);
  return value;
};
