const pkg = require('./package.json')
const { join } = require('path')
const loadPlugins = require('gulp-load-plugins')
const crypto = require('crypto')
const jeet = require('jeet')
const rupture = require('rupture')

const env = process.env.NODE_ENV || 'production'
const isProduction = env === 'production'
const $ = loadPlugins()

const hasher = crypto.createHash('sha1').update(new Date().toLocaleString(), 'utf8')
const fileHash = isProduction ? `.${hasher.digest('hex').slice(0, 8)}.min` : ''

module.exports = {
  pkg,
  isProduction,
  plugins: $,
  fileHash,
  src: {
    stylus: './src/stylus',
    scripts: './src/scripts',
    views: './src/views',
    static: './src/static',
    images: './src/images'
  },
  dest: {
    dist: './dist',
    stylesheets: './dist/assets/stylesheets',
    javascripts: './dist/assets/javascripts',
    images: './dist/assets/images',
    fonts: './dist/assets/fonts'
  },
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
