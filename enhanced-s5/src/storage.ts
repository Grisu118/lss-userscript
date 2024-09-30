import { StorageProvider } from "@lightspots/storageprovider";

const costLimitKey = "ALLIANCE_HOSPITAL_COST_LIMIT";
const distantKey = "OWN_HOSPITAL_MAX_DISTANT";

const storage = StorageProvider.localStorage("ls42.lss");

export function getCostLimit(): number {
  return storage.getAsNumber(costLimitKey) ?? 10;
}

export function getMaxDistant(): number {
  return storage.getAsNumber(distantKey) ?? 50;
}
