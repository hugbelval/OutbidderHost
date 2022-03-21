/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000'
const url = 'encant/';
const FormData = require("form-data")

function passJWT() {
    const token = localStorage.getItem("user-token");
    if(token){
        return {headers: {"authorization" : `Bearer ${token}`}}
    }
    else{
        return null;
    }
}

class ObjectService {
    static getObjects() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url, passJWT());
                const data = res.data;
                resolve(data);
            } catch(err){
                reject(err);
            }
        });
    }

    static postObject(object, objectImage){
        var formData = new FormData()
        if (typeof objectImage != "undefined"){
            formData.append("objectImage", objectImage, objectImage.originalname);
        } else {
            formData.append("objectImage", "unexistant")
        }
        formData.append("name", object.name);
        formData.append("endDate", object.endDate);
        formData.append("description", object.description);
        formData.append("startBid", object.startBid);
        return axios.post(`${url}ajouter`, formData, passJWT())
        .catch(err => {
            console.log(err)
            return err.response;
        })
    }

    static getObject(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${id}`, passJWT());
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
        }, passJWT());
    }
}

export default ObjectService;