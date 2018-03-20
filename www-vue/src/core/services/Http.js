import Auth from './Auth'
import Config from '../../../../api-nj/config'
import Notification from './Notification'
import Loading from '../components/Loading.vue'
import Period from '../services/Period'

const Http = function () {
  const baseUrl = Config.apiUrl
  const headers = {
    headers: {
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Accept-Charset': 'utf-8'
    },
    mode: 'cors',
    cache: 'default'
  }

  return {
    request (url, method = 'GET', parameters = {}) {
      const h = Object.assign({
        method: method
      }, headers)
      // Add token header
      if (Auth.isLogged()) {
        h.headers.Authorization = Auth.getToken()
      }
      // Add session parameter
      parameters = Object.assign(parameters, {
        sessions: Period.currentPeriod()
      })
      if (method === 'GET') {
        url += '?' + Object.keys(parameters).reduce((acc, k) => {
          acc.push(`${k}=${encodeURIComponent(parameters[k])}`)
          return acc
        }, []).join('&')
      } else {
        h.body = JSON.stringify(parameters)
        h.headers['Content-Type'] = 'application/json; charset=utf-8'
      }

      Loading.methods.increase()

      return fetch(baseUrl + url, h)
        .then(response => {
          Loading.methods.decrease()
          return response.json()
        })
        .then(response => {
          if (response.error) throw response.error
          if (response.token) Auth.setToken(response.token)
          return response
        })
        .catch(err => {
          Loading.methods.decrease()
          if (err) Notification.error(err)
        })
    }
  }
}

export default new Http()
