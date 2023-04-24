<template>
  <button @click="router.back()">back</button>
  categroy:{{ productDetail.categroy }}<br/>
  name:{{ productDetail.name }}<br/>
  money:{{ productDetail.money }}<br/>
  introduce:{{ productDetail.introduce }}<br/>
  stock:{{ productDetail.stock }}

</template>

<script lang="ts" setup>
import {computed} from 'vue'
import { useRoute,useRouter } from "vue-router";
const route = useRoute()
const router = useRouter()

const productDetail = computed(() => {
  return route.query
})


</script>
<style lang="scss" scoped></style>