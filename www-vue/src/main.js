// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import Snotify, { SnotifyPosition } from 'vue-snotify'

Vue.config.productionTip = false

Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.rightBottom
  }
})

/* eslint-disable no-new */
window.AppVue = new Vue({
  el: '#app',
  router,
  components: { App },
  data () {
    return {

    }
  },
  template: '<App />'
})

Vue.filter('dateToLocale', function (value) {
  if (value) {
    return moment(String(value)).format('MMMM Do YYYY')
  }
  return value
})
