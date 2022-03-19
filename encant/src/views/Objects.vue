<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div class="text-center">
      <SpinnerVue />
    </div>
    <div>
      <div class="mb-4 d-flex justify-content-between">
        <router-link class="btn-primary btn" to="/create">Ajouter un item</router-link>
        <button class="btn-primary btn" v-on:click="Reload">Recharger les items</button>
      </div>
      <div class="row">
        <div
          class="col-4 mb-2"
          v-for="(object, index) in objects"
          v-bind:item="object"
          v-bind:index="index"
          v-bind:key="object._id"
        >
          <div class="rounded-top topObject">
            <h3 class="text objectName"><strong>{{ object.name }}</strong></h3>
          </div>
          <div class="bottomObject rounded-bottom">
            <p class="text-light mb-4"><strong>Mise actuelle :</strong> {{ Currency(object.currentBid) }}</p>
            <p class="text-light mb-4"><strong>Date de fin : </strong>{{SetTime(object.endDate)}}</p>
            <!-- Error 404 when not exist -->
            <div class="text-center">
                <img class="mb-4" :src="`img/${object.image}`" alt="Image de l'item">
            </div>
            <div class="text-center mt-3">
              <router-link
              :to="{ name: 'Object', params: { objectId: `${object._id}` } }"
              class="btn w-100 p-2 btnChange"
              >Miser</router-link
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>/* eslint-disable */
import ObjectService from "@/ObjectService";
import SpinnerVue from "@/components/Spinner.vue";
import $ from "jquery"

export default {
  name: "VueObjects",
  components: {
    SpinnerVue: SpinnerVue,
  },
  data() {
    return {
      objects: [],
      error: "",
    };
  },
  async created() {
    try {
      this.objects = await ObjectService.getObjects();
    } catch (err) {
      this.error = err.message;
    }
    $("#spinner").remove();
  },
  methods: {
    Reload(){
      window.location.reload()
    },
    Currency(currentBid){
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
      }).format(currentBid)
    },
    SetTime(endDate){
      const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
          "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      const moment = endDate.split("T");
      const date = moment[0].split("-")
      return `${monthNames[parseInt(date[1])]} ${date[2]} ${date[0]} à ${moment[1].split(".")[0]}`
    }
  }
};
</script>
<style scoped lang="scss">
.bottomObject {
  background-color: rgb(32, 29, 29);
  padding: 25px;
  box-shadow: 10px 5px 5px rgb(114, 20, 20);
}

.topObject{
  padding: 25px;
  box-shadow: 10px 7px 5px rgb(114, 20, 20);
  background-color: rgb(50, 190, 22);
  word-wrap: break-word;
}

.objectName{
  font-family: 'Kanit', sans-serif;
  font-size: 2.2rem;
}
.btnChange{
  background-color:rgb(114, 20, 20);
  font-size: 1.2rem;
  color: rgb(226, 222, 222);
}
.btnChange:hover{
    background-color:rgb(50, 190, 22);
    transition: 0.3s;
    color: rgb(37, 37, 37);
  }
</style>