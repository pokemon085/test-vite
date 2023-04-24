<template>
  <div class="header">
    <div class="logo"></div>
    <div class="list">
      <router-link to="/"> home </router-link>
      <router-link to="/catalog"> catalog 
      </router-link>
      <router-link to="/faqs"> faqs </router-link>
      <router-link to="/contact"> contact us </router-link>
    </div>
    <div class="function-icon">
      <div class="search"></div>
      <div class="cart" @click="$router.push('/cart')"></div>
      <div class="login-wrap">
        <div class="login" v-if="Object.keys(getUserStore.isLogin).length === 0" @click="$router.push('/login')"></div>
        <div class="member-image" v-else @click="loginHandler">{{ getUserStore.userFrontName }}
          <tool-tip v-if="showAccountDetail">
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
</template>
<script lang="ts" setup>
import { userStore } from "@/store/user";
import { useRouter } from "vue-router";

import { ref, onMounted } from 'vue'
import toolTip from "@/components/toolTip/index.vue";
defineProps({
  updateUser: {
    type: Boolean,
    default: false,
  },
});


const router = useRouter();
const getUserStore = userStore();
const showAccountDetail = ref(false)
onMounted(() => {

})
const loginHandler = () => {
  showAccountDetail.value = !showAccountDetail.value
};

const signOutHandler = () => {
  getUserStore.signOut()
  setTimeout(() => {
    alert('請重新登入')
    router.push('/')
  }, 300);
}
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

      }
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
