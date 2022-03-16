<!-- eslint-disable -->
<template>
  <HeaderVue />
  <router-view class="container"/>
  <FooterVue class="mt-5"/>
</template>
<script>/* eslint-disable */ 
import HeaderVue from "./components/Header.vue";
import FooterVue from "./components/Footer.vue";
export default {
  nom: "AppVue",
  components:{
    HeaderVue: HeaderVue,
    FooterVue: FooterVue
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
