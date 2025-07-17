import dayjs from "dayjs";

export interface CacheEntry<T> {
  metadata: Metadata;
  data: T;
}

export interface Metadata extends Record<string, unknown> {
  /** ISO8601 */
  timestamp: string;
  version: number;
}

export const isUpToDate = (cachedEntry: Metadata, currentVersion: number) => {
  const now = dayjs();
  const then = dayjs(cachedEntry.timestamp);

  return currentVersion == cachedEntry.version && now.diff(then, "hour") < 12;
};
