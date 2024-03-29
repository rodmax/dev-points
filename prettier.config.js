// @ts-check
/**
 * @typedef { import('prettier').Options } PrettierConfig
 * @typedef { {files: string | string[], options: PrettierConfig} } PrettierOverrideConfig
 * @type { PrettierConfig & { overrides?: PrettierOverrideConfig[] } }
 */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    printWidth: 100,
    quoteProps: 'as-needed',
    jsxSingleQuote: true,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'avoid',
    overrides: [
        {
            files: '*.{json,yaml,yml}',
            options: { tabWidth: 2 },
        },
    ],
}
module.exports = config
