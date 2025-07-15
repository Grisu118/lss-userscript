import dayjs from "dayjs";

export interface CachedEntry<T> extends Record<string, unknown> {
  /** ISO8601 */
  timestamp: string;
  version: number;
  data: T;
}

export const isUpToDate = (cachedEntry: CachedEntry<unknown>, currentVersion: number) => {
  const now = dayjs();
  const then = dayjs(cachedEntry.timestamp);

  return currentVersion == cachedEntry.version && now.diff(then, "hour") < 12;
};
