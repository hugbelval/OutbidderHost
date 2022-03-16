<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div class="text-center" v-show="!isShow">
      <SpinnerVue/>
    </div>
    <div v-show="isShow">
      <div class="rounded-top nameBid">
        <h2>{{ bid.name }}</h2>
      </div>
      <div class="bidColor rounded-bottom p-5">
        <h3>The starting bid : {{ bid.startBid }}</h3>
        <h3 class="mt-5">Description : {{ bid.desc }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import PostService from "@/PostService";
import SpinnerVue from "@/components/Spinner.vue";

export default {
  name: "BidVue",
  components:{
    SpinnerVue:SpinnerVue
  },
  data() {
    return {
      bid: {},
      error: "",
      isShow: false
    };
  },
  async created() {
    try {
      this.bid = await PostService.getBid(this.$route.params.id);
    } catch (err) {
      this.error = err.message;
    }
    this.isShow = true;
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
