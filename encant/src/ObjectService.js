/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000'
const url = 'encant/';

class ObjectService {
    // Get Posts
    static getObjects() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data);
            } catch(err){
                reject(err);
            }
        });
    }

    static getObject(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${id}`);
                const data = res.data;
                resolve(data);
            } catch(err){
                reject(err);
            }
        });
    }

    // Ajouter une image
    static insertBidObject(name, endAt, startBid, desc) {
        return axios.post(url, {
            name,
            endAt,
            startBid,
            desc
        });
    }
}

export default ObjectService;