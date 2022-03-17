<!-- eslint-disable -->
<template>
  <div id="spinner">
    <div class="lds-dual-ring"></div>
    <h2 class="mt-3">Loading...</h2>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "SpinnerVue",
};
</script>

<style lang="scss" scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid black;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>