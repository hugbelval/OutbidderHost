<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <div class="row">
      <div class="post col-4" v-for="(post, index) in posts" v-bind:item="post"
      v-bind:index="index" v-bind:key="post._id">
        {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/
        ${post.createdAt.getFullYear()}`}}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
</template>

<script>
/* eslint-disable */ 
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import PostService from '@/PostService';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
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