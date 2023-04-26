<template>
  <button @click="router.back()">back</button>
  category:{{ productDetail.category }}<br />
  name:{{ productDetail.name }}<br />
  money:{{ productDetail.money }}<br />
  introduce:{{ productDetail.introduce }}<br />
  stock:{{ productDetail.stock }}
  <hr />
  <div class="option">
    <button @click="countHandler('substract')">-</button>
    <input type="text" v-model="count" />
    <button @click="countHandler('add')">+</button>
  </div>
  <button @click="checkout()">checkout</button>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { cartStore } from "@/store/cart"
import { Cart } from '@/store/types';
import { goodsStore } from "@/store/goods"
import {userStore} from "@/store/user"
const route = useRoute()
const router = useRouter()
const storeCart = cartStore()
const getGoodsStore = goodsStore()
const getUserStore=userStore()
const productId: any = computed(() => route.query.id)
const productDetail: any = computed(() => {
  return getGoodsStore.goods.find(item => +item.id === +productId.value)
})
const stock = ref(+productDetail.stock)
const count = ref(0)
const countHandler = (key: string) => {
  if (key === 'add') {
    count.value = count.value >= stock.value ? stock.value : count.value + 1
  } else {
    count.value =count.value===0 ? 0 : count.value - 1
  }
}

const checkout = () => {
  if(Object.keys(getUserStore.isLogin).length===0){
    router.push("/login")
    return 
  }

  const cartItem: Cart = { ...productDetail.value, count: 0 }
  storeCart.addCart(cartItem, count.value)
  setTimeout(() => {
    router.push("/cart");
  }, 300);
}

</script>
<style lang="scss" scoped></style>