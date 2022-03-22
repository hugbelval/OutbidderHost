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



    static login(user) {
        return axios.post(`${url}login`, user, { validateStatus: false })
                .then(res => {
                    if (res.status === 200){
                        const token = res.data.token;
                        localStorage.setItem('user-token', token);
                        return res;
                    }
                    localStorage.removeItem('user-token');
                    return res;
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('user-token');
                    return err;
                })
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
