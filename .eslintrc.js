module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['react'],
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
};
