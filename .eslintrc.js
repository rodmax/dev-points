// @ts-check

/**
 * @typedef { import('eslint').Linter.Config } EslintConfig
 * @type { EslintConfig }
 */
module.exports = {
    root: true,
    extends: ['eslint:recommended'],
    env: {
        es6: true,
        es2017: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
    rules: {
        'no-console': 'error',
        'no-debugger': 'error',
    },
}
