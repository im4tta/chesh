/**
 * StorageAdapter - Browser storage interface with fallback
 * Provides persistent session storage with error handling
 *
 * Uses localStorage rather than sessionStorage. sessionStorage is scoped
 * to the browser tab's lifetime — on mobile, backgrounding or the OS
 * killing an installed PWA can wipe it, which looks exactly like a lost
 * session to a kid mid-flashcard. localStorage survives that, so
 * closing the app and coming back resumes where they left off instead
 * of silently restarting.
 */

export class StorageAdapter {
  constructor() {
    this.storageAvailable = this.checkStorageAvailability();
    this.fallbackStorage = new Map();
  }

  checkStorageAvailability() {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn("localStorage not available, using fallback storage");
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
        localStorage.setItem(key, serializedData);
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
        serializedData = localStorage.getItem(key);
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
        localStorage.removeItem(key);
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
        localStorage.clear();
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
        return Object.keys(localStorage);
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
      return localStorage.getItem(key) !== null;
    } else {
      return this.fallbackStorage.has(key);
    }
  }
}

export const storageAdapter = new StorageAdapter();
