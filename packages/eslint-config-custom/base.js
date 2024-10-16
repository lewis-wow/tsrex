const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: ['@vercel/style-guide/eslint/typescript'].map(require.resolve),
  plugins: ['eslint-plugin-tsdoc'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.eslintrc.js',
    'vite.config.ts',
    'vitest.config.ts',
    'rollup.config.js',
    'rollup.config.ts',
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/ban-types': 'off',
    'tsdoc/syntax': 'warn',
  },
};
