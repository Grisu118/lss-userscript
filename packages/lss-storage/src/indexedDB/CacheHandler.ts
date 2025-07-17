import { CacheEntry, Metadata } from "@lss/storage";
import dayjs from "dayjs";
import { LSS_INDEXED_DB, LSS_INDEXED_DB_KEYS } from "./indexedDBWrapper";
import { isUpToDate } from "./Metadata";

export class CacheHandler<T> {
  private readonly db = LSS_INDEXED_DB;
  private readonly storeKey: LSS_INDEXED_DB_KEYS;
  private readonly dataVersion: number;
  private readonly fetchFn: () => Promise<Record<string, T>>;

  constructor(storeKey: LSS_INDEXED_DB_KEYS, dataVersion: number, fetchFn: () => Promise<Record<string, T>>) {
    this.storeKey = storeKey;
    this.dataVersion = dataVersion;
    this.fetchFn = fetchFn;
  }

  public async get(key: string, force: boolean = false): Promise<CacheEntry<T | null>> {
    let metadata = await this.getMetadataAndCheckUpToDate(force);
    if (!metadata) {
      metadata = await this.updateCache();
    }

    const data = await this.db.getItem<T>(this.storeKey, key);

    return {
      metadata,
      data,
    };
  }

  public async getAll(force: boolean = false): Promise<CacheEntry<Record<string, T>>> {
    let metadata = await this.getMetadataAndCheckUpToDate(force);
    if (!metadata) {
      metadata = await this.updateCache();
    }

    const data = await this.db.getAllItems<T>(this.storeKey);

    return {
      metadata,
      data,
    };
  }

  private async updateCache(): Promise<Metadata> {
    const data = await this.fetchFn();
    const metadata: Metadata = {
      timestamp: dayjs().format(),
      version: this.dataVersion,
    };

    await this.db.setAllItems(this.storeKey, data);
    await this.db.setMetadata(this.storeKey, metadata);
    return metadata;
  }

  /**
   * Retrieves metadata and checks whether it is up-to-date.
   *
   * @param {boolean} [force=false] - If true, skips the check and directly returns false.
   * @return {Promise<Metadata | false>} A promise that resolves to the metadata if it is up-to-date, or false otherwise.
   */
  private async getMetadataAndCheckUpToDate(force: boolean = false): Promise<Metadata | false> {
    if (force) {
      return false;
    }
    const metadata = await this.db.getMetadata(this.storeKey);

    if (metadata && isUpToDate(metadata, this.dataVersion)) {
      return metadata;
    } else {
      return false;
    }
  }
}
