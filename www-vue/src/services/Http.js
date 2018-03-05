import Auth from '../services/Auth'
import Config from '../../../api-nj/config'

class Http {
  constructor () {
    this.baseUrl = Config.apiUrl
  }
  request (url, method = 'GET', parameters = null) {
    const headers = {
      method: method,
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
      },
      mode: 'cors',
      cache: 'default'
    }
    const token = Auth.getToken()
    if (token) {
      headers.headers.Authorization = token
    }
    if (parameters) {
      headers.body = JSON.stringify(parameters)
      headers.headers['Content-Type'] = 'application/json; charset=utf-8'
    }
    return fetch(this.baseUrl + url, headers)
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response.error) throw response.error
        if (response.token) Auth.setToken(response.token)
        return response
      })
  }
}
export default new Http()
