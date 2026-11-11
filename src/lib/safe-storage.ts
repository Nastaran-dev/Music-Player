import type { StateStorage } from "zustand/middleware";

export const safeLocalStorage: StateStorage = {
  getItem: (name) => {
    try {
      const raw = window.localStorage.getItem(name);
      if (raw === null) return null;
      JSON.parse(raw);
      return raw;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {

    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      
    }
  },
};
