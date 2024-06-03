<template>
  <div class="cart-wrap">
    <div v-if="store.cart.length > 0">
      <button @click="$router.back()">back</button>
      <div class="cart-list" >
        <div class="item" v-for="i in store.cart">
          name:{{ i.name }}
          money:{{ i.money }}
          stock:{{ i.stock }}
          <div class="option">
            <button @click="countHandler('subtract', i)">-</button>
            <input type="text" v-model="i.count" />
            <button @click="countHandler('add', i)">+</button>
          </div>
        </div>
      </div>
      <button @click="buy()">ok</button>
    </div>
    <div v-else>
      <div class="empty">
        <div class="empty-cart"></div>
        <div class="title">Your Cart is Currently Empty!</div>
        <div class="go-shop" @click="router.push('/catalog')">Shop Now</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { cartStore } from "@/store/cart"
import { readCart } from "@/utils/localStorageUtils"
import { CartGoodsList } from '@/store/types';
import { goodsStore } from "@/store/goods"
import {useRouter} from "vue-router"
const showDialog = ref(false)
const store = cartStore()
const router=useRouter()
const getGoodsStore = goodsStore()
onMounted(() => {
  store.cart = readCart()
  console.log(store.cart)
})


// const deleteGoodItem = (i: CartGoodsList) => {
//   showDialog.value = true
// }

const buy = () => {
  getGoodsStore.updateGoods().then(() => {
    store.clearCart()
  })
}

const countHandler = (key: string, i: CartGoodsList) => {
  if (key === 'subtract') {
    if (i.count <= 0) {
      i.count = 0
    }
    i.count -=1;
   store.deleteCartCount(i, i.count)
  }

  if (key === 'add') {
    if (i.count === i.stock) {
      i.count = i.stock
    } else {
      i.count +=1;
      store.addCart(i, i.count)
    }
  }
}

</script>
<style lang="scss">
.cart-wrap {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  .empty {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .empty-cart{
      background:url("@/assets/cart/empty-cart.png") 48% 50% no-repeat;
      width: 100%;
      height: 150px;
      background-size: 120px 120px;
    }

    .title{
      width: 100%;
      height: 30px;
      font-size: 20px;
      text-align: center;
      padding:20px 0;
    }

    .go-shop{
      text-align: center;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background: var(--main-bg-color);
      color:var(--main-text-color);
      border-radius: 20px;
      font-weight: bold;

      &:hover{
        background: var(--main-text-color);
        border:2px solid var(--text-background-color);
        color:var(--main-bg-color);
      }
    }
  }
}
</style>
