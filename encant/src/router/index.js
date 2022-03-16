/* eslint-disable */ 
import { createRouter, createWebHistory } from 'vue-router';
import BidsView from '../views/Bids.vue';
import VueAuthentif from '../views/Authentification.vue'
import VueConnexion from "../views/Connexion.vue"
import BidVue from '@/views/Bid.vue';
import BidCreate from '@/views/CreateBid.vue'

const routes = [
  {
    path: '/authentification',
    name: 'Authentification',
    component: VueAuthentif
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
    path: '/',
    name: "Bids",
    component: BidsView
  },
  {
    path: '/connection',
    name: "Connection",
    component: VueConnexion
  },
  {
    path: '/:id',
    name: "Bid",
    component: BidVue
  },
  {
    path: '/create',
    name: "BidCreate",
    component: BidCreate
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
