import webpack from 'webpack'
import { parallel } from 'gulp'
import { webpackConfig } from './config'

const _webpack = () =>
  new Promise(resolve => webpack(webpackConfig, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString({ /* stats options */ }))
    resolve()
  }))

const _task = parallel(_webpack)
_task.description = '{{ build all scripts }}'

export const build = _task
