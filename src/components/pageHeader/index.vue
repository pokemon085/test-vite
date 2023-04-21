<template>
  <div class="header">
    <div class="logo"></div>
    <div class="list">
      <router-link to="/">
        home
      </router-link>
      <router-link to="/catalog">
        catalog
      </router-link>
      <router-link to="/faqs">
        faqs
      </router-link>
      <router-link to="/contact">
        contact us
      </router-link>
    </div>
    <div class="function-icon">
      <div class="search"></div>
      <div class="cart" @click="$router.push('/cart')"></div>
      <div class="login" @click="$router.push('/login')"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
</script>
<style lang="scss">
.header {
  width: 100%;
  height: 50px;
  background: rgb(214, 185, 185);
  display: flex;
  justify-content: space-between;

  .logo {
    width: 100px;
    height: 40px;
    padding-top: 10px;
    // background: url("@/assets/header/logo.png") 50% 50% no-repeat;
    background-size: contain;
  }

  .list {
    display: flex;
    width: 300px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
  }

  .function-icon {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    height: 50px;

    .search {
      width: 20px;
      height: 20px;
      background: url("@/assets/header/search.png") 0 0 no-repeat;
      background-size: contain;
    }

    .login {
      width: 20px;
      height: 20px;
      background: url("@/assets/header/user.png") 0 0 no-repeat;
      background-size: contain;
    }

    .cart {
      width: 20px;
      height: 20px;
      background: url("@/assets/header/cart.png") 0 0 no-repeat;
      background-size: contain;
    }
  }
}
</style>
