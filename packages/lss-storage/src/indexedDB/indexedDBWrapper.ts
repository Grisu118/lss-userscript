import { Metadata } from "./Metadata";

export enum LSS_INDEXED_DB_KEYS {
  BUILDINGS = "buildings",
  MISSIONS = "missions",
  VEHICLES = "vehicles",
  EQUIPMENTS = "equipments",
  METADATA = "metadata",
}

export interface StoredValue<ID, T> {
  id: ID;
  data: T;
}

class IndexedDBWrapper {
  private dbName = "ls42.lss-cache";
  private version = 2;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    const request = indexedDB.open(this.dbName, this.version);

    return new Promise((resolve, reject) => {
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores for each cache type
        if (!db.objectStoreNames.contains(LSS_INDEXED_DB_KEYS.BUILDINGS)) {
          db.createObjectStore(LSS_INDEXED_DB_KEYS.BUILDINGS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(LSS_INDEXED_DB_KEYS.MISSIONS)) {
          db.createObjectStore(LSS_INDEXED_DB_KEYS.MISSIONS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(LSS_INDEXED_DB_KEYS.VEHICLES)) {
          db.createObjectStore(LSS_INDEXED_DB_KEYS.VEHICLES, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(LSS_INDEXED_DB_KEYS.EQUIPMENTS)) {
          db.createObjectStore(LSS_INDEXED_DB_KEYS.EQUIPMENTS, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(LSS_INDEXED_DB_KEYS.METADATA)) {
          db.createObjectStore(LSS_INDEXED_DB_KEYS.METADATA, { keyPath: "id" });
        }
      };
    });
  }

  async setMetadata(id: LSS_INDEXED_DB_KEYS, metadata: Metadata): Promise<void> {
    if (!this.db) await this.init();

    const store = this.getStore(LSS_INDEXED_DB_KEYS.METADATA, "readwrite");
    const value: StoredValue<LSS_INDEXED_DB_KEYS, Metadata> = {
      id: id,
      data: metadata,
    };
    const request = store.put(value);
    await this.handleRequest(request);
  }

  async getMetadata(key: LSS_INDEXED_DB_KEYS): Promise<Metadata | null> {
    if (!this.db) await this.init();

    const store = this.getStore(LSS_INDEXED_DB_KEYS.METADATA, "readonly");
    const request = store.get(key);
    const result = await this.handleRequest<StoredValue<LSS_INDEXED_DB_KEYS, Metadata>>(request);

    if (result) {
      return result.data;
    }
    return null;
  }

  async setItem<T>(storeName: LSS_INDEXED_DB_KEYS, id: string, item: T): Promise<void> {
    if (!this.db) await this.init();

    const store = this.getStore(storeName, "readwrite");
    const value: StoredValue<string, T> = {
      id: id,
      data: item,
    };
    const request = store.put(value);
    await this.handleRequest(request);
  }

  async getItem<T>(storeName: LSS_INDEXED_DB_KEYS, id: string): Promise<T | null> {
    if (!this.db) await this.init();

    const store = this.getStore(storeName, "readonly");
    const request = store.get(id);
    const result = await this.handleRequest<StoredValue<number, T>>(request);

    if (result) {
      return result.data;
    }
    return null;
  }

  async hasItem(storeName: LSS_INDEXED_DB_KEYS, id: string): Promise<boolean> {
    if (!this.db) await this.init();

    const store = this.getStore(storeName, "readonly");
    const request = store.count(id);
    const count = await this.handleRequest<number>(request);

    return count !== undefined && count > 0;
  }

  async getAllItems<T>(storeName: LSS_INDEXED_DB_KEYS): Promise<Record<string, T>> {
    if (!this.db) await this.init();

    const store = this.getStore(storeName, "readonly");
    const request = store.getAll();
    const results = await this.handleRequest<StoredValue<string, T>[]>(request);

    const items: Record<string, T> = {};
    results?.forEach((item) => {
      const { id, data } = item;
      items[id] = data;
    });

    return items;
  }

  async setAllItems<T>(storeName: LSS_INDEXED_DB_KEYS, items: Record<string, T>): Promise<void> {
    if (!this.db) await this.init();

    const store = this.getStore(storeName, "readwrite");

    // Clear existing items
    await this.handleRequest(store.clear());

    // Add all new items
    const promises = Object.entries(items).map(([id, item]) => {
      const value: StoredValue<string, T> = {
        id: id,
        data: item,
      };
      return this.handleRequest(store.put(value));
    });

    await Promise.all(promises);
  }

  async clearStore(storeName: LSS_INDEXED_DB_KEYS): Promise<void> {
    if (!this.db) await this.init();

    const store = this.getStore(storeName, "readwrite");
    await this.handleRequest(store.clear());
  }

  private getStore(storeName: LSS_INDEXED_DB_KEYS, mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) throw new Error("Database not initialized");
    const transaction = this.db.transaction([storeName], mode);
    return transaction.objectStore(storeName);
  }

  private async handleRequest<T>(request: IDBRequest<T>): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const LSS_INDEXED_DB = new IndexedDBWrapper();
