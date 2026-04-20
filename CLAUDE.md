# WPKirk-TypeScript-Boilerplate

Focused **TypeScript showcase** — idiomatic TS patterns in a WordPress plugin: interfaces,
generics, discriminated unions, type guards, utility types (`Partial`, `Readonly`,
`Record`), branded types. No third-party UI kit; plain HTML + inline styles so the focus stays
on the TypeScript story.

## What this demos

`resources/assets/apps/app.tsx` renders a live dashboard that walks through the patterns in
`resources/assets/js/ts-showcase.ts`:

- **Interface + type guard** — `isPluginInfo(value: unknown): value is PluginInfo`
- **Discriminated union** — `AsyncState<T> = { status: 'loading' } | { status: 'success', data: T } | { status: 'error', error: string }`
- **Generic utility** — `collect<T, K extends PropertyKey>(items, keyFn): Record<K, T[]>`
- **Partial + deep spread** — `updateSettings(current, patch: Partial<Settings>): Settings`
- **Branded types** — `type Brand<T, B> = T & { __brand: B }` plus helpers
- **Literal unions** — `PostType = 'post' | 'page' | 'attachment'`

**Key files to read first:**

| File | What to look at |
| --- | --- |
| `resources/assets/js/ts-showcase.ts` | All TypeScript patterns in one file, fully commented |
| `resources/assets/apps/app.tsx` | Live demo rendering the patterns side-by-side |
| `resources/assets/apps/__tests__/ts-showcase.test.ts` | Jest + ts-jest over the showcase helpers |
| `plugin/Ajax/MyAjax.php` | Real WP AJAX endpoint the front-end can call (optional) |
| `tsconfig.json` | Strict mode, `noImplicitAny`, `isolatedModules` |

## Smoke test (manual, ~30s)

With the plugin active:

1. Log in to `wp-admin` and open **WP Kirk TypeScript → Main View**.
2. Verify the cards render without errors — each card shows a pattern name + the computed
   output (JSON values, arrays, etc.).
3. Check browser devtools Console — should be clean. No TS compile errors leak at runtime
   because the bundle is already compiled.
4. Run `yarn test` locally — `__tests__/ts-showcase.test.ts` should all pass.
5. Run `yarn format:check` — should exit 0.

If any of the above fail: check `wp-content/debug.log` for PHP errors, devtools Console for
runtime errors, and `yarn build` output for TypeScript compile warnings.

## Use as a template

```sh
# 1. clone from the GitHub template
gh repo create my-ts-plugin --template wpbones/WPKirk-TypeScript-Boilerplate --public --clone
cd my-ts-plugin

# 2. rename the PHP namespace + plugin slug
composer install
php bones rename "My TS Plugin"

# 3. build + activate
yarn install && yarn build
wp plugin activate my-ts-plugin
```

Replace `ts-showcase.ts` with your own typed helpers. Keep the `__tests__/` folder pattern —
Jest with `@wordpress/jest-preset-default` auto-picks it up.

## Framework surface exercised

This boilerplate is the **TypeScript-strictness regression bed**:

- `tsconfig.json` with `strict: true`, `noImplicitAny: true`, `isolatedModules: true`
- `@wordpress/scripts` webpack loader resolving `.ts` / `.tsx` with type-check
- Jest via `@wordpress/jest-preset-default` over TS files (ts-jest under the hood)
- Prettier + ESLint rules from the WP preset applied to `.ts` sources
- `@wordpress/element` `createRoot` rendering a typed React tree
