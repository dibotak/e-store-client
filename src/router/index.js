import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/DetailProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name !== 'Home') {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
    children: [
      {
        path: 'add',
        name: 'Add to Cart',
        component: () => import('../components/Add.vue'),
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('access_token')) {
            next();
          } else {
            next({ name: 'Login' });
          }
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
