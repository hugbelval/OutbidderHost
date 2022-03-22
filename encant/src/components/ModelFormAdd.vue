<!-- eslint-disable -->
<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div
                class="modal-content w-50"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
            >
                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        <form @submit="onSubmit" id="objectForm">
                            <div class="d-flex justify-content-between">
                                <label for="bid" class="mb-2">Nouvelle mise</label>
                                <h5>La mise actuelle est de : {{this.Currency(bidMin)}}</h5>
                            </div>
                            <input
                                type="number"
                                step="any"
                                class="form-control"
                                id="bid"
                                name="bid"
                                required
                            />
                            <div class="d-flex space-between justify-content-around">
                                <button type="submit" class="btn btn-primary p-2 w-25 mt-3">Miser</button>
                                <button
                                    type="button"
                                    class="btn btn-primary p-2 w-25 mt-3"
                                    @click="close"
                                    aria-label="Close modal"
                                >Annuler</button>
                            </div>
                        </form>
                    </slot>
                </section>
            </div>
        </div>
    </transition>
</template>
<script>/* eslint-disable */
import $ from "jquery"
import ObjectService from "@/ObjectService";
export default {
    name: "VueModelFormAdd",
    props: ["bidMin"],
    async created() {
    },
    methods: {
        close() {
            this.$emit('close');
        },
        async onSubmit(e) {
            e.preventDefault();
            $("#bidError").empty()
            const bid = $("#bid").val()
            if (bid <= this.bidMin) {
                $("#bid").after(`<p id="bidError" class="text-danger">La valeur doit être plus grande que celle présentement.</p>`)
            } else {
                this.$emit("newBid", await ObjectService.bid(bid, this.$route.params.objectId))
                this.$emit('close');
            }
        },
        Currency(currentBid) {
            return new Intl.NumberFormat('en-CA', {
                style: 'currency',
                currency: 'CAD'
            }).format(currentBid)
        }
    },
}
</script>
<style lang="scss">
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
