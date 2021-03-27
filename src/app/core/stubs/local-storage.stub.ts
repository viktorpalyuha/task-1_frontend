export class LocalStorageStub {
  store = {};
  mockLocalStorage = {
    getItem: (key: string): string => {
      return key in this.store ? this.store[key] : null;
    },
    
    setItem: (key: string, value: string) => {
      this.store[key] = `${value}`;
    },
  };
  public getLocalStorage() {
    return this.mockLocalStorage;
  }
}
