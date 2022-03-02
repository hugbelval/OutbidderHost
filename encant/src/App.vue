<!-- eslint-disable -->
<template>
  <HeaderVue/>
  <nav>
    <!-- Faire un vue pour la connexion/authentificaiton pour les bid et pour l'utilisateur-->
    <router-link to="/user">Information on user</router-link> |
    <router-link to="/">Bids</router-link>
  </nav>
  <router-view class="container text-center"/>
  <FooterVue class="mt-5"/>
</template>
<script>/* eslint-disable */ 
import HeaderVue from "./views/Header.vue";
import FooterVue from "./views/Footer.vue";
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
