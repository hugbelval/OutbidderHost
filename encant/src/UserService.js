/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000';
const url = 'users/';

class UserService {
    // Get Users
    static getUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data);
            } catch(err){
                console.log("Erreur promesse");
                reject(err);
            }
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


    // Delete user
    static deleteUser(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default UserService;