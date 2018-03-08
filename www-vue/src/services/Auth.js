import Vue from 'vue'
import VueCookie from 'vue-cookie'
import TokenStorage from '@/services/TokenStorage'

Vue.use(VueCookie)

const Auth = {
  getToken () {
    return TokenStorage.get('os-tkn')
  },
  setToken (token) {
    TokenStorage.set('os-tkn', token)
  },
  isLogged () {
    const token = this.getToken()
    return !!token
  },
  logOff () {
    TokenStorage.remove('os-tkn')
  },
  parseToken () {
    return JSON.parse(atob(this.getToken().split('.')[1]))
  },
  getUsername () {
    const jwt = this.parseToken()
    return jwt['username']
  },
  getRoles () {
    const jwt = this.parseToken()
    return jwt['roles']
  }
}

export default Auth
