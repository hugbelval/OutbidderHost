<template>
  <div class="container">
    <h1>User component</h1>
    <label for="name">Nom:</label>
    <input v-model="name" type="text" id="name" name="name">
    <button v-on:click="createUser">Créer Utilisateur</button>
    <h2 v-bind:class="green">List of users:</h2>
    <ul>
      <li class="user" v-for="(user, index) in users" v-bind:item="user"
      v-bind:index="index" v-bind:key="user._id">
        <p class="text">{{ user.name }}</p>
        <button v-on:click="deleteUser(user._id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import UserService from "../UserService"

export default {
  name: 'UserComponent',
  data() {
    return {
      users: [],
      green: '',
      name: ''
    }
  },
  async created(){
    try {
      this.users = await UserService.getUsers();
    } catch(err){
      this.error = err.message;
    }
  },
  methods: {
    async createUser() {
      console.log("createUser")
      this.green = 'green'
      await UserService.insertUser(this.name);
      this.users = await UserService.getUsers();
    },
    async deleteUser(id) {
      await UserService.deleteUser(id);
      this.users = await UserService.getUsers();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.green{
  background-color:green;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

