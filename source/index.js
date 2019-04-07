import * as offline from 'offline-plugin/runtime'

import './styles/main.scss'
import './components/hero/hero.js'
import './components/buttons/button.js'

offline.install({
  onUpdateReady: () => offline.applyUpdate()
})
