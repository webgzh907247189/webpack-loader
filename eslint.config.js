const globals = require('globals');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
    { files: ['**/*.{ts}'] },
    {
        ignores: ['prettier.config.js', '**/dist/']
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: { globals: globals.browser },
        // parser: '@typescript-eslint/parser',
        // extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-this-alias': 'off',
        }
    },
];
