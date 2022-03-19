<!-- eslint-disable -->
<template>
    <div class="w-25 container">
        <div class="bg-warning p-5 rounded m-auto" id="box-form">
        <form>
            <h1 class="text-center">Connexion</h1>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput">Email:</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Example input">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput2">Mot de passe:</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Another input">
            </div>
            <div class="row mt-5 text-center">
                <div class="col-6">
                    <router-link class="btn btn-primary" to="/signup">Inscription</router-link>
                </div>
                <div class="col-6">
                    <a v-on:click="login" class="btn btn-primary">Se connecter</a>
                </div>
            </div>
        </form>
        </div>
    </div>
</template>
<script>/* eslint-disable */ 
import UserService from "../UserService"
import router from '../router'
import $ from "jquery"

export default {
    name: "VueLogin",
    data(){
        return {
            email:'',
            password: ''
        }
    },
    methods: {
    async login(){
            const email = $("#email").val().trim();
            const password = $("#password").val();
            
            if(true) {
                console.log("logged");
                UserService.login(
                {
                    email: this.email,
                    password: this.password,
                })
                .then(res => {
                    console.log("then")
                    console.log(res);
                    if(res.status == 200){
                        console.log("code 200")
                        console.log(localStorage.getItem("user-token"))
                        router.push("/");
                    }
                    //Messages erreur
                    else{
                        this.email = res.data.userdata.email;
                        $(`#password`).after($(`<p id=error1 class="text-danger"><strong>${res.data.message}</strong></p>`))
                    }
                })
                .catch(err => {
                    console.log("Erreur creation");
                    console.log(err);
                });
            }
        },
    },
}
</script>
<style lang="scss">
#box-form{
    box-shadow: 0 0 15px black;
}
</style>
