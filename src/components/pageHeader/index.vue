<template>
  <div class="header">
    <div class="logo"></div>
    <div class="list">
      <router-link to="/"> home </router-link>
      <router-link to="/catalog"> catalog </router-link>
      <router-link to="/faqs"> faqs </router-link>
      <router-link to="/contact"> contact us </router-link>
    </div>
    <div class="function-icon">
      <div class="search" @click="openSearch"></div>
      <div class="cart" @click="$router.push('/cart')">
      <div v-if="getCartStore.cartTotal>0" class="red-pot">{{ getCartStore.cartTotal }}</div>
      </div>
      <div class="login-wrap">
        <div
          class="login"
          v-if="Object.keys(getUserStore.isLogin).length === 0"
          @click="$router.push('/login')"
        ></div>
        <div class="member-image" v-else @click="loginHandler">
          {{ getUserStore.userFrontName }}
          <tool-tip>
            <template #user>
              <div>{{ getUserStore.isLogin.email }}</div>
            </template>
            <template #item>
              <div class="list-item">history</div>
              <div class="list-item" @click="signOutHandler()">sign-out</div>
            </template>
          </tool-tip>
        </div>
      </div>
    </div>
  </div>
  <search v-if="showSearch" @close="closeHandler" />
</template>
<script lang="ts" setup>
import { userStore } from "@/store/user";
import { useRouter } from "vue-router";
import { ref } from "vue";
import toolTip from "@/components/toolTip/index.vue";
import search from "@/components/search/index.vue";
import {cartStore} from "@/store/cart"

const router = useRouter();
const getUserStore = userStore();
const getCartStore=cartStore();
const showAccountDetail = ref(false);
const showSearch = ref(false);
const loginHandler = () => {
  showAccountDetail.value = !showAccountDetail.value;
};

const signOutHandler = () => {
  getUserStore.signOut();
  setTimeout(() => {
    alert("請重新登入");
    router.push("/");
  }, 300);
};

const closeHandler = () => {
  document.documentElement.style.overflow = "auto";
  showSearch.value = false;
};

const openSearch = () => {
  document.documentElement.style.overflow = "hidden";
  showSearch.value = true;
};
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
    padding: 0 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 200px;
    height: 50px;

    .search {
      width: 20px;
      height: 20px;
      background: url("@/assets/header/search.png") 0 0 no-repeat;
      background-size: contain;
    }

    .login-wrap {
      width: 30px;
      height: 30px;
      position: relative;

      .login {
        background: url("/src/assets/header/user.png") 50% 50% no-repeat;
        background-size: contain;
        width: 20px;
        height: 30px;
      }

      .member-image {
        border-radius: 50%;
        background-color: #eee;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: var(--loading-color);
        font-weight: bold;
      }
    }

    .cart {
      width: 20px;
      height: 20px;
      background: url("@/assets/header/cart.png") 0 0 no-repeat;
      background-size: contain;
      position: relative;

      .red-pot{
        position:absolute;
        min-width: 20px;
        min-height: 20px;
        font-size: 12px;
        background-color:rgb(234, 108, 108);
        color:#fff;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        padding:1px;
        bottom:10px;
        left:10px;
      }
    }
  }
}
</style>
