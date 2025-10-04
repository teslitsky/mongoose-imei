const pluginJs = require('@eslint/js');
const globals = require('globals');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: ['**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
