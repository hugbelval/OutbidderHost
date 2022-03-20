<!-- eslint-disable -->
<template>
    <header>
        <div class="d-flex justify-content-around">
            <img src="@/assets/logo.png" id="logo" />
            <nav>
                <router-link to="/user">Information on user</router-link> |
                <router-link to="/">Items</router-link> |
                <router-link to="/ajouter">Ajouter un item</router-link>
            </nav>
        </div>
    </header>
</template>
<script>/* eslint-disable */
export default {
    name: "HeaderVue",
}
</script>
<style scoped>
#logo {
    width: 15%;
}

header {
    background-color: rgb(34, 30, 30);
}
</style>
