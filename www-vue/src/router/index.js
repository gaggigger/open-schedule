import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Session from '@/components/Session'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/logout',
      name: 'logout',
      component: Logout
    }, {
      path: '/session',
      name: 'session',
      component: Session
    }
  ]
})
