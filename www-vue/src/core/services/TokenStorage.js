import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const TokenStorage = {
  get (key) {
    return Vue.cookie.get(key)
  },
  set (key, value) {
    Vue.cookie.set(key, value)
  },
  remove (key) {
    Vue.cookie.delete(key)
  }
}

export default TokenStorage
