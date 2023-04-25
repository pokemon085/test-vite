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
import { userStore } from "@/store/user"
import {cartStore} from "@/store/cart"
import { onMounted,ref } from 'vue'
const getUserList=userStore()
const getCartStore=cartStore()

onMounted(() => {
  getUserList.saveUserList()
  getUserList.saveLoginUser()
  getCartStore.reloadReadCart()
})




</script>


<style lang="scss">
@import '@/styles/index.scss';

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

