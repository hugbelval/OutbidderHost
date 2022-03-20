/* eslint-disable */ 
import { createRouter, createWebHistory } from 'vue-router';
import VueObjects from '../views/Objects.vue';
import VueSignup from '../views/SignUp.vue';
import VueLogin from "../views/Login.vue";
import VueObject from '@/views/Object.vue';
import VueAddObject from '@/views/FormAdd.vue'

const routes = [
  {
    path: '/',
    name: "Objects",
    component: VueObjects
  },
  {
    path: '/signup',
    name: 'Signup',
    component: VueSignup
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
  },
  {
    path: '/login',
    name: "Login",
    component: VueLogin
  },
  {
    path: '/:objectId',
    name: "Object",
    component: VueObject
  },
  {
    path: '/ajouter',
    name: "FormAdd",
    component: VueAddObject
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
