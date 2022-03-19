<!-- eslint-disable -->
<template>
    <div class="w-25 container">
        <div class="bg-warning p-5 rounded m-auto" id="box-form">
        <form>
            <h1 class="text-center">Inscription</h1>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput">Email:</label>
                <input v-model="email" type="email" class="form-control" id="email">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput2">Mot de passe:</label>
                <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput">Prénom:</label>
                <input v-model="firstname" type="text" class="form-control" id="firstname">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput">Nom:</label>
                <input v-model="lastname" type="text" class="form-control" id="lastname">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput">Téléphone:</label>
                <input v-model="phone" type="text" class="form-control" id="phone" placeholder="Ex: xxx-xxx-xxxx">
            </div>

            <div class="row mt-5 text-center">
                <div class="col-6">
                    <router-link class="btn btn-primary" to="/login">Connexion</router-link>
                </div>
                <div class="col-6">
                    <a v-on:click="signup" class="btn btn-primary">S'inscrire</a>
                </div>
            </div>
        </form>
        </div>
    </div>
</template>
<script>/* eslint-disable */ 
import UserService from "../UserService";
import router from '../router';
export default {
    name: "VueSignup",
    data(){
        return {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            phone: '',
        }
    },
    watch: {
        name: function(){
            this.onChange();
        }
    },
    methods : {
        // Ajax
        onChange(){
            console.log("allo");
            //Validation avec la bd pour le nom
        },

        async signup(){
            console.log("logged");
            UserService.signup(
            {
                email: this.email,
                password: this.password,
                firstname: this.firstname,
                lastname: this.lastname,
                phone: this.phone
            })
            .then(res => {
                console.log(res);
                if(true){
                    router.push("/");
                }
            })
            .catch(err => {
                console.log("Erreur creation");
                console.log(err);
            });
            //Verify token
        },
    },
}
</script>
<style lang="scss">
#box-form{
    box-shadow: 0 0 15px black;
}
</style>
