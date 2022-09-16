---
title: TS-type aware configuration files
tags: [frontend, eslintrc, ts, nodejs]
---

## The problem

:bulb: I feel frustrated any time, when i have no autocomplete on typing a property in a config file for a popular tool
like `prettier.config.json`...

<!--truncate-->

Sometimes, the IDE/CodeEditor knowns "schema" of `json/yaml` config and hints when you type(for ex. `tsconfig.json`, `package.json`).
But frequently it is not so.

Notice the problem is not about productivity or business-related code quality metrics
but what developer experience ~~should be~~ i expect in 2022+ year

> If you use the WebStorm and your IDE helps you cook all config files in your project,
> you are lucky and may not read the below part of this blog :smile:.
> But even in this case, I will suggest some advantages you may like. See the [Conclusion](#conclusion) section.

## TypeScript is everywhere

Almost all popular tools in the nodejs world follow trends:

-   involve TypeScript for public API and/or internal development(even JS-written tools try to provide `.d.ts` files as contract)
-   allow different file formats for its configuration files (json,json5,ini,yaml,js)

Both facts allow us to use the following approach...

## TL;DR;

-   Use whenever possible config files in `js` format instead of `json,yaml,ini`
-   Enable TS checking and annotate config object with TS-types using `jsdoc`

The code snippet:

````js
/**
 * .{my-fancy-tool-config}.js
 */
// @ts-check

/** @type {import('my-fancy-tool/path-to-types').ConfigType} */
const config = {
    thisPropertyAutocompleted: ```
        and marks as error in case of
        not existing/missing key
        or wrong type of value```,
}
module.exports = config
````

## Examples

### .eslintrc.js

```js
// @ts-check
/**
 * @type { import('eslint').Linter.Config }
 */
const config = {...}
module.exports = config
```

### webpack.config.js

```js
// @ts-check
/**
 * @typedef { import('webpack').Configuration & {
 *      devServer: import('webpack-dev-server').Configuration
 * }} WebpackConfiguration
 *
 * @type { WebpackConfiguration }
 */
const config = {...}
module.exports = config
```

### prettier.config.js

```js
// @ts-check
/**
 * @typedef { import('prettier').Options } PrettierConfig
 * @typedef { {files: string | string[], options: PrettierConfig} } PrettierOverrideConfig
 * @type { PrettierConfig & { overrides?: PrettierOverrideConfig[] } }
 */
const config = {
    ...,
    tabWidth: 4,
    // "overrides" not provided by original typings
    // so we add our custom "overrides" (see jsdoc comment above)
    overrides: [
        {
            files: '*.{json,yaml,yml}',
            options: { tabWidth: 2 },
        },
    ],
}
module.exports = config
```

### stylelint.config.js

```js
// @ts-check
/**
 * @type { import('stylelint').Config }
 */
const config = {...}
module.exports = config
```

### .testcaferc.js

Below typings is a most hacky example of what did I have to do in the real world, but the solution seems ok to me.

```js
// @ts-check
/// <reference path='node_modules/testcafe/ts-defs/index.d.ts'/>
/**
 * @typedef { Partial<TestCafeConfigurationOptions> & {
 *  hooks?: {
 *      runTest?: {
 *          before?(): void
 *          after?(): void
 *      }
 *  }
 * } } TestCafeImprovedConfig
 */

/**
 * @type { TestCafeImprovedConfig }
 */
const config = {}
module.exports = config
```

### docusaurus.config.js

```js
// @ts-check
/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {...}
module.exports = config
```

## Conclusion

:white_check_mark: pros:

-   good developer experience when configuring tools
-   continuous integration. `Eslint` with enabled `@typescript-eslint/parser` will
    -   mentor your juniors
    -   kick you, if you suddenly decide to quickly tweak the config using `vim` and make typo
    -   catch regressions when you bump tool version
-   find the power of TS in a place where you might not have expected

:disappointed: cons:

-   type annotating may be a challenge for junior/middle developers.
    Typically tool packages don't provide documented way how to add types for configuration.
    In my practice i don't met the issues when i can't fix/workaround it but
    if you are not sure about `Omit,Pick,Partial,ReturnType,infer,Parameters` first practice with this TS-features
    (read this article, if everything in it is familiar and clear to you, you are a TS master)
