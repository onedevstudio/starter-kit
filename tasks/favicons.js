import { src, dest, parallel } from 'gulp'
import { paths, $, faviconsConfig } from './config'

const _favicons = () =>
  src([`${paths.src}/images/icon.png`])
    .pipe($.favicons(faviconsConfig))
    .pipe(dest(`${paths.dist}${faviconsConfig.path}`))

const _task = parallel(_favicons)
_task.description = '{{ generate favicons }}'

export const favicons = _task
