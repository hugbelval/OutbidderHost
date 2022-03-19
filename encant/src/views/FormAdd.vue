<!-- eslint-disable -->
<template>
  <FormObjectVue :title="title" class="w-50 background p-5 rounded mt-5"/>
</template>

<script>/* eslint-disable */
import FormObjectVue from "@/components/FormObject.vue"
export default {
    name: "AddObjectVue",
    components:{
      FormObjectVue:FormObjectVue
    },
    async created() {
        //Si c'est modification, aller chercher
    },
    data(){
      if(this.$route.params.objectId){
        return {

        }
      } else {
        return {
          title: "Ajout d'un item"
        }
      }
      
    }
}
</script>
<style lang="scss">
.background{
  background-color:#cfc31c;
}
</style>