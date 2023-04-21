<template>
  <div class="container">
    <div class="good">
      <div class="item" v-for="i in addUserCount">
     
        name:{{ i.name }}
        money:{{ i.money }}
        stock:{{ i.stock }}
        <button @click="addCartToStore(i)">addCart</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Goods,Cart } from '@/store/types'
import { defineComponent, onMounted, ref, computed } from 'vue'
import { goodsStore } from "@/store/goods"
import { cartStore } from "@/store/cart"
import { readGoods } from "@/utils/localStorageUtils"

const storeGoods = goodsStore()
const storeCart=cartStore()
storeGoods.goods = readGoods()

const addUserCount = computed(() => storeGoods.goods.map((item) => { return { ...item, count: 0 } }))

const addCartToStore=(key:Cart)=>{
  storeCart.addCart(key)
}






</script>