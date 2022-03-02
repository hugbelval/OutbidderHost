/* eslint-disable */
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000'
const url = 'encant/';

class PostService {
    // Get Posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch(err){
                reject(err);
            }
        });
    }

    static getBid(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${id}`);
                const data = res.data;
                resolve(data);
            } catch(err){
                console.log("Error promise chiée")
                reject(err);
            }
        });
    }
}

export default PostService;