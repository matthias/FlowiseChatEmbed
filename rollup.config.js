import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const extensions = ['.ts', '.tsx'];

const indexConfig = {
  plugins: [
    resolve({ extensions, browser: true }),
    commonjs(),
    image(), // Enable importing images
    url({
      // Enable importing files as URLs
      include: ['**/assets/*.svg', '**/assets/*.jpg'], // Patterns to include
      limit: 8192, // Files smaller than 8kb will be inlined as base64 URIs
      emitFiles: true, // Whether to copy files to the output directory
      fileName: 'assets/[name][extname]', // Output pattern for the files
    }),
    uglify(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['solid', '@babel/preset-typescript'],
      extensions,
    }),
    postcss({
      plugins: [autoprefixer(), tailwindcss()],
      extract: false,
      modules: false,
      autoModules: false,
      minimize: true,
      inject: false,
    }),
    typescript(),
    typescriptPaths({ preserveExtensions: true }),
    terser({ output: { comments: false } }),
    /* If you want to see the live app */
    copy({
      targets: [{ src: 'preview/*', dest: 'dist/preview' }],
      copyOnce: false,
      watch: 'preview/*',
    }),
    serve({
      open: true,
      openPage: '/preview/index.html',
      verbose: true,
      contentBase: ['dist'],
      host: 'localhost',
      port: 5678,
    }),
    livereload({ watch: ['dist', 'preview'] }),
  ],
};

const configs = [
  {
    ...indexConfig,
    input: ['./src/icollettiva.ts'],
    output: {
      sourcemap: true,
      file: 'dist/icollettiva.js',
      format: 'es',
    },
  },
];

export default configs;
