import { fetchAllMissions, Mission } from "@lss/api";
import { CachedEntry } from "@lss/storage";
import dayjs from "dayjs";
import { isUpToDate } from "./CachedEntry";
import { LSS_CACHE_STORAGE } from "./sessionStorage";

const MISSIONS_CACHE_KEY = "MISSIONS";

export type CachedMissions = CachedEntry<Mission[]>;

export const getMissions = async (force?: boolean): Promise<CachedMissions> => {
  const cachedMissions = LSS_CACHE_STORAGE.getAsObject<CachedMissions>(MISSIONS_CACHE_KEY);
  if (cachedMissions && !force && isUpToDate(cachedMissions)) {
    return cachedMissions;
  }
  const missions = await fetchAllMissions();
  const value = {
    timestamp: dayjs().format(),
    data: missions,
  };
  LSS_CACHE_STORAGE.set(MISSIONS_CACHE_KEY, value);
  return value;
};
