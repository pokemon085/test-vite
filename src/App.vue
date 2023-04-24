<template>
  <div class="container" id="container">
    <div class="header"> 
      <pageHeader />
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer">
      <pageFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import pageHeader from '@/components/pageHeader/index.vue'
import pageFooter from '@/components/pageFooter/index.vue'
import { goodsStore } from "@/store/goods"
import { userStore } from "@/store/user"
import { onMounted,ref } from 'vue'
const storeGoods = goodsStore()
const getUserList=userStore()
const updateUser=ref(false)
onMounted(() => {
  storeGoods.getAllGoods()
  getUserList.saveUserList()
  getUserList.saveLoginUser()
})




</script>


<style lang="scss">
@import '@/styles/index.css';

.container{
  display: grid;
  height: 100vh;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
  "header"
  "main"
  "footer";
  
  .main{
    grid-area: main;
  }
  .header{
    grid-area:header;
  }
  .footer{
    grid-area:footer;
  }
}
</style>

