<template>
  <button @click="router.back()">back</button>
  categroy:{{ categroy }}<br/>
  name:{{ name }}<br/>
  money:{{ money }}<br/>
  introduce:{{ introduce }}<br/>
  stock:{{ stock }}
</template>

<script lang="ts" setup>
import { useRoute,useRouter } from "vue-router";
const route = useRoute()
const router =useRouter()
const { id,
  categroy,
  name,
  money,
  introduce,
  stock } = route.query


</script>
<style lang="scss" scoped></style>