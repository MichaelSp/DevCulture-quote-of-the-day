const { description, repository } = require('../../package')

const parts = repository.split('/')
const repoName = '/' + parts[parts.length - 1].replace(/.git$/,"")

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'DevCulture Quotes',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#336699' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  base: (process.env.npm_lifecycle_event === 'dev' ? '/' : repoName),
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/MichaelSp/DevCulture-quote-of-the-day.git',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    docsDir: '',
    lastUpdated: true,
    nav: [],
    sidebar: {},
    search: false
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom'
  ]
}
