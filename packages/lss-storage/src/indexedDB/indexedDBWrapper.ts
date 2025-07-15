import { CachedEntry } from "./CachedEntry";

class IndexedDBWrapper {
  private dbName = "lss-cache";
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores for each cache type
        if (!db.objectStoreNames.contains("buildings")) {
          db.createObjectStore("buildings", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("missions")) {
          db.createObjectStore("missions", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("vehicles")) {
          db.createObjectStore("vehicles", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("metadata")) {
          db.createObjectStore("metadata", { keyPath: "key" });
        }
      };
    });
  }

  async setMetadata(key: string, metadata: CachedEntry<unknown>): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["metadata"], "readwrite");
      const store = transaction.objectStore("metadata");

      const request = store.put({ key, ...metadata });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getMetadata(key: string): Promise<CachedEntry<unknown> | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["metadata"], "readonly");
      const store = transaction.objectStore("metadata");

      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          const { key: _, ...metadata } = result;
          resolve(metadata as CachedEntry<unknown>);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async setItem<T>(storeName: string, key: number, item: T): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.put({ id: key, ...item });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getItem<T>(storeName: string, key: number): Promise<T | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          const { id: _, ...item } = result;
          resolve(item as T);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getAllItems<T>(storeName: string): Promise<Record<number, T>> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      const request = store.getAll();
      request.onsuccess = () => {
        const items: Record<number, T> = {};
        request.result.forEach((item: any) => {
          const { id, ...data } = item;
          items[id] = data as T;
        });
        resolve(items);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async setAllItems<T>(storeName: string, items: Record<number, T>): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      // Clear existing items
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        // Add all new items
        const promises: Promise<void>[] = [];
        Object.entries(items).forEach(([id, item]) => {
          promises.push(new Promise((itemResolve, itemReject) => {
            const request = store.put({ id: parseInt(id), ...item });
            request.onsuccess = () => itemResolve();
            request.onerror = () => itemReject(request.error);
          }));
        });

        Promise.all(promises)
          .then(() => resolve())
          .catch(reject);
      };
      clearRequest.onerror = () => reject(clearRequest.error);
    });
  }

  async clearStore(storeName: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const LSS_INDEXED_DB = new IndexedDBWrapper();
