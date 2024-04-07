import { VaultService } from '../src/services/vaultService';

const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

describe('VaultService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves an item correctly', () => {
    const testObject = { key: 'value' };
    VaultService.setItem('test', testObject);
    expect(VaultService.getItem('test')).toEqual(testObject);
  });

  it('returns null for non-existent items', () => {
    expect(VaultService.getItem('nonExistent')).toBeNull();
  });

  it('removes an item correctly', () => {
    VaultService.setItem('itemToRemove', 'value');
    VaultService.removeItem('itemToRemove');
    expect(VaultService.getItem('itemToRemove')).toBeNull();
  });

  it('clears all storage correctly', () => {
    VaultService.setItem('item1', 'value1');
    VaultService.setItem('item2', 'value2');
    VaultService.clearStorage();
    expect(VaultService.getItem('item1')).toBeNull();
    expect(VaultService.getItem('item2')).toBeNull();
  });

  it('handles parsing errors gracefully', () => {
    localStorage.setItem('badJson', '{notValidJson');
    expect(() => VaultService.getItem('badJson')).not.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(VaultService.getItem('badJson')).toEqual(undefined);
  });
});
