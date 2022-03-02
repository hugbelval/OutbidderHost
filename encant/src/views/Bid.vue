<!-- eslint-disable -->
<template>
    <div>
        {{bid._id}}
        {{bid.text}}
    </div>
</template>
<script>/* eslint-disable */ 
import PostService from "@/PostService";

export default {
    name: "BidVue",
    data() {
    return {
      bid: {},
      error: '',
    }
    },
    async created(){
    try {
      this.bid = await PostService.getBid(this.$route.params.id);
    } catch(err){
      this.error = err.message;
    }
  }
}
</script>
