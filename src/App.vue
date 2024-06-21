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
import { onMounted } from 'vue'
const getUserList=userStore()
const getCartStore=cartStore()

onMounted(() => {
 getUserList.saveUserList()
 getUserList.saveLoginUser()
 getCartStore.reloadReadCart()
})
</script>


<style lang="scss" scoped>
.container{
  width: 100%;
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
    position: relative;
    top: 50px;
  }
  .header{
    grid-area:header;
    position: fixed;
    width: 100%;
    top:0;
    z-index: 99;
  }
  .footer{
    grid-area:footer;
  }
}
</style>

