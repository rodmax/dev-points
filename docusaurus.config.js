// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const TITLE = 'DevPoints'
const PROJECT_NAME = 'dev-points'

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: TITLE,
    tagline: '',
    url: 'https://rodmax.github.io',
    baseUrl: `/${PROJECT_NAME}/`,
    trailingSlash: false,
    organizationName: 'rodmax',
    projectName: PROJECT_NAME,
    favicon: 'img/favicon.svg',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    themeConfig: {
        navbar: {
            title: `<${TITLE}/>`,
            logo: {
                alt: 'Dev Tips Logo',
                src: 'img/ava.png',
            },
            items: [
                {
                    href: 'https://github.com/rodmax',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'light',
            links: [],
            copyright: `Copyright © ${new Date().getFullYear()} Max Rodionov. Built with <a target="_blank" href="https://docusaurus.io">Docusaurus</a>.`,
        },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
        },
    },
    plugins: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                hashed: true,
                language: ['en', 'ru'],
                blogRouteBasePath: '/',
            },
        ],
    ],
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: false,
                blog: {
                    routeBasePath: '/',
                    showReadingTime: true,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
}
