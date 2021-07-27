import Vue from 'vue'
import App from './App'
import uView from './uview-ui'

// default settings
Vue.config.productionTip = false
App.mpType = 'app'

// vue use
Vue.use(uView)

const app = new Vue({
  ...App
})
app.$mount()
