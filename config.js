'use strict'

const { join } = require('path')
const loadPlugins = require('gulp-load-plugins')
const jeet = require('jeet')
const rupture = require('rupture')

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const $ = loadPlugins()

module.exports = {
  isProduction,
  plugins: $,
  stylus: {
    'include css': true,
    include: [
      join(__dirname, 'node_modules')
    ],
    use: [
      jeet(),
      rupture()
    ]
  },
  cssnano: {
    add: true,
    autoprefixer: {
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox >= 20'
      ]
    }
  },
  plumber: {
    errorHandler: $.notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
    })
  },
  webServer: {
    livereload: !$.util.env.livereload,
    port: $.util.env.port || '3000',
    open: !!$.util.env.open
  },
  size: taskName => {
    return {
      title: `Task: ${taskName} -`,
      showFiles: true
    }
  }
}
