import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

const Auth = {
  getToken () {
    return Vue.cookie.get('os-tkn')
  },

  setToken (token) {
    Vue.cookie.set('os-tkn', token)
  },

  isLogged () {
    return !!this.getToken()
  },

  logOff () {
    Vue.cookie.delete('os-tkn')
  }
}

export default Auth
