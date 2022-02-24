/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'typescript-sort-keys'
  ],
  rules: {
    ...require('eslint-config-prettier').rules,
    'prettier/prettier': [
      2,
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: true,
      },
    ],
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'no-restricted-exports': 'off',
    'arrow-body-style': 'off'
  },
};
