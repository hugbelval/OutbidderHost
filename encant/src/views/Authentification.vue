<!-- eslint-disable -->
<template>
    <div class="w-25 container">
        <div class="bg-warning p-5 rounded m-auto" id="box-form">
        <form>
            <h1>Inscription</h1>
            <div class="form-group">
                <label for="formGroupExampleInput">Profile name</label>
                <input v-model="name" type="text" class="form-control" id="name" placeholder="Example input">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Example input">
            </div>
            <div class="form-group mt-4">
                <label for="formGroupExampleInput2">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Another input">
            </div>
            <button type="submit" class="btn btn-primary mt-3">Sign in</button>
        </form>
        </div>
    </div>
    <router-link to="/connection">Connect</router-link>
</template>
<script>/* eslint-disable */ 
export default {
    name: "VueAuthentif",
    data(){
        return {
            name:'',
            email: ''
        }
    },
    watch: {
        name: function(){
            this.onChange();
        }
    },
    methods : {
        // Ajax
        onChange(){
            console.log("allo")
            //Validation avec la bd pour le nom
        }
    },
}
</script>
<style lang="scss">
#box-form{
    box-shadow: 0 0 15px black;
}
</style>
