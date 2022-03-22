/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000';
const url = 'users/';

function passJWT() {
  const token = localStorage.getItem("user-token");
  if (token) {
    return {
      headers: {
        "authorization": `Bearer ${token}`
      }
    }
  } else {
    return null;
  }
}

class UserService {
  // Get Users
  static getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        console.log("Trouver utilisateurs...2 " + res.data);
        const data = res.data;
        resolve(data);
      } catch (err) {
        console.log("Erreur promesse");
        reject(err);
      }
    });
  }

  static getUser(id) {
    return axios.get(`${url}${id}`, passJWT())
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log("Erreur get");
        console.log(err);
        return err.response;
      });
  }

  // Create User
  static signup(user) {
    return axios.post(`${url}signup`, user)
      .then(res => {
        return this.login(user);
      })
      .catch(err => {
        console.log("Erreur creation");
        console.log(err);
        return err.response;
      });
  }

  // static login(user) {
  //     return new Promise(async (resolve, reject) => {
  //         try {
  //             const res = axios.post(`${url}login`, user);
  //             const token = res.token;
  //             localStorage.setItem('user-token', token);
  //             resolve(token);
  //         } catch(err){
  //             console.log("Erreur connexion");
  //             localStorage.removeItem('user-token');
  //             reject(err);
  //         }
  //     });
  // }

  static login(user) {
    return axios.post(`${url}login`, user, {
        validateStatus: false
      })
      .then(res => {
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem('user-token', token);
          return res;
        }
        console.log("Code pas 200");
        localStorage.removeItem('user-token');
        return res;
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem('user-token');
        return err;
      })
  }


  // Delete user
  static deleteUser(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default UserService;
