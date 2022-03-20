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
                <input v-model="phone" type="text" class="form-control" id="phone" placeholder="Seulement les chiffres Ex: 1112223333">
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
import $ from "jquery"

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
            
            for (let i = 1; i < 6; i++) {
                $(`#error${i}`).remove()
            }
            const email = $("#email").val().trim();
            const password = $("#password").val().trim();
            const firstname = $("#firstname").val().trim();
            const lastname = $("#lastname").val().trim();
            const phone = $("#phone").val().trim();
            const errors = this.validate(email, password, firstname, lastname, phone)

            if (Object.keys(errors).length != 0) {
                let i = 0;
                for (const key of Object.keys(errors)) {
                    i++;
                    console.log("error in :" + key);
                    $(`#${key}`).after($(`<p id=error${i} class="text-danger"><strong>${errors[key]}</strong></p>`))
                }
            } else{
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
                    console.log("then")
                    if(res.status == 200){
                        console.log("code 200")
                        console.log(localStorage.getItem("user-token"))
                        router.push("/");
                    }
                    //Messages erreur
                    else{
                        console.log("error" + res.status)
                        this.email = res.data.userdata.email;
                        this.firstname = res.data.userdata.firstname;
                        this.lastname = res.data.userdata.lastname;
                        this.phone = res.data.userdata.phone;
                        let i = 0;
                        console.log("errors %j", res.data.errors)
                        for (const key of Object.keys(res.data.errors)) {
                            i++;
                            console.log("error in :" + key);
                            $(`#${key}`).after($(`<p id=error${i} class="text-danger"><strong>${res.data.errors[key].msg}</strong></p>`))
                         }
                    }
                })
                .catch(err => {
                    console.log("Erreur creation Frontend");
                    console.log(err);
                });
                //Verify token
            }
        },
        validate(email, password, firstname, lastname, phone) {
            const errors = {}
            const regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
            if(email == ""){
                errors["email"] = "L'email ne peut pas être vide"
            }
            else if (!regexEmail.test(email)) {
                errors["email"] = "L'email est invalide"
            }
            const regexPwd = /^[a-zA-Z0-9]*$/
            if(password.length < 8 || password.length > 40){
                errors["password"] = "Le mot de passe doit contenir entre 8 et 40 caractères"
            } else if(!regexPwd.test(password)){
                errors["password"] = "Le mot de passe doit être alphanumérique"
            }

            const regexNom = /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ.,'!&]*$/
            if(firstname == ""){
                errors["firstname"] = "Le prénom ne peut pas être vide"
            } 
            else if(firstname.length < 1 || firstname.length > 40){
                errors["firstname"] = "Le prénom doit contenir entre 1 et 40 caractères"
            } else if(!regexNom.test(firstname)){
                errors["firstname"] = "Le prénom doit être alphanumérique"
            }

            if(lastname == ""){
                errors["lastname"] = "Le nom ne peut pas être vide"
            } 
            else if(lastname.length < 1 || lastname.length > 40){
                errors["lastname"] = "Le nom doit contenir entre 1 et 40 caractères"
            } else if(!regexNom.test(lastname)){
                errors["lastname"] = "Le nom doit être alphanumérique"
            }
            const regexPhone = /^[0-9]*$/
            if(phone.length != 10 || !regexPhone.test(phone)){
                errors["phone"] = "Le numéro de téléphone doit composer 10 chiffres. Ex: 1112223333"
            }
            return errors;
        }
    },
}
</script>
<style lang="scss">
#box-form{
    box-shadow: 0 0 15px black;
}
</style>
