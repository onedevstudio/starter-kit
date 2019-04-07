const fs = require('fs')
const {
  dirname,
  basename,
  resolve
} = require('path')

module.exports = {
  plugins: {
    'rucksack-css': {},
    'lost': {},
    'postcss-font-magician': {},
    'autoprefixer': {
      browsers: [
        '>= 1%',
        'last 1 major version',
        'not dead',
        'Chrome >= 45',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 9',
        'Safari >= 9',
        'Android >= 4.4',
        'Opera >= 30'
      ]
    },
    'cssnano': {
      add: true
    },
    'postcss-modules': {
      getJSON (cssFileName, json) {
        const isComponent = /components/.test(dirname(cssFileName))

        if (isComponent) {
          const cssName = basename(`${cssFileName}`)
          const jsonFileName = resolve(`${dirname(cssFileName)}/${cssName.split('.')[0]}-css.json`)
          fs.writeFileSync(jsonFileName, JSON.stringify(json))
        }
      }
    }
  }
}
