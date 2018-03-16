import Auth from '@/services/Auth'
import Config from '../../../api-nj/config'
import Notification from '@/services/Notification'
// import Loading from '@/services/Loading'

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
    request (url, method = 'GET', parameters = null) {
      const h = Object.assign({
        method: method
      }, headers)

      const token = Auth.getToken()
      if (token) {
        h.headers.Authorization = token
      }
      if (parameters) {
        h.body = JSON.stringify(parameters)
        h.headers['Content-Type'] = 'application/json; charset=utf-8'
      }
      if (window.AppVue) window.AppVue.$children[0].$refs['app-loading'].increase()
      return fetch(baseUrl + url, h)
        .then(response => {
          if (window.AppVue) window.AppVue.$children[0].$refs['app-loading'].decrease()
          return response.json()
        })
        .then(response => {
          if (response.error) throw response.error
          if (response.token) Auth.setToken(response.token)
          return response
        })
        .catch(err => {
          if (window.AppVue) window.AppVue.$children[0].$refs['app-loading'].decrease()
          if (err) Notification.error(err)
        })
    }
  }
}

export default new Http()
