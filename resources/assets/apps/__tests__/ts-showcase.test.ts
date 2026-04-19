import {
  collect,
  isPluginInfo,
  updateSettings,
  type PluginInfo,
  type Settings,
} from '../../js/ts-showcase';

describe('collect (generic groupBy)', () => {
  it('groups items by the provided key function', () => {
    const items = [
      { id: 1, type: 'post' },
      { id: 2, type: 'page' },
      { id: 3, type: 'post' },
    ];
    expect(collect(items, (i) => i.type)).toEqual({
      post: [
        { id: 1, type: 'post' },
        { id: 3, type: 'post' },
      ],
      page: [{ id: 2, type: 'page' }],
    });
  });

  it('returns an empty object for empty input', () => {
    expect(collect([], (_: unknown) => 'x')).toEqual({});
  });
});

describe('isPluginInfo (type guard)', () => {
  it('accepts a well-shaped object', () => {
    const value: unknown = { name: 'WPK', version: '1', author: 'gf' };
    expect(isPluginInfo(value)).toBe(true);
    if (isPluginInfo(value)) {
      const narrowed: PluginInfo = value; // compile-time check that the guard narrowed
      expect(narrowed.name).toBe('WPK');
    }
  });

  it('rejects null, arrays, and partial shapes', () => {
    expect(isPluginInfo(null)).toBe(false);
    expect(isPluginInfo([])).toBe(false);
    expect(isPluginInfo({ name: 'x' })).toBe(false);
    expect(isPluginInfo({ name: 'x', version: 1, author: 'y' })).toBe(false);
  });
});

describe('updateSettings (utility types)', () => {
  const base: Settings = { debug: false, maxRetries: 3, apiEndpoint: '/api' };

  it('applies a partial patch immutably', () => {
    const next = updateSettings(base, { debug: true });
    expect(next.debug).toBe(true);
    expect(next.maxRetries).toBe(3);
    expect(base.debug).toBe(false); // original unchanged
  });

  it('returns a frozen object', () => {
    const next = updateSettings(base, {});
    expect(Object.isFrozen(next)).toBe(true);
  });
});
