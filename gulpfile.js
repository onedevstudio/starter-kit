'use strict'

const gulp = require('gulp')
const sequence = require('run-sequence')
const pkg = require('./package.json')

const config = require('./config')
const isProduction = config.isProduction
const $ = config.plugins

gulp.task('eslint', () =>
  gulp.src(['./src/scripts/**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format()))

gulp.task('images', () =>
  gulp.src('./src/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.size(config.size('images')))
    .pipe(gulp.dest('./public/assets/images')))

gulp.task('static', () =>
  gulp.src('./src/static/*')
    .pipe($.size(config.size('static')))
    .pipe(gulp.dest('./public')))

gulp.task('fonts', () =>
  gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./public/assets/fonts')))

gulp.task('templates', () =>
  gulp.src('./src/views/*.pug')
    .pipe($.plumber(config.plumber))
    .pipe($.data(file => pkg))
    .pipe($.pug({
      pretty: !isProduction
    }))
    .pipe($.size(config.size('templates')))
    .pipe(gulp.dest('./public'))
    .pipe($.plumber.stop()))

gulp.task('scripts', ['eslint', 'scripts:vendor'], () =>
  gulp.src(['./src/scripts/**/*.js'])
    .pipe($.plumber(config.plumber))
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js', {
      newLine: ''
    }))
    .pipe($.babel())
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe($.rename('bundle.js'))
    .pipe($.sourcemaps.write())
    .pipe($.size(config.size('scripts')))
    .pipe(gulp.dest('./public/assets/javascripts'))
    .pipe($.plumber.stop()))

gulp.task('scripts:vendor', () =>
  gulp.src([
    './node_modules/jquery/dist/jquery.min.js'
  ])
    .pipe($.plumber(config.plumber))
    .pipe($.concat('vendor.js', {
      newLine: ''
    }))
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe($.size(config.size('scripts:vendor')))
    .pipe(gulp.dest('./public/assets/javascripts'))
    .pipe($.plumber.stop()))

gulp.task('stylus', () =>
  gulp.src('./src/stylus/app.styl')
    .pipe($.plumber(config.plumber))
    .pipe($.sourcemaps.init())
    .pipe($.stylus(config.stylus))
    .pipe($.combineMq({
      beautify: true
    }))
    .pipe(isProduction ? $.cssnano(config.cssnano) : $.util.noop())
    .pipe($.rename('bundle.css'))
    .pipe($.sourcemaps.write())
    .pipe($.size(config.size('stylus')))
    .pipe(gulp.dest('./public/assets/stylesheets'))
    .pipe($.plumber.stop()))

gulp.task('webserver', () =>
  gulp.src('./public/')
    .pipe($.webserver(config.webServer)))

gulp.task('stream', () => {
  gulp.watch(['./src/views/**/*'], ['scripts', 'stylus', 'templates'])
  gulp.watch(['./src/scripts/**/*'], ['scripts'])
  gulp.watch(['./src/stylus/**/*'], ['stylus'])
  gulp.watch(['./src/images/**/*'], ['images'])
})

gulp.task('build', (cb) =>
  sequence(['static', 'templates', 'stylus', 'scripts', 'images', 'fonts'], cb))

gulp.task('default', (cb) => sequence('build', 'stream', ['webserver'], cb))
