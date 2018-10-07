import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import BookList from '@/components/BookList'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/AllBooks',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
