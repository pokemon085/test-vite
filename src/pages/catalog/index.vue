<template>
  <div class="container">
    <div class="good">
      <div class="item" v-for="i in storeGoods.goods">
        name:{{ i.name }}
        money:{{ i.money }}
        stock:{{ i.stock }}
        <button @click="goProduct(i)">content</button>
        <button @click="addCartToStore(i)">addCart</button>
      </div>
    </div>

   <pop-up v-if="showPopup" @close="showPopup=false"/>

  </div>
</template>
<script lang="ts" setup>
import { Cart, Goods } from '@/store/types'
import { onMounted, ref } from 'vue'
import { goodsStore } from "@/store/goods"
import { cartStore } from "@/store/cart"
import {userStore} from "@/store/user"
import { readGoods } from "@/utils/localStorageUtils"
import { useRouter } from "vue-router";
import popUp from "@/components/popUp/index.vue"
const storeGoods = goodsStore()
const storeCart = cartStore()
const getUserStore=userStore()
storeGoods.goods = readGoods()
const router = useRouter();
const showPopup=ref(false)
onMounted(() => {
  storeGoods.getAllGoods()
})
const addCartToStore = (key: Goods) => {

  if(Object.keys(getUserStore.isLogin).length===0){
    router.push("/login")
    return 
  }

  showPopup.value=true
  const cartItem: Cart = { ...key, count: 1 }
  storeCart.addCart(cartItem, 1)
}

const goProduct = (item: Goods) => {
  router.push({
    path: '/product',
    query: { id: item.id }
  })
}

</script>
<style lang="scss" scoped>

</style>