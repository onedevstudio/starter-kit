import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import gulp from 'gulp'
import { paths, $, webpackConfig } from './config'
import { build } from './build'

const bundler = webpack(webpackConfig)

const _watchScripts = () =>
  gulp.watch(`${paths.src}/**/*.js`, build)

const _bSync = () => {
  $.browserSync.init({
    server: {
      baseDir: paths.dist
    },
    middleware: [
      webpackDevMiddleware(bundler, { /* options */ }),
      webpackHotMiddleware(bundler)
    ]
  })

  _watchScripts()
  gulp.watch(`${paths.dist}/**/*.{html,css,js}`, $.browserSync.reload())
}

const _build = gulp.series(build)
const _watch = gulp.series(_watchScripts)
const _serve = gulp.series(_build, _bSync)

_watch.description = '{{ watch for changes to all source }}'
_serve.description = '{{ serve compiled source on local server at port 3000 }}'

export const watch = _watch
export const server = _serve
