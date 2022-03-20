<!-- eslint-disable -->
<template>
    <div class="rounded-top topObject">
        <h3 class="text objectName">
            <strong>{{ object.name }}</strong>
        </h3>
    </div>
    <div class="bottomObject rounded-bottom">
        <div v-if="object.mostRecentBidder" class="mb-5">
            <h4 class="text-light mb-4">
                <strong>Mise actuelle:</strong>
                {{ this.Currency(object.currentBid) }}
            </h4>
        </div>
        <div v-else class="mb-5">
            <h4 class="text-light mb-4">
                <strong>Prix de départ:</strong>
                {{ this.Currency(object.currentBid) }}
            </h4>
        </div>
        <h4 class="text-light mb-5 description">
            <strong>Description:</strong>
            {{ object.description }}
        </h4>
        <div class="text-center">
            <img
                class="mb-4 text-white w-50 imgBackground"
                v-bind:src="objectImage"
                alt="Image de l'item"
            />
        </div>
        <button></button>
    </div>
</template>
<script>/* eslint-disable */
export default {
    name: "VueObjectBuyer",
    props: ["object", "objectImage"],
    async created() {
        try {
            this.object = await ObjectService.getObject(this.$route.params.objectId);
            this.objectImage = `img/${this.object.image}`
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        Currency(currentBid) {
            return new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD'
            }).format(currentBid)
        },
    }
}
</script>
<style scoped lang="scss">
.description {
    word-wrap: break-word;
}
.imgBackground {
    box-shadow: 0px 0px 5px red;
}
</style>
