/* eslint-disable */
import router from './router';

const axios = require('axios');

// À changer en production
axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.response.use(
  // successful callback, we don't need to do anything
  (response) => {
    return response
  }, 
  //check if we received a 400 and redirect
  (error) => {
    if (error.response.status === 400) {
      return error;
    } else {
      router.push({name: 'error' }); //add info about error
    }
  }
)

export default axios.default;