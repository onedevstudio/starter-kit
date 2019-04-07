import { resolve, join } from 'path'

const _rootPath = resolve(__dirname, '..', '..')
const _srcPath = join(_rootPath, 'source')
const _distPath = join(_rootPath, 'dist')

export const paths = {
  root: _rootPath,
  modules: join(_rootPath, 'node_modules'),
  src: _srcPath,
  dist: _distPath,
  static: join(_srcPath, 'static'),
  components: join(_srcPath, 'components'),
  pages: join(_srcPath, 'pages'),
  styles: join(_srcPath, 'scss'),
  scripts: join(_srcPath, 'scripts')
}
