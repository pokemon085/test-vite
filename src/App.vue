<template>
<pageHeader/>
<router-view/>
<pageFooter/>

</template>

<script setup lang="ts">
import pageHeader from '@/components/pageHeader/index.vue'
import pageFooter from '@/components/pageFooter/index.vue'
</script>


<style lang="scss">
@import '@/styles/index.css';

</style>

