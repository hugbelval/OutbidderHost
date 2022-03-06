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
                console.log("Error promise chiée")
                reject(err);
            }
        });
    }

    // Create User
    static insertUser(user) {
        return axios.post(url, user);
    }

    // Delete user
    static deleteUser(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default UserService;