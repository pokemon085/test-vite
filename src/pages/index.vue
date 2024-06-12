<template>
<div class="home">
  <home-swiper/>
  <home-container/>
</div>
</template>
<script setup lang="ts">
import homeContainer from '@/components/homeContainer/index.vue'
import homeSwiper from '@/components/homeSwiper/index.vue'
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
}
</style>
