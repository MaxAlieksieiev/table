export class VaultService {
  private static readonly storage = localStorage;

  static setItem<T>(key: string, value: T): void {
    try {
      return this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('e: ', e);
    }
  }

  static removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  static getItem<T = string>(key: string): T | undefined {
    try {
      return JSON.parse(this.storage.getItem(key) as string);
    } catch (error) {
      console.error(error);
    }
  }

  static clearStorage(): void {
    this.storage.clear();
  }
}
