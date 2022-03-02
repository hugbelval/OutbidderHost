<template>
  <div>
    <div class="row">
      <div class="col-4 mb-2" v-for="(post, index) in posts" v-bind:item="post"
      v-bind:index="index" v-bind:key="post._id">
      <div class="bid">
        {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/
        ${post.createdAt.getFullYear()}`}}
        <p class="text">{{ post.text }}</p>
        <router-link :to="{ name: 'Bid', params: { id: `${post._id}` }}"
        class="btn btn-primary w-25">Bid</router-link>
      </div>
      </div>
    </div>
  </div>
</template>

<script>/* eslint-disable */ 
// @ is an alias to /src
import PostService from '@/PostService';

export default {
  name: 'BidsVue',
  components: {
  },
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  async created(){
    try {
      this.posts = await PostService.getPosts();
    } catch(err){
      this.error = err.message;
    }
  }
};
</script>
<style scoped>
.bid{
  background-color: grey;
  padding: 25px;
}
</style>