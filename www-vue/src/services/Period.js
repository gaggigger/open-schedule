import Http from '@/services/Http'

const Period = {
  loadPeriod (parameters = {}) {
    return Http.request('/sessions', 'GET', parameters)
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
  },
  currentPeriod () {
    return 1
  }
}

export default Period
