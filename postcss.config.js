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
    'autoprefixer': {},
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
