import { Building, fetchAllBuildings } from "@lss/api";
import dayjs from "dayjs";
import { CachedEntry, isUpToDate } from "./CachedEntry";
import { LSS_INDEXED_DB } from "./indexedDBWrapper";

const BUILDINGS_CACHE_KEY = "BUILDINGS";
const BUILDINGS_STORE = "buildings";
const VERSION = 1;

export type BuildingMap = Record<number, Building>;
export type CachedBuildings = CachedEntry<BuildingMap>;

export const getBuildings = async (force?: boolean): Promise<CachedBuildings> => {
  const cachedMetadata = await LSS_INDEXED_DB.getMetadata(BUILDINGS_CACHE_KEY);

  if (cachedMetadata && !force && isUpToDate(cachedMetadata, VERSION)) {
    const buildingMap = await LSS_INDEXED_DB.getAllItems<Building>(BUILDINGS_STORE);
    return {
      timestamp: cachedMetadata.timestamp,
      version: cachedMetadata.version,
      data: buildingMap,
    };
  }

  const buildings = await fetchAllBuildings();

  const buildingMap: BuildingMap = {};
  buildings.forEach((building) => {
    buildingMap[building.id] = building;
  });

  const metadata: CachedEntry<BuildingMap> = {
    timestamp: dayjs().format(),
    version: VERSION,
    data: buildingMap,
  };

  await LSS_INDEXED_DB.setAllItems(BUILDINGS_STORE, buildingMap);
  await LSS_INDEXED_DB.setMetadata(BUILDINGS_CACHE_KEY, metadata);

  return metadata;
};

export const getBuilding = async (id: number): Promise<Building | null> => {
  return await LSS_INDEXED_DB.getItem<Building>(BUILDINGS_STORE, id);
};

export const getAllBuildingsFromCache = async (): Promise<BuildingMap> => {
  return await LSS_INDEXED_DB.getAllItems<Building>(BUILDINGS_STORE);
};
