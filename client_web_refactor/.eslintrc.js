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
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        "alwaysTryTypes": true
      }
    },
  },
  plugins: [
    'react',
    'react-hooks',
    "@typescript-eslint",
    'import'
  ],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/interface-name-prefix": ["error", {"prefixWithI": "always"}],
    "linebreak-style": ["error", "windows"],
    "no-param-reassign": ["off"],
    "no-plusplus": ["off"],
    "no-control-regex": ["off"],
    "no-console": ["off"],
    "import/no-cycle": ["off"],
    "import/no-mutable-exports": ["off"],
    "import/prefer-default-export": ["off"],
    "react/destructuring-assignment": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/prop-types": ["off"],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  },
};
