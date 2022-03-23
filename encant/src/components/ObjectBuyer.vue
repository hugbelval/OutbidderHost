<!-- eslint-disable -->
<template>
<div class="text-center" id="spinner">
      <SpinnerVue/>
    </div>
    <div class="rounded-top topObject">
        <h3 id="name" class="text objectName">
        </h3>
    </div>
    
    <div class="bottomObject rounded-bottom">
        <div class="row">
            <div class="col-md-6 line">
                <h4 id="seller" class="text-light mb-5">
                    <strong>Vendeur: </strong>
                </h4>
                <ModelFormAddVue @newBid="GetNewBid" :bidMin="bidMin" class="m-auto" v-show="isModalVisible" @close="closeModal" />
                <h4 id="price" class="text-light mb-5">
                </h4>
                <h4 id="startDate" class="text-light mb-5">
                    <strong>Date de début: </strong>
                </h4>
                <h4 id="endDate" class="text-light mb-5">
                    <strong>Date de fin: </strong>
                </h4>
                <h4 id="countdown" class="text-danger mt-5 mb-5">
                    <strong>
                        Temps restant:
                        <span id="time"></span>
                    </strong>
                </h4>
                <h4 id="description" class="text-light mb-5 description">
                </h4>
                <div hidden id="bidAction" class="mt-4 text-center d-flex justify-content-around">
                    <button class="bid btn btn-primary" @click="showModal">Miser</button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="text-light mb-5 text-center">
                    <h4 id="image" class="mb-4">
                        <strong>Image de l'item</strong>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>
<script>/* eslint-disable */
import SpinnerVue from "./Spinner.vue";
import ObjectService from "@/ObjectService";
import UserService from "@/UserService";
import ModelFormAddVue from "./ModelFormAdd.vue";
const moment = require("moment-timezone")
import $ from "jquery"

export default {
    name: "VueObjectBuyer",
    props: ["object", "objectImage"],
    components: {
        startDate: "",
        ModelFormAddVue,
        SpinnerVue,
    },
    data() {
        return {
            isModalVisible: false,
            bidMin:""
        };
    },
    async created() {
        try {
            const data = await ObjectService.getObject(this.$route.params.objectId);
            
            const objectSpecific = data.object;
            this.LoadDate(objectSpecific.endDate, objectSpecific.startDate)
            this.bidMin = objectSpecific.currentBid;
            const seller = await UserService.getUser()

            if(seller.id === objectSpecific.seller){
                $("#bidAction").empty()
                $("#seller").append(`Vous êtes le propriétaire`)
                if(!objectSpecific.mostRecentBidder){
                    $("#bidAction").append(`<a href="modifier/${objectSpecific._id}" class="bid btn btn-primary btnSeller">Modifier</a>`)
                    $("#bidAction").append(`<a href="" class="bid btn btn-primary btnSeller">Supprimer</a>`)
                }
            } else {
                $("#seller").append(`${seller.firstname} ${seller.lastname}`)
                if(objectSpecific.mostRecentBidder === data.userId){
                $("#bidAction").append(`<h4 class="text-success">Vous avez la mise !</h4>`)
            }
            }

            $("#name").append(`<strong>${objectSpecific.name}</strong>`)
            $("#image").after(`<img
                        class="text-white w-100 imgBackground"
                        src="img/${objectSpecific.image}"
                        alt="Image de l'item"
                    />`)

            let descMessage;
            if(objectSpecific.description){
                descMessage = "Description: "
            } else {
                descMessage = "Aucune description"
            }
            $("#description").append(`<strong>${descMessage}</strong>${objectSpecific.description}`)

            let priceMessage;
            if(objectSpecific.mostRecentBidder){
                priceMessage = "Mise actuelle: "
            } else {
                priceMessage = "Prix de départ: "
            }
            $("#price").append(`<strong>${priceMessage}</strong>${this.Currency(objectSpecific.currentBid)}`)
            $("#bidAction").removeAttr("hidden");
        } catch (err) {
            this.error = err.message;
        }
        $("#spinner").remove();
    },
    methods: {
        GetNewBid(data){
            $("#price").empty()
            $("#price").append(`<strong>Mise actuelle:</strong> ${this.Currency(data.newBid)}`)
            $("#bidAction").empty()
            $("#bidAction").append(`<h4 class="text-success">Vous avez la mise !</h4>`)
        },
        Currency(currentBid) {
            return new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD'
            }).format(currentBid)
        },
        SetTime(dateMoment) {
            const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            const moment = dateMoment.split("T");
            const date = moment[0].split("-");
            return `${date[2]} ${monthNames[parseInt(date[1])]} ${date[0]} à ${moment[1].split("-")[0]}`
        },
        startCountDown(endDate) {
            setInterval(function () {
                $("#time").empty()
                let seconds = (new Date(endDate) - new Date()) / 1000;
                const days = parseInt(seconds / 86400);
                seconds = seconds % 86400
                const hours = parseInt(seconds / 3600)
                seconds = seconds % 3600
                const minutes = parseInt(seconds / 60);
                seconds = seconds % 60
                $("#time").append(`${days} jours, ${hours} heures, ${minutes} minutes, ${Math.round(seconds)} secondes`)
            }, 1000)
        },
        LoadDate(endDateUTC, startDateUTC) {
            const endDate = this.SetTime(moment(new Date(endDateUTC).toISOString()).tz('America/New_York').format());
            const startDate = this.SetTime(moment(new Date(startDateUTC).toISOString()).tz('America/New_York').format());
            $("#endDate").append(endDate)
            $("#startDate").append(startDate)

            this.startCountDown(endDateUTC);
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },

}
</script>
<style lang="scss">
.description {
    word-wrap: break-word;
}

.line {
    border-right: 6px solid rgb(50, 190, 22);
}

.btnSeller{
    padding: 25px;
}

.bid {
    padding: 10px 50px;
    font-size: 1.5rem;
}
</style>
