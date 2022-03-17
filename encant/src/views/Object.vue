<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div class="text-center">
      <SpinnerVue/>
    </div>
    <div>
      <div class="rounded-top nameBid">
        <h2>{{ object.name }}</h2>
      </div>
      <div class="bidColor rounded-bottom p-5">
        <h3 class="mt-5">Description : {{ object.description }}</h3>
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
      error: ""
    };
  },
  async created() {
    try {
      this.object = await ObjectService.getObject(this.$route.params.objectId);
    } catch (err) {
      this.error = err.message;
    }
    $("#spinner").remove();
  }
};
</script>
<style scoped lang="scss">
.nameBid {
  padding: 25px 0 25px 35px;
  background-color: rgb(202, 196, 196);
  color: black;
}
.bidColor{
  background-color: rgb(231, 182, 182);
}

</style>
