import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Register from '@/components/Register';
import Home from '@/components/Home';
import Profile from '@/components/Profile';
import Search from '@/components/Search';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      meta: { hasProfileHeader: false },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) next('/home');
        else next();
      }
    },
    {
      path: '/register',
      name: 'Register',
      meta: { hasProfileHeader: false },
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { hasProfileHeader: true },
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) next();
        else next('/');
      }
    },
    {
      path: '/search',
      name: 'search',
      meta: { hasProfileHeader: true },
      component: Search
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: { hasProfileHeader: true },
      component: Profile
    }
  ]
})
