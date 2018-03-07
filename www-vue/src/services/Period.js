import Http from '@/services/Http'

const Period = {
  loadPeriod (parameters = {}) {
    let uri = '/sessions'
    const uriParam = []
    Object.keys(parameters).forEach(function (key) {
      uriParam.push(`${key}=${encodeURIComponent(parameters[key])}`)
    })
    if (uriParam.length > 0) {
      uri += '?' + uriParam.join('&')
    }
    return Http.request(uri, 'GET')
  },
  updatePeriodStatus (period, status) {
    period.closed = status
    return Http.request('/sessions', 'POST', period)
      .catch(error => {
        if (error) period.closed = status === 1 ? 0 : 1
      })
  },
  deletePeriod (period) {
    if (!confirm('Do you want to delete this period?')) {
      return new Promise((resolve, reject) => resolve(null))
    }
    return Http.request('/sessions', 'DELETE', period)
  }
}

export default Period
