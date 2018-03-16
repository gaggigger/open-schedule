import Auth from '@/services/Auth'
import Config from '../../../api-nj/config'
import Notification from '@/services/Notification'
// import Loading from '@/services/Loading'
import Loading from '@/components/Loading'

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

      if (Auth.isLogged()) {
        h.headers.Authorization = Auth.getToken()
      }

      if (parameters !== null) {
        if (method === 'GET') {
          url += '?' + Object.keys(parameters).reduce((acc, k) => {
            acc.push(`${k}=${encodeURIComponent(parameters[k])}`)
            return acc
          }, []).join('&')
          console.log(url)
        } else {
          h.body = JSON.stringify(parameters)
          h.headers['Content-Type'] = 'application/json; charset=utf-8'
        }
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
