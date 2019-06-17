import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/knife.ts',
  output: [
    {
      file: './dist/knife.js',
      format: 'umd',
      exports: 'named',
      name: 'knife',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
}