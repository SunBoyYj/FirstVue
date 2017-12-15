import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/page/index'
import '../assets/style/reset.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
