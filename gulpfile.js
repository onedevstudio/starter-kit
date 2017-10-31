'use strict'

const {
  task,
  src,
  dest,
  watch
} = require('gulp-named')

const config = require('./config')
const sequence = require('run-sequence')
const assign = require('lodash.assign')
const isProduction = config.isProduction
const $ = config.plugins

task('eslint', () =>
  src(['./src/scripts/**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format()))

task('images', () =>
  src('./src/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.size(config.size('images')))
    .pipe(dest('./public/assets/images')))

task('static', () =>
  src('./src/static/*')
    .pipe($.size(config.size('static')))
    .pipe(dest('./public')))

task('fonts', () =>
  src('./node_modules/font-awesome/fonts/*')
    .pipe(dest('./public/assets/fonts')))

task('templates', () =>
  src('./src/views/*.pug')
    .pipe($.plumber(config.plumber))
    .pipe($.data(file => assign({ fileHash: config.fileHash }, config.pkg)))
    .pipe($.pug({
      pretty: !isProduction
    }))
    .pipe($.size(config.size('templates')))
    .pipe(dest('./public'))
    .pipe($.plumber.stop()))

task('scripts', ['eslint', 'scripts:vendor'], () =>
  src(['./src/scripts/**/*.js'])
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
    .pipe(dest('./public/assets/javascripts'))
    .pipe($.plumber.stop()))

task('scripts:vendor', () =>
  src([
    './node_modules/jquery/dist/jquery.min.js'
  ])
    .pipe($.plumber(config.plumber))
    .pipe($.concat(`vendor${config.fileHash}.js`, {
      newLine: ''
    }))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe($.size(config.size('scripts:vendor')))
    .pipe(dest('./public/assets/javascripts'))
    .pipe($.plumber.stop()))

task('stylus', () =>
  src('./src/stylus/app.styl')
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
    .pipe(dest('./public/assets/stylesheets'))
    .pipe($.plumber.stop()))

task('webserver', () =>
  src('./public/')
    .pipe($.webserver(config.webServer)))

task('stream', () => {
  watch(['./src/views/**/*'], ['scripts', 'stylus', 'templates'])
  watch(['./src/scripts/**/*'], ['scripts'])
  watch(['./src/stylus/**/*'], ['stylus'])
  watch(['./src/images/**/*'], ['images'])
})

task('build', (cb) =>
  sequence(['static', 'templates', 'stylus', 'scripts', 'images', 'fonts'], cb))

task('default', (cb) => sequence('build', 'stream', ['webserver'], cb))
