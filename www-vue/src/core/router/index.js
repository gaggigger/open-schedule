import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'
import Sessions from '../components/Sessions.vue'
import Resources from '../components/Resources.vue'
import ResourcesManageItem from '../components/Resources/ManageItem.vue'
import ResourcesItemDetail from '../components/Resources/ItemDetail.vue'
import ResourcesForm from '../components/Resources/Form.vue'

export default [
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
    component: ResourcesManageItem
  }, {
    path: '/resources/:item/detail/:id?',
    name: 'resources_detail',
    component: ResourcesItemDetail
  }, {
    path: '/resources/:item/form/:id?',
    name: 'resources_form_edit',
    component: ResourcesForm
  }
]
