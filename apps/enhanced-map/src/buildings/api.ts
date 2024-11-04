import { StorageProvider } from "@lightspots/storageprovider";
import { Building } from "./building";

const storage = StorageProvider.sessionStorage("ls42.lss.cache");
const storageKey = "buildings";

interface CachedBuildings extends Record<string, unknown> {
  timestamp: number;
  buildings: Building[];
}

const isUpToDate = (cachedBuildings: CachedBuildings) => {
  const now = Date.now();
  // 2 hours
  return now - cachedBuildings.timestamp < 1000 * 60 * 60 * 2;
};

const fetchAll = async (): Promise<Building[]> => {
  const response = await fetch("/api/buildings");
  const body = await response.json();
  return body as Building[];
};

export const fetchBuildings = async (force: boolean): Promise<Building[]> => {
  const cachedBuildings = storage.getAsObject<CachedBuildings>(storageKey);
  if (cachedBuildings && !force && isUpToDate(cachedBuildings)) {
    return cachedBuildings.buildings;
  }
  const buildings = await fetchAll();
  storage.set(storageKey, {
    timestamp: Date.now(),
    buildings,
  });
  return buildings;
};
