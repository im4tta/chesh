/**
 * StorageAdapter - Browser storage interface with fallback
 * Provides persistent session storage with error handling
 */

export class StorageAdapter {
  constructor() {
    this.storageAvailable = this.checkStorageAvailability();
    this.fallbackStorage = new Map();
  }

  checkStorageAvailability() {
    try {
      const test = "__storage_test__";
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn("SessionStorage not available, using fallback storage");
      return false;
    }
  }

  setItem(key, data) {
    try {
      const serializedData = JSON.stringify({
        data,
        timestamp: Date.now(),
        version: "1.0.0",
      });

      if (this.storageAvailable) {
        sessionStorage.setItem(key, serializedData);
      } else {
        this.fallbackStorage.set(key, serializedData);
      }
      return true;
    } catch (error) {
      console.error("Failed to store data:", error);
      return false;
    }
  }

  getItem(key) {
    try {
      let serializedData;

      if (this.storageAvailable) {
        serializedData = sessionStorage.getItem(key);
      } else {
        serializedData = this.fallbackStorage.get(key);
      }

      if (!serializedData) {
        return null;
      }

      const parsed = JSON.parse(serializedData);

      if (!parsed.data || !parsed.timestamp || !parsed.version) {
        console.warn("Invalid stored data format, removing:", key);
        this.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error("Failed to retrieve data:", error);
      this.removeItem(key);
      return null;
    }
  }

  removeItem(key) {
    try {
      if (this.storageAvailable) {
        sessionStorage.removeItem(key);
      } else {
        this.fallbackStorage.delete(key);
      }
      return true;
    } catch (error) {
      console.error("Failed to remove data:", error);
      return false;
    }
  }

  clear() {
    try {
      if (this.storageAvailable) {
        sessionStorage.clear();
      } else {
        this.fallbackStorage.clear();
      }
      return true;
    } catch (error) {
      console.error("Failed to clear storage:", error);
      return false;
    }
  }

  getAllKeys() {
    try {
      if (this.storageAvailable) {
        return Object.keys(sessionStorage);
      } else {
        return Array.from(this.fallbackStorage.keys());
      }
    } catch (error) {
      console.error("Failed to get storage keys:", error);
      return [];
    }
  }

  hasItem(key) {
    if (this.storageAvailable) {
      return sessionStorage.getItem(key) !== null;
    } else {
      return this.fallbackStorage.has(key);
    }
  }
}

export const storageAdapter = new StorageAdapter();
