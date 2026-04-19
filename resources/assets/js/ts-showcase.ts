/**
 * TypeScript patterns used by the boilerplate's demo.
 *
 * Each export below showcases a common TS feature:
 *   • interfaces & type aliases
 *   • generics
 *   • discriminated unions
 *   • type guards
 *   • utility types (Partial, Readonly, Pick)
 */

// ─────────────────────────────────────────────────────────────
// Interfaces & type aliases
// ─────────────────────────────────────────────────────────────

export interface PluginInfo {
  readonly name: string;
  readonly version: string;
  readonly author: string;
}

export type Slug = `${Lowercase<string>}-${string}` | string;

// ─────────────────────────────────────────────────────────────
// Discriminated union for async UI state
// ─────────────────────────────────────────────────────────────

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// ─────────────────────────────────────────────────────────────
// Generic utility — safe reduce with inferred accumulator
// ─────────────────────────────────────────────────────────────

export function collect<TItem, TKey extends string | number>(
  items: ReadonlyArray<TItem>,
  keyFn: (item: TItem) => TKey
): Record<TKey, TItem[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      (acc[key] ??= []).push(item);
      return acc;
    },
    {} as Record<TKey, TItem[]>
  );
}

// ─────────────────────────────────────────────────────────────
// Type guards
// ─────────────────────────────────────────────────────────────

export function isPluginInfo(value: unknown): value is PluginInfo {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as PluginInfo).name === 'string' &&
    typeof (value as PluginInfo).version === 'string' &&
    typeof (value as PluginInfo).author === 'string'
  );
}

// ─────────────────────────────────────────────────────────────
// Utility types: a typed "settings" updater
// ─────────────────────────────────────────────────────────────

export interface Settings {
  debug: boolean;
  maxRetries: number;
  apiEndpoint: string;
}

/** Returns a new settings object with the given fields overridden. */
export function updateSettings(current: Settings, patch: Partial<Settings>): Readonly<Settings> {
  return Object.freeze({ ...current, ...patch });
}

/** Pick only the keys needed for the HTTP section of a settings dialog. */
export type HttpSettings = Pick<Settings, 'maxRetries' | 'apiEndpoint'>;
