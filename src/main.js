// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import './components/firebase'
import FullCalendar from 'vue-full-calendar'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'
// import VueGoogleMaps from 'vue2-google-maps'

import 'chart.js'
import 'hchs-vue-charts'
Vue.use(window.VueCharts)

Vue.use(FullCalendar)
Vue.use(BootstrapVue)
Vue.use(VueFire)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB2e-_6gI7F9dAKzgyU90m89XxAHlagNWg'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
