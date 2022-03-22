<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div>
      <!-- Validation si buyer ou seller -->
      <div v-if="true">
        <ObjectBuyerVue/>
      </div>
      <div v-else>
        <ObjectSellerVue/>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ObjectBuyerVue from "@/components/ObjectBuyer.vue";
import ObjectSellerVue from "@/components/ObjectSeller.vue";

export default {
  name: "VueObject",
  components:{
    ObjectSellerVue,
    ObjectBuyerVue
  },
};
</script>
