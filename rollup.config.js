import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',

  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],

  output: {
    name: 'SemanticDomSelectors',
    file: 'dist/semantic-dom-selectors.js',
    format: 'amd',
    amd: {
      id: 'semantic-dom-selectors',
    },
    sourcemap: true,
  },
};
