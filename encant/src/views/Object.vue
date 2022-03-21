<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div class="text-center" id="spinner">
      <SpinnerVue/>
    </div>
    <div>
      <!-- Validation si buyer ou seller -->
      <div v-if="true">
        <ObjectBuyerVue :object="object" :objectImage="objectImage"/>
      </div>
      <div v-else>
        <ObjectSellerVue :object="object" :objectImage="objectImage"/>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ObjectService from "@/ObjectService";
import SpinnerVue from "@/components/Spinner.vue";
import ObjectBuyerVue from "@/components/ObjectBuyer.vue";
import ObjectSellerVue from "@/components/ObjectSeller.vue";
import $ from "jquery"

export default {
  name: "VueObject",
  components:{
    SpinnerVue:SpinnerVue,
    ObjectSellerVue:ObjectSellerVue,
    ObjectBuyerVue:ObjectBuyerVue
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
  }
};
</script>
