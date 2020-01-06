module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "linebreak-style": ["error", "windows"],
    "import/no-cycle": ["off"],
    "react/destructuring-assignment": ["off"],
    "no-plusplus": ["off"],
    "react/jsx-props-no-spreading": ["off"]
  },
};
