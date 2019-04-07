import { isProduction, siteConfig } from './base'
import { paths } from './paths'
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

plugins.favicons = require('favicons').stream
plugins.browserSync = require('browser-sync').create()

export const $ = plugins

export const sassConfig = {
  sourceMap: !isProduction,
  includePaths: [
    paths.modules,
    paths.styles,
    paths.components
  ]
}

export const faviconsConfig = {
  appName: siteConfig.name,
  appDescription: siteConfig.description,
  developerName: siteConfig.author.name,
  developerURL: siteConfig.author.site,
  background: '#fff',
  path: '/favicon/',
  url: `${siteConfig.homepage}/`,
  display: 'standalone',
  orientation: 'portrait',
  start_url: '/?homescreen=1',
  version: 1.0,
  logging: false,
  html: 'favicons.html',
  lang: siteConfig.lang,
  pipeHTML: true,
  replace: true
}

export const serviceWorker = {
  safeToUseOptionalCaches: true,
  caches: {
    main: ['index.html'],
    additional: ['*.js?*']
  },
  navigateFallbackURL: '/',
  autoUpdate: true,
  responseStrategy: 'cache-first',
  ServiceWorker: {
    events: true
  },
  AppCache: {
    events: true
  }
}
