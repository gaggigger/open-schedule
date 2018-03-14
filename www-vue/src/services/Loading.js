const HttpCounter = {
  count: 0
}

class Loading {
  showHttpLoading () {
    ++HttpCounter.count
    if (window.AppVue) window.AppVue.footerLoading = true
  }
  hideHttpLoading () {
    if (--HttpCounter.count <= 0 && window.AppVue) window.AppVue.footerLoading = false
  }
}

export default new Loading()