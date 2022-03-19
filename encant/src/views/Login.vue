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
            for (let i = 1; i < 3; i++) {
                $(`#error${i}`).remove()
            }
            const email = $("#email").val().trim();
            const password = $("#password").val();
            const errors = this.validate(email, password)

            if (Object.keys(errors).length != 0) {
                let i = 0;
                for (const key of Object.keys(errors)) {
                    i++;
                    console.log("error in :" + key);
                    $(`#${key}`).after($(`<p id=error${i} class="text-danger"><strong>${errors[key]}</strong></p>`))
                }
            } else {
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
                        
                    }
                })
                .catch(err => {
                    console.log("Erreur creation");
                    console.log(err);
                });
            }
        },
        validate(email, password) {
            const errors = {}
            const regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
            if(email == ""){
                errors["email"] = "L'email ne peut pas être vide"
            }
            if (!regexEmail.test(email)) {
                errors["email"] = "L'email est invalide"
            }
            const regexPwd = /^[a-zA-Z0-9_]*$/
            if(password.length < 8 || password.length > 40){
                errors["password"] = "Le mot de passe doit contenir entre 8 et 40 caractères"
            } else if(!regexPwd.test(password)){
                errors["password"] = "Le mot de passe doit être alphanumérique"
            }
            return errors;
        }
    },
    watch: {
        name: function(){
            /* Validation du nom */
            console.log("allo")
        }
    }
}
</script>
<style lang="scss">
#box-form{
    box-shadow: 0 0 15px black;
}
</style>
