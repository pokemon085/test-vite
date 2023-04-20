<template>
  <div>
    <button @click="$router.back()">back</button>
    <div class="cart-list">
      <div class="item" v-for="i in store.cart">
        name:{{ i.name }}
        money:{{ i.money }}
        stock:{{ i.stock }}
        <div class="option">
          <button @click="i.count <= 1 ? deleteGoodItem(i) : i.count--">-</button>
          <input type="text" v-model="i.count" />
          <button @click="i.count >= i.stock ? i.count = i.stock : i.count++">+</button>
        </div>
      </div>
    </div>
    <button @click="buy()">ok</button>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue'
import { cartStore } from "@/store/cart"
import { readCart } from "@/utils/localStorageUtils"
import { Cart } from '@/store/types';
import { goodsStore } from "@/store/goods"
const showDailog = ref(false)
const store = cartStore()
const getGoodsStore=goodsStore()
onMounted(() => {
  store.cart = readCart()
})

const deleteGoodItem = (i: Cart) => {
  showDailog.value = true
}

const buy=()=>{
  getGoodsStore.updateGoods().then(() => {
    store.clearCart()
  })
}

</script>
<style lang="scss"></style>
