import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  setItem(key: string, value: unknown): void {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, <string>value)
    }
  }

  getItem<T = string>(key: string): (T extends object ? T : string) | null {
    const target = localStorage.getItem(key);
    if (!target) {
      return null;
    }
    try {
      return target as T extends object ? T : string;
    } catch (e) {
      return target as T extends object ? T : string;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
