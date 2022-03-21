<!-- eslint-disable -->
<template>
    <div id="formPage">
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                />
            </symbol>
        </svg>
        <div id="confirmationContainer"></div>
        <h1 class="mb-4">{{ title }}</h1>
        <p class="text-danger">* obligatoire</p>
        <form @submit="onSubmit" id="objectForm">
            <div id="divName" class="d-flex row">
                <div class="form-group mb-4 w-70">
                    <label for="name" class="mb-2">
                        <span class="text-danger">
                            <strong>*</strong>
                        </span> Nom de l'item
                    </label>
                    <input type="text" class="form-control" id="name" placeholder="Ex: Auto" />
                </div>
                <div class="form-group mb-4 w-30">
                    <label for="endDate" class="mb-2">
                        <span class="text-danger">
                            <strong>*</strong>
                        </span> Date de fin
                    </label>
                    <input type="datetime-local" class="form-control" id="endDate" />
                </div>
            </div>
            <div class="form-group mb-4">
                <label for="description" class="mb-2">Description</label>
                <textarea
                    rows="4"
                    cols="50"
                    class="form-control"
                    style="max-height:300px"
                    id="description"
                    placeholder="Ex: Ce véhicule est..."
                />
            </div>
            <div class="d-flex row">
                <div class="form-group mb-4 w-75">
                    <label for="objectImage" class="mb-2">
                        <span class="text-danger">
                            <strong>*</strong>
                        </span> Image associée
                    </label>
                    <input
                        type="file"
                        class="form-control"
                        accept="image/x-png, image/jpeg"
                        id="objectImage"
                    />
                </div>
                <div class="form-group mb-4 w-25">
                    <label for="startBid" class="mb-2">
                        <span class="text-danger">
                            <strong>*</strong>
                        </span> Prix de départ ($)
                    </label>
                    <input type="number" min="1" step="any" class="form-control" id="startBid" />
                </div>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary p-2 w-50 mt-3 bigButton">Ajouter</button>
            </div>
        </form>
    </div>
</template>
<script>/* eslint-disable */
import ObjectService from "@/ObjectService";
import $ from "jquery";

export default {
    name: "FormObjectVue",
    props: ["title"],
    async created() {
        //Si c'est modification, aller chercher
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();
            $("#errors").remove()
            for (let i = 1; i < 5; i++) {
                $(`#error${i}`).remove()
            }
            const name = $("#name").val().trim();
            const endDate = $("#endDate").val();
            const description = $("#description").val().trim();
            const image = $("#objectImage")[0].files[0]
            const startBid = $("#startBid").val().trim();
            const errors = this.validate(name, endDate, description, image, startBid)
            if (Object.keys(errors).length != 0) {
                const div = $("<div id='errors' class='text-danger bg-black rounded p-3 mb-3'><h2>Champs erronés</h2></div>")
                const ul = $(`<ul></ul>`)
                let i = 0;
                for (const key of Object.keys(errors)) {
                    i++;
                    $(`#${key}`).after($(`<p id=error${i} class="text-danger"><strong>${errors[key]}</strong></p>`))
                    ul.append(`<li>${errors[key]}</li>`)
                }
                div.append(ul)
                $("#divName").prepend(div)
            } else {
                const object = {
                    name: name,
                    startDate: new Date(),
                    endDate: new Date(endDate),
                    description: description,
                    //Aller chercher l'identifiant de l'utilisateur
                    seller: "6224e7247a86f2cf9e351dc7",
                    startBid: startBid,
                }
                await ObjectService.postObject(object, image)
                    .then(res => {
                        if (res.status == 201) {
                            $("#name").val('');
                            $("#endDate").val('');
                            $("#description").val('');
                            $("#objectImage").val('');
                            $("#startBid").val('');
                            const confirm = $("#confirmationContainer");
                            if (confirm.is(':empty')) {
                                const confirmation = $(`<div class="alert alert-success d-flex align-items-center" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                                <div>Item ajouté avec succès !</div> </div>`)
                                confirm.append(confirmation)
                            }
                            setTimeout(function () {
                                confirm.empty()
                                confirm.css("display", "")
                            }, 2000)
                        } else {
                            const div = $("<div id='errors' class='text-danger bg-black rounded p-3 mb-3'><h2>Champs erronés</h2></div>")
                            const ul = $(`<ul></ul>`)
                            let i = 0;
                            for (const key of Object.keys(res.data.errors)) {
                                i++;
                                if (res.data.errors[key].msg != "Invalid value") {
                                    $(`#${key}`).after($(`<p id=error${i} class="text-danger"><strong>${res.data.errors[key].msg}</strong></p>`))
                                    ul.append(`<li>${res.data.errors[key].msg}</li>`)
                                }
                            }
                            div.append(ul)
                            $("#divName").prepend(div)
                        }
                    })
            }
        },
        validate(name, endDate, description, image, startBid) {
            const errors = {}
            const regexAlphaNum = /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ.,'!&]*$/
            if (name == "") {
                errors["name"] = "Le nom ne peut pas être vide."
            } else if (!regexAlphaNum.test(name)) {
                errors["name"] = "Le nom doit être alphanumérique."
            }

            if (description.length > 2000) {
                errors["description"] = "La description ne peut être plus de 2000 caractères."
            } else if (!regexAlphaNum.test(description)) {
                errors["description"] = "La description doit être alphanumérique."
            }

            if (endDate == "") {
                errors["endDate"] = "Une date doit être sélectionnée."
            } else if (new Date(endDate) <= new Date()) {
                errors["endDate"] = "La date sélectionnée doit être plus grande que celle d'aujourd'hui."
            }
            if (!image) {
                errors["objectImage"] = "Une image doit être ajoutée à votre item en vente."
            }

            if (startBid == "") {
                errors["startBid"] = "Il faut mettre un montant de base à l'item."
            }

            return errors;
        }
    }
}
</script>
<style lang="scss">
.w-30 {
    width: 30%;
}
.w-70 {
    width: 70%;
}
h1 {
    font-family: "Kanit", sans-serif;
    font-size: 2.2rem;
}
.bigButton {
    font-size: 1.2rem;
}
</style>