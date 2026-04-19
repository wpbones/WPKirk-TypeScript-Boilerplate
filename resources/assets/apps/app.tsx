import { createRoot, type ReactNode } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
  collect,
  isPluginInfo,
  updateSettings,
  type AsyncState,
  type PluginInfo,
  type Settings,
} from '../js/ts-showcase';

// ─────────────────────────────────────────────────────────────
// Sample data used by the live demo
// ─────────────────────────────────────────────────────────────

const pluginInfoSample: unknown = {
  name: 'WP Kirk TypeScript',
  version: '2.0.0',
  author: 'Giovambattista Fazioli',
};

const state: AsyncState<ReadonlyArray<PluginInfo>> = isPluginInfo(pluginInfoSample)
  ? { status: 'success', data: [pluginInfoSample] }
  : { status: 'error', error: 'type guard rejected the shape' };

const posts = [
  { id: 1, type: 'post' as const, title: 'Hello, TypeScript' },
  { id: 2, type: 'page' as const, title: 'About' },
  { id: 3, type: 'post' as const, title: 'Generics 101' },
  { id: 4, type: 'attachment' as const, title: 'logo.png' },
];
const postsByType = collect(posts, (p) => p.type);

const baseSettings: Settings = { debug: false, maxRetries: 3, apiEndpoint: '/api' };
const nextSettings = updateSettings(baseSettings, { debug: true, maxRetries: 5 });

// ─────────────────────────────────────────────────────────────
// Presentational helpers — plain HTML + inline styles, no UI kit.
// This boilerplate intentionally avoids Mantine or @wordpress/components
// so the focus stays on the TypeScript story.
// ─────────────────────────────────────────────────────────────

const Card = ({ title, hint, children }: { title: string; hint: string; children: ReactNode }) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid #dcdcde',
      borderRadius: 6,
      padding: 16,
      boxShadow: '0 1px 1px rgba(0,0,0,.04)',
    }}
  >
    <h3 style={{ marginTop: 0, marginBottom: 4, fontSize: 15 }}>{title}</h3>
    <p style={{ margin: '0 0 12px', color: '#646970', fontSize: 13 }}>{hint}</p>
    {children}
  </div>
);

const Badge = ({ tone, children }: { tone: 'ok' | 'warn' | 'info'; children: ReactNode }) => {
  const palette = {
    ok: { bg: '#e5f6ea', fg: '#055e30' },
    warn: { bg: '#fcf9e8', fg: '#614f00' },
    info: { bg: '#e1eaf8', fg: '#1d4ed8' },
  }[tone];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 999,
        background: palette.bg,
        color: palette.fg,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
};

const KV = ({ label, value }: { label: string; value: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: 8,
      fontSize: 13,
      margin: '4px 0',
      alignItems: 'flex-start',
    }}
  >
    <span style={{ color: '#646970', minWidth: 90, flexShrink: 0 }}>{label}</span>
    <span
      style={{
        fontFamily: 'ui-monospace, Menlo, monospace',
        flex: 1,
        minWidth: 0,
        overflowWrap: 'anywhere',
        wordBreak: 'break-word',
      }}
    >
      {value}
    </span>
  </div>
);

// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────

const App = () => {
  return (
    <section style={{ maxWidth: 980 }}>
      <h2 style={{ marginTop: 0 }}>{__('TypeScript Boilerplate', 'wp-kirk')}</h2>
      <p style={{ color: '#646970', marginTop: 4 }}>
        {__(
          'Live demo of the TypeScript patterns imported from resources/assets/js/ts-showcase.ts.',
          'wp-kirk'
        )}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 16,
          marginTop: 16,
        }}
      >
        <Card
          title={__('Type guard', 'wp-kirk')}
          hint="isPluginInfo(value): value is PluginInfo"
        >
          {state.status === 'success' ? (
            <>
              <div style={{ marginBottom: 8 }}>
                <Badge tone="ok">✓ {__('accepted', 'wp-kirk')}</Badge>
              </div>
              {state.data.map((p) => (
                <div key={p.name}>
                  <KV label="name" value={p.name} />
                  <KV label="version" value={p.version} />
                  <KV label="author" value={p.author} />
                </div>
              ))}
            </>
          ) : (
            <Badge tone="warn">✗ {state.error}</Badge>
          )}
        </Card>

        <Card
          title={__('Generic helper', 'wp-kirk')}
          hint="collect<T, K>(items, keyFn): Record<K, T[]>"
        >
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#646970' }}>
                <th style={{ padding: '4px 0' }}>{__('Type', 'wp-kirk')}</th>
                <th style={{ padding: '4px 0', width: 60 }}>{__('Count', 'wp-kirk')}</th>
                <th style={{ padding: '4px 0' }}>{__('Titles', 'wp-kirk')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(postsByType).map(([type, items]) => (
                <tr key={type} style={{ borderTop: '1px solid #f0f0f1' }}>
                  <td style={{ padding: '6px 0' }}>
                    <Badge tone="info">{type}</Badge>
                  </td>
                  <td style={{ padding: '6px 0' }}>{items.length}</td>
                  <td style={{ padding: '6px 0', color: '#1d2327' }}>
                    {items.map((i) => i.title).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card
          title={__('Discriminated union', 'wp-kirk')}
          hint="AsyncState<T> = { idle } | { loading } | { success, data } | { error, error }"
        >
          <KV
            label="current"
            value={
              <Badge tone={state.status === 'success' ? 'ok' : 'warn'}>{state.status}</Badge>
            }
          />
          <KV
            label="narrowed"
            value={
              state.status === 'success'
                ? `data: PluginInfo[] (len=${state.data.length})`
                : `error: string`
            }
          />
        </Card>

        <Card
          title={__('Utility types', 'wp-kirk')}
          hint="updateSettings(current, patch: Partial<Settings>): Readonly<Settings>"
        >
          <KV label="before" value={JSON.stringify(baseSettings, null, 2)} />
          <KV
            label="patch"
            value={
              <>
                <Badge tone="info">Partial&lt;Settings&gt;</Badge>{' '}
                <span>{`{ debug: true, maxRetries: 5 }`}</span>
              </>
            }
          />
          <KV label="after" value={JSON.stringify(nextSettings, null, 2)} />
          <KV
            label="frozen?"
            value={<Badge tone="ok">{String(Object.isFrozen(nextSettings))}</Badge>}
          />
        </Card>
      </div>
    </section>
  );
};

const container = document.getElementById('react-app');
if (container) {
  createRoot(container).render(<App />);
}
