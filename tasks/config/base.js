require('dotenv').config()

export const {
  NODE_ENV,
  DOTENV_CONFIG_EXAMPLE
} = process.env

const config = require('../../site-config.json')
export const pkg = require('../../package.json')

export const env = NODE_ENV || 'development'
export const isProduction = env === 'production'

export const homepage = isProduction ? pkg.homepage : 'http://localhost:3000'
export const ga = isProduction ? config.ga : 'UA-000000000-1'

delete pkg.main
delete pkg.engines
delete pkg.scripts
delete pkg.dependencies
delete pkg.devDependencies

export const siteConfig = {
  ...pkg,
  ...{ env, isProduction, homepage },
  ...config,
  ...{ ga }
}
