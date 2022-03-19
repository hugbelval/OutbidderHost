/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000'
const url = 'encant/';
const FormData = require("form-data")


class ObjectService {
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

    static postObject(object, objectImage){
        var formData = new FormData()
        formData.append("objectImage", objectImage, image.originalname);
        formData.append("name", object.name);
        formData.append("startDate", object.startDate);
        formData.append("endDate", object.endDate);
        formData.append("description", object.description);
        formData.append("seller", object.seller);
        formData.append("currentBid", object.currentBid);
        return axios.post(`${url}ajouter`, formData)
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