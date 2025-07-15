import { fetchAllMissions, Mission } from "@lss/api";
import dayjs from "dayjs";
import { CachedEntry, isUpToDate } from "./CachedEntry";
import { LSS_INDEXED_DB } from "./indexedDBWrapper";

const MISSIONS_CACHE_KEY = "MISSIONS";
const MISSIONS_STORE = "missions";
const VERSION = 1;

export type CachedMissions = CachedEntry<Mission[]>;

export const getMissions = async (force?: boolean): Promise<CachedMissions> => {
  const cachedMetadata = await LSS_INDEXED_DB.getMetadata(MISSIONS_CACHE_KEY);

  if (cachedMetadata && !force && isUpToDate(cachedMetadata, VERSION)) {
    const missionMap = await LSS_INDEXED_DB.getAllItems<Mission>(MISSIONS_STORE);
    const missions = Object.values(missionMap);
    return {
      timestamp: cachedMetadata.timestamp,
      version: cachedMetadata.version,
      data: missions,
    };
  }

  const missions = await fetchAllMissions();

  const missionMap: Record<number, Mission> = {};
  missions.forEach((mission) => {
    missionMap[mission.id] = mission;
  });

  const metadata: CachedMissions = {
    timestamp: dayjs().format(),
    version: VERSION,
    data: missions,
  };

  await LSS_INDEXED_DB.setAllItems(MISSIONS_STORE, missionMap);
  await LSS_INDEXED_DB.setMetadata(MISSIONS_CACHE_KEY, metadata);

  return metadata;
};

export const getMission = async (id: number): Promise<Mission | null> => {
  return await LSS_INDEXED_DB.getItem<Mission>(MISSIONS_STORE, id);
};

export const getAllMissionsFromCache = async (): Promise<Mission[]> => {
  const missionMap = await LSS_INDEXED_DB.getAllItems<Mission>(MISSIONS_STORE);
  return Object.values(missionMap);
};
