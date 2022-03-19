<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div class="text-center">
      <SpinnerVue/>
    </div>
    <div>
      <div class="rounded-top topObject">
        <h3 class="text objectName"><strong>{{object.name}}</strong></h3>
      </div>
      <div class="bottomObject rounded-bottom">
        <h4 class="text-light mb-4 description"><strong>Description:</strong> {{object.description}}</h4>
        <div v-if="object.mostRecentBidder">
          <h4 class="text-light mb-4"><strong>Mise actuelle:</strong> {{this.Currency(object.currentBid)}}</h4>
        </div>
        <div v-else>
          <h4 class="text-light mb-4"><strong>Prix de départ:</strong> {{this.Currency(object.currentBid)}}</h4>
        </div>
        <div class="text-center">
                <img class="mb-4 text-white w-50" v-bind:src="objectImage" alt="Image de l'item"></div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ObjectService from "@/ObjectService";
import SpinnerVue from "@/components/Spinner.vue";
import $ from "jquery"

export default {
  name: "VueObject",
  components:{
    SpinnerVue:SpinnerVue
  },
  data() {
    return {
      object: {},
      objectImage: "",
      error: ""
    };
  },
  async created() {
    try {
      this.object = await ObjectService.getObject(this.$route.params.objectId);
      this.objectImage = `img/${this.object.image}`
    } catch (err) {
      this.error = err.message;
    }
    $("#spinner").remove();
  },
  methods: {
    Currency(currentBid) {
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
      }).format(currentBid)
    },
  }
};
</script>
<style scoped lang="scss">
.description{
  word-wrap: break-word;
}
</style>
