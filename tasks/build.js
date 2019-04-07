import webpack from 'webpack'
import { series } from 'gulp'
import { webpackConfig } from './config'
import { favicons } from './favicons'
import { copyFiles } from './static'

const _webpack = () =>
  new Promise(resolve => webpack(webpackConfig, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString({ /* stats options */ }))
    resolve()
  }))

const _task = series(_webpack, favicons, copyFiles)
_task.description = '{{ build all scripts }}'

export const build = _task
