/* eslint-disable */ 
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const axios = require('axios');

// À changer en production
axios.defaults.baseURL = 'http://localhost:5000';
const acceptedHTTPCodes = [];
acceptedHTTPCodes.push(200, 201, 400);
axios.interceptors.response.use(
  // successful callback, we don't need to do anything
  (response) => {
    if(acceptedHTTPCodes.includes(response.status)){
      console.log(response);
      console.log("passé par interceptor ok");
      return response;
    }else{
      router.push("/error"); //add info about error
      Promise.reject(response);
    }
      //Trouver pourquoi passe juste ici et non dans la 2e function
    
  }, 
  //check if we received a 400 and redirect
  (error) => {
    if (error.response.status === 400) {
      console.log("passé par interceptor error");
      return error;
    } else {
      router.push("/error"); //add info about error
    }
  }
);

const app = createApp(App)
app.use(store).use(router).mount('#app');
