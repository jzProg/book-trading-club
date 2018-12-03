import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Register from '@/components/Register';
import Home from '@/components/Home';
import AllBooks from '@/components/AllBooks';
import Profile from '@/components/Profile';
import Messages from '@/components/Messages';
import Notifications from '@/components/Notifications';

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
      path: '/all',
      name: 'AllBooks',
      component: AllBooks
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications
    },
  ]
})
