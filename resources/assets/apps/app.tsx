import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { collect, isPluginInfo, type AsyncState, type PluginInfo } from '../js/ts-showcase';

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
];

const postsByType = collect(posts, (p) => p.type);

const App = () => {
  return (
    <section>
      <h2>{__('TypeScript Boilerplate', 'wp-kirk')}</h2>
      <p>
        {__(
          'Showcases interfaces, generics, discriminated unions, type guards, and utility types.',
          'wp-kirk'
        )}
      </p>

      {state.status === 'success' && (
        <pre>
          <code>{JSON.stringify(state.data, null, 2)}</code>
        </pre>
      )}

      <h3>{__('Grouped by type (generic collect helper):', 'wp-kirk')}</h3>
      <pre>
        <code>{JSON.stringify(postsByType, null, 2)}</code>
      </pre>
    </section>
  );
};

const container = document.getElementById('react-app');
if (container) {
  createRoot(container).render(<App />);
}
