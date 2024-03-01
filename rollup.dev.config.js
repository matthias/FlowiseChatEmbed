import baseConfigs from './rollup.config.js';

import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const devConfigs = baseConfigs.map((config) => ({
  ...config,
  plugins: [
    ...config.plugins, // Spread the existing plugins
    serve({
      open: true,
      verbose: true,
      contentBase: ['dist', 'docs/dist'],
      host: 'localhost',
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4321',
      },
      port: 5678,
    }),
    livereload({
      watch: ['dist', 'demo/dist'],
    }),
  ],
}));

export default devConfigs;
