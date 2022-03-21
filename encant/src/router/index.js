/* eslint-disable */ 
import { createRouter, createWebHistory } from 'vue-router';
import VueObjects from '../views/Objects.vue';
import VueSignup from '../views/SignUp.vue';
import VueLogin from "../views/Login.vue";
import VueObject from '@/views/Object.vue';
import VueAddObject from '@/views/FormAdd.vue';
import VueError from '@/views/Error.vue';


const routes = [
  {
    path: '/objects',
    name: "Objects",
    component: VueObjects
  },
  {
    path: '/error',
    name: "Error",
    component: VueError
  },
  {
    path: '/signup',
    name: 'Signup',
    component: VueSignup
  },
  {
    path: '/',
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
