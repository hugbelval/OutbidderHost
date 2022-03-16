/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000'
const url = 'users/';

class UserService {
    // Get Users
    static getUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                console.log("Trouver utilisateurs...2 "+ res.data)
                const data = res.data;
                resolve(data);
            } catch(err){
                console.log("Erreur promesse")
                reject(err);
            }
        });
    }

    // Create User
    static signin(user) {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(`${url}signup`, user);
                this.login(user);
            } catch(err){
                console.log("Erreur creation");
                reject(err);
            }
        });
    }

    static login(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = axios.post(`${url}login`, user);
                const token = res.token;
                resolve(token);
            } catch(err){
                console.log("Erreur connexion");
                reject(err);
            }
        });
    }

    // Delete user
    static deleteUser(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default UserService;