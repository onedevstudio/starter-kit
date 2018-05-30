'use strict'

const {
  task,
  src,
  dest,
  watch
} = require('gulp-named')

const config = require('./config')
const sequence = require('run-sequence')
const wbBuild = require('workbox-build')
const assign = require('lodash.assign')
const isProduction = config.isProduction
const $ = config.plugins

task('eslint', () =>
  src(['./src/scripts/**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format()))

task('images', () =>
  src(`${config.src.images}/**/*`)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.size(config.size('images')))
    .pipe(dest(config.dest.images)))

task('static', () =>
  src(`${config.src.static}/*`)
    .pipe($.size(config.size('static')))
    .pipe(dest(config.dest.dist)))

task('fonts', () =>
  src([
    './node_modules/font-awesome/fonts/*'
  ])
    .pipe(dest(config.dest.fonts)))

task('templates', () =>
  src('./src/views/*.pug')
    .pipe($.plumber(config.plumber))
    .pipe($.data(file => assign({ fileHash: config.fileHash }, config.pkg)))
    .pipe($.pug({
      pretty: !isProduction
    }))
    .pipe($.rename(path => {
      if (path.basename !== 'index') {
        path.dirname = path.basename
        path.basename = 'index'
      }
      path.extname = '.html'
    }))
    .pipe($.size(config.size('templates')))
    .pipe(dest(config.dest.dist))
    .pipe($.plumber.stop()))

task('scripts', ['eslint', 'scripts:vendor'], () =>
  src([`${config.src.scripts}/**/*.js`])
    .pipe($.plumber(config.plumber))
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js', {
      newLine: ''
    }))
    .pipe($.babel())
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe($.rename(`bundle${config.fileHash}.js`))
    .pipe($.sourcemaps.write())
    .pipe($.size(config.size('scripts')))
    .pipe(dest(config.dest.javascripts))
    .pipe($.plumber.stop()))

task('scripts:vendor', () =>
  src(['./node_modules/jquery/dist/jquery.min.js'])
    .pipe($.plumber(config.plumber))
    .pipe($.concat(`vendor${config.fileHash}.js`, {
      newLine: ''
    }))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe($.size(config.size('scripts:vendor')))
    .pipe(dest(config.dest.javascripts))
    .pipe($.plumber.stop()))

task('stylus', () =>
  src(`${config.src.stylus}/app.styl`)
    .pipe($.plumber(config.plumber))
    .pipe($.sourcemaps.init())
    .pipe($.stylus(config.stylus))
    .pipe($.combineMq({
      beautify: true
    }))
    .pipe(isProduction ? $.cssnano(config.cssnano) : $.util.noop())
    .pipe($.rename(`bundle${config.fileHash}.css`))
    .pipe($.sourcemaps.write())
    .pipe($.size(config.size('stylus')))
    .pipe(dest(config.dest.stylesheets))
    .pipe($.plumber.stop()))

/* eslint no-useless-escape: 0  */
task('generate-service-worker', () => wbBuild.generateSW({
  globDirectory: config.dest.dist,
  swDest: `${config.dest.dist}/sw.js`,
  globPatterns: ['**\/*.{html,js,css}']
})
  .then(() => {
    console.log('Service worker generated.')
  })
  .catch((err) => {
    console.log('[ERROR] This happened: ' + err)
  }))

task('webserver', () =>
  src(config.dest.dist)
    .pipe($.webserver(config.webServer)))

task('stream', () => {
  watch([`${config.src.views}/**/*`], ['templates'])
  watch([`${config.src.scripts}/**/*`], ['scripts'])
  watch([`${config.src.stylus}/**/*`], ['stylus'])
  watch([`${config.src.images}/**/*`], ['images'])
  watch([`${config.src.static}/**/*`], ['static'])
})

task('build', (cb) =>
  sequence([
    'static',
    'templates',
    'stylus',
    'scripts',
    'images',
    'fonts'
  ], [
    'generate-service-worker'
  ], cb))

task('default', (cb) => sequence('build', 'stream', ['webserver'], cb))
