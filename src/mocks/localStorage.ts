interface LocalStorageMock {
  store: { [key: string]: string };
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const localStorageMock: LocalStorageMock = {
  store: {},
  getItem(key: string): string | null {
    if (key !== '') {
      return this.store[key];
    }
    return null;
  },
  setItem(key: string, value: string): void {
    this.store[key] = value.toString();
  },
  removeItem(key: string): void {
    delete this.store[key];
  },
  clear(): void {
    this.store = {};
  },
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
