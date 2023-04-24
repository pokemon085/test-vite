<template>
  <div class="container">
    <div class="good">
      <div class="item" v-for="i in addUserCount">
        name:{{ i.name }}
        money:{{ i.money }}
        stock:{{ i.stock }}
        <button @click="goProduct(i)">content</button>
        <button @click="addCartToStore(i)">addCart</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Cart, Goods } from '@/store/types'
import { computed , onMounted} from 'vue'
import { goodsStore } from "@/store/goods"
import { cartStore } from "@/store/cart"
import { readGoods } from "@/utils/localStorageUtils"
import { useRouter } from "vue-router";
const storeGoods = goodsStore()
const storeCart=cartStore()
storeGoods.goods = readGoods()
const router = useRouter();
const addUserCount = computed(() => storeGoods.goods.map((item) => { return { ...item, count: 0 } }))
onMounted(()=>{
  
})
const addCartToStore=(key:Cart)=>{
  storeCart.addCart(key)
}

const goProduct=(item:Goods)=>{
  router.push({
    path: '/product',
    query: {...item}
  })
}




</script>