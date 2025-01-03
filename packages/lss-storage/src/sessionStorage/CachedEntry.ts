import dayjs from "dayjs";

export interface CachedEntry<T> extends Record<string, unknown> {
  /** ISO8601 */
  timestamp: string;
  data: T;
}

export const isUpToDate = (cachedEntry: CachedEntry<unknown>) => {
  const now = dayjs();
  const then = dayjs(cachedEntry.timestamp);
  // 2 hours
  return now.diff(then, "hour") < 12;
};
