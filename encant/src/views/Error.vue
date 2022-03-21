<!-- eslint-disable -->
<template>
    <div class="w-33 container py-5">
        <p>Oups... Il y a eu une erreur...</p>
    </div>
</template>
<script>/* eslint-disable */ 

export default {
    name: "VueError",
    data(){
        return {
            email:'',
            password: ''
        }
    },
}
</script>
<style lang="scss">
#box-form{
    box-shadow: 0 0 15px black;
}

.w-33{
    width: 33.33%;
}
</style>
