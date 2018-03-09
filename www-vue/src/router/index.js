import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Sessions from '@/components/Sessions'
import Resources from '@/components/Resources'
import ResourcesItem from '@/components/Resources/Item'
import ResourcesForm from '@/components/Resources/Form'

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
      component: Sessions
    }, {
      path: '/resources',
      name: 'resources',
      component: Resources
    }, {
      path: '/resources/:item',
      name: 'resources_item',
      component: ResourcesItem
    }, {
      path: '/resources/:item/form',
      name: 'resources_form_new',
      component: ResourcesForm
    }, {
      path: '/resources/:item/form/:id',
      name: 'resources_form_edit',
      component: ResourcesForm
    }
  ]
})
