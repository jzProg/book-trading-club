import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Register from '@/components/Register';
import Home from '@/components/Home';
import Profile from '@/components/Profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) next('/home');
        else next();
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) next();
        else next('/');
      }
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
