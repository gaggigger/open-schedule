import Vue from 'vue'
import Router from 'vue-router'
import CoreRoutes from '../core/router/index'

Vue.use(Router)

const customRoutes = [
  // Add custom routes here
]

export default new Router({
  routes: CoreRoutes.concat(customRoutes)
})
