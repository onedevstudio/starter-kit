import { src, dest, parallel } from 'gulp'
import { paths, $ } from './config'

const _static = () =>
  src([`${paths.static}/*`])
    .pipe($.size())
    .pipe(dest(paths.dist))

const _images = () =>
  src([`${paths.src}/images/*.{png,jpg,jpeg,gif}`])
    .pipe($.size())
    .pipe(dest(`${paths.dist}/images`))

const _task = parallel(_static, _images)
_task.description = '{{ Copy static files and images }}'

export const copyFiles = _task
