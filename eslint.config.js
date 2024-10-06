// @ts-check

const js = require('@eslint/js')

/**
 * @typedef { import('eslint').Linter.Config } EslintConfig
 * @type { EslintConfig[] }
 */
module.exports = [
    {
        ignores: ['.docusaurus'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'commonjs',
        },
        rules: {
            'no-console': 'error',
            'no-debugger': 'error',
        },
    },
]
