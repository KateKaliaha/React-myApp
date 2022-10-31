describe('localStorage', () => {
  const localStorageMock = (function () {
    let store: Record<string, string> = {};

    return {
      getItem(key: string) {
        return store[key];
      },

      setItem(key: string, value: string) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('data is added into local storage', () => {
    const mockId = 'input';
    const mockJson = 'abcd';
    window.localStorage.setItem(mockId, mockJson);
    expect(window.localStorage.getItem(mockId)).toEqual(mockJson);
  });

  it('data in local storage which is overwritten', () => {
    const mockId = 'input';
    const mockOldData = 'abcd';
    const mockNewData = 'new letters';

    window.localStorage.setItem(mockId, mockOldData);
    expect(window.localStorage.getItem(mockId)).toEqual(mockOldData);

    window.localStorage.setItem(mockId, mockNewData);
    expect(window.localStorage.getItem(mockId)).toEqual(mockNewData);
  });

  it('only one input is in localStorage', () => {
    const mockId = 'input';
    const mockOldData = 'abcd';
    const mockNewData = 'new letters';

    window.localStorage.setItem(mockId, mockOldData);
    window.localStorage.setItem(mockId, mockNewData);

    const allItems = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});
