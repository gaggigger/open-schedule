import Home from '../modules/Home/Index.vue'
import About from '../modules/About/Index.vue'
import Login from '../modules/Login/Login.vue'
import Logout from '../modules/Login/Logout.vue'
import Session from '../modules/Session/Index.vue'
import Resources from '../modules/Resource/Index.vue'
import ResourceManageList from '../modules/Resource/ManageList.vue'
import ResourceDetails from '../modules/Resource/Details.vue'
import ResourceForm from '../modules/Resource/Form.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: Home
  }, {
    path: '/about',
    name: 'about',
    component: About
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
  }, {
    path: '/resources',
    name: 'resources',
    component: Resources
  }, {
    path: '/resources/:item',
    name: 'resource_managelist',
    component: ResourceManageList
  }, {
    path: '/resources/:item/detail/:id?',
    name: 'resource_details',
    component: ResourceDetails
  }, {
    path: '/resources/:item/form/:id?',
    name: 'resource_index',
    component: ResourceForm
  }
]
