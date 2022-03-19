/* eslint-disable */ 
import { createRouter, createWebHistory } from 'vue-router';
import BidsView from '../views/Bids.vue';
import VueSignup from '../views/SignUp.vue';
import VueLogin from "../views/Login.vue";
import BidVue from '@/views/Bid.vue';
import BidCreate from '@/views/CreateBid.vue'

const routes = [
  {
    path: '/',
    name: "Bids",
    component: BidsView
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
    path: '/create',
    name: "CreateObject",
    component: VueCreateObject
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
