<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <UserComponent/>
  <PostComponent msg="Welcome to Your Vue.js App"/>
</template>

<script>
import PostComponent from './components/PostComponent.vue'
import UserComponent from './components/UserComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent,
    UserComponent
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
