<!-- eslint-disable -->
<template>
  <div class="mt-5">
    <div class="text-center" v-show="!isShow">
      <SpinnerVue />
    </div>
    <div>
      <div v-show="isShow" class="mb-4 d-flex justify-content-between">
        <router-link class="btn-primary btn" to="/create">Create a new bid</router-link>
        <button class="btn-primary btn" v-on:click="Reload">Reload the bids</button>
      </div>
      <div class="row">
        <!-- Ajouter les images -->
        <div
          class="col-4 mb-2"
          v-for="(post, index) in posts"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
        >
          <div class="bid rounded">
            {{
              `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/
        ${post.createdAt.getFullYear()}`
            }}
            <p class="text">{{ post.name }}</p>
            <router-link
              :to="{ name: 'Bid', params: { id: `${post._id}` } }"
              class="btn btn-primary w-25"
              >Bid</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// @ is an alias to /src
import PostService from "@/PostService";
import SpinnerVue from "@/components/Spinner.vue";

export default {
  name: "BidsVue",
  components: {
    SpinnerVue: SpinnerVue,
  },
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      isShow: false,
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
    this.isShow = true;
  },
  methods: {
    Reload(){
      window.location.reload()
    }
  }
};
</script>
<style scoped lang="scss">
.bid {
  background-color: grey;
  padding: 25px;
  box-shadow: 10px 5px 5px black;
}
</style>