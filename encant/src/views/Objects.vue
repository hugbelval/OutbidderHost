<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div class="text-center" id="spinner">
      <SpinnerVue />
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </symbol>
    </svg>

    <div id="confirmationContainer" class="mb-5"></div>
    <div>
      <div class="mb-4 d-flex justify-content-between">
        <router-link class="btn-primary btn" to="/create">Ajouter un item</router-link>
        <button class="btn reload" v-on:click="Reload">
          <strong>
            Recharger les items
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path
                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
              />
            </svg>
          </strong>
        </button>
      </div>
      <div class="row" id="objectsList"></div>
    </div>
  </div>
</template>
<script>/* eslint-disable */
import ObjectService from "@/ObjectService";
import SpinnerVue from "@/components/Spinner.vue";
import $ from "jquery";

export default {
  name: "VueObjects",
  components: {
    SpinnerVue: SpinnerVue,
  },
  async created() {
    this.LoadData(await ObjectService.getObjects());
    $("#spinner").remove();
  },
  methods: {
    Currency(currentBid) {
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
      }).format(currentBid)
    },
    SetTime(endDate) {
      const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
      const moment = endDate.split("T");
      const date = moment[0].split("-");
      return `${monthNames[parseInt(date[1])]} ${date[2]} ${date[0]} à ${moment[1].split(".")[0]}`
    },
    async Reload() {
      if ($("#confirmationContainer").is(':empty')) {
        $("#confirmationContainer").empty()
        const confirmation = $(`<div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>Page rechargée avec succès</div> </div>`)
        $("#confirmationContainer").append(confirmation)
        this.LoadData(await ObjectService.getObjects())
        setTimeout(function () {
          $("#confirmationContainer").empty()
          $("#confirmationContainer").css("display", "")
        }, 2000)
      } else {
        this.LoadData(await ObjectService.getObjects());
      }
    },
    async LoadData(data) {
      const objectsList = $("#objectsList");
      objectsList.empty();
      data.forEach(objectData => {
        const object = $(`<div class="col-4 mb-2"></div>`)

        const topObject = $(`<div class="rounded-top topObject"></div>`)
        topObject.append(`<h3 class="text objectName"><strong>${objectData.name}</strong></h3>`)
        object.append(topObject);

        const bottomObject = $(`<div class="bottomObject rounded-bottom"></div>`)
        bottomObject.append(`<p class="text-light mb-4"><strong>Mise actuelle :</strong> ${this.Currency(objectData.currentBid)}</p>`)
        bottomObject.append(`<p class="text-light mb-4"><strong>Date de fin : </strong>${this.SetTime(objectData.endDate)}</p>`)
        bottomObject.append(`<div class="text-center">
                <img class="mb-4" src="img/${objectData.image}" alt="Image de l'item"></div>`)
        bottomObject.append(`<a href="${objectData._id}" class="btn w-100 p-2 btnChange">Miser</a>`)
        object.append(bottomObject);

        objectsList.append(object);
      });
    }
  }
};
</script>
<style lang="scss">
.bottomObject {
  background-color: rgb(32, 29, 29);
  padding: 25px;
  box-shadow: 10px 5px 5px rgb(114, 20, 20);
}

.topObject {
  padding: 25px;
  box-shadow: 10px 7px 5px rgb(114, 20, 20);
  background-color: rgb(50, 190, 22);
  word-wrap: break-word;
}

.objectName {
  font-family: "Kanit", sans-serif;
  font-size: 2.2rem;
}
.btnChange {
  background-color: rgb(114, 20, 20);
  font-size: 1.2rem;
  color: rgb(226, 222, 222);
}
.btnChange:hover {
  background-color: rgb(50, 190, 22);
  transition: 0.3s;
  color: rgb(37, 37, 37);
}

.reload {
  background-color: rgb(37, 37, 37);
  color: rgb(50, 190, 22);
  padding: 10px;
}

.reload:hover {
  background-color: rgb(50, 190, 22);
  color: rgb(37, 37, 37);
}
</style>