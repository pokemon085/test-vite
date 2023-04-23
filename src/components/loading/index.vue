<template>
  <div class="loading-wrap">
    <circle-loading />
  </div>
</template>

<script setup lang="ts">
import circleLoading from "./circleLoading.vue";
</script>

<style lang="scss">
.loading-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(164, 155 ,155 ,.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
