<!-- eslint-disable -->
<template>
    <div class="w-33 container py-5">
        <div class="bg-warning m-5 p-5 rounded m-auto" id="box-form">
        <form>
            <h1 class="text-center">Connexion</h1>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput">Email:</label>
                <input v-model="email" type="email" class="form-control" id="email">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput2">Mot de passe:</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="row mt-5 text-center">
                <div>
                    <a v-on:click="login" class="btn btn-primary d-block">Se connecter</a>
                </div>
            </div>
            <div class="h6 pt-3 text-center">
                     <p>Pas de compte? <router-link class="d-inline" to="/signup">Inscrivez-vous</router-link></p>
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
            
            for (let i = 1; i < 3; i++) {
                $(`#error${i}`).remove()
            }

            if(true) {
                UserService.login(
                {
                    email: this.email,
                    password: this.password,
                })
                .then(res => {
                    if(res.status == 200){
                        router.push("/objects");
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

.w-33{
    width: 33.33%;
}
</style>
