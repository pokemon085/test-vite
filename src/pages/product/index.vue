<template>
  <div class="product-wrap" v-if="productDetail">
    <div class="left-wrap">
      <div class="back" @click="router.back()">back</div>
      <div class="image">
        <img src="https://picsum.photos/id/130/200/200" alt="">
      </div>
    </div>
    <div class="detail">
      category:{{ productDetail.category }}<br />
      name:{{ productDetail.name }}<br />
      money:{{ productDetail.money }}<br />
      introduce:{{ productDetail.introduce }}<br />

      <div class="item">
        <div class="title">stock:{{ productDetail.stock }}</div>
        <div class="option">
          <button @click="countHandler('subtract')">-</button>
          <input class="option-input" type="number" v-model="count" />
          <button @click="countHandler('add')">+</button>
        </div>
      </div>
      <hr />
      <div class="check-button" @click="checkout()">checkout</div>
      <div class="check-button" @click="addCart()">addCart</div>
    </div>
    {{ cart }}
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { cartStore } from "@/store/cart"
import { Goods } from '@/store/types';
import { goodsStore } from "@/store/goods"
import { userStore } from "@/store/user"
import { storeToRefs } from 'pinia'

// 查看商品詳情頁面

const route = useRoute()
const router = useRouter()
const storeCart = cartStore()
const getGoodsStore = goodsStore()
const getUserStore = userStore()
getGoodsStore.readCategoryList()
getGoodsStore.readGoodsList()

const { cart } = storeToRefs(storeCart)


const productId = ref<number | null>(null) //傳進來的id
const productDetail = ref<Goods | null>(null); //存商品資訊
const stock = ref<number>(0) //存商品庫存
const cartCountTotal = ref<number>(0) //該商品存在購物車的總數
const count = ref<number>(0) //當前操作商品

/**
 * 商品操作數量(未加入購物車)
 * @param {string} key
 */
const countHandler = (key: 'add' | 'subtract') => {
  if (key === 'add') {
    count.value = count.value >= stock.value ? stock.value : count.value + 1
  } else {
    count.value = count.value === 0 ? 0 : count.value - 1
  }
}

/**
 * 將商品數量加入購物車
 */
const addCart = () => {

  cartCountTotal.value = cart.value.find(item => item.id === productId.value)?.count || 0
  if (count.value + cartCountTotal.value > stock.value) {
    count.value = 0
    alert('max')
    return
  }

  if(productDetail.value){
    storeCart.addCart(productDetail.value, count.value);
  }

}

/**
 * 結帳
 */
const checkout = () => {
  if (Object.keys(getUserStore.isLogin).length === 0) {
    router.push("/login")
    return
  }

  setTimeout(() => {
    router.push("/cart")
  }, 300);
}

onMounted(() => {
  productId.value = route.query.id ? +route.query.id : null;
  productDetail.value = getGoodsStore.goods.find(item => +item.id === +productId.value!) || null
  stock.value = productDetail.value ? productDetail.value.stock : 0
})


</script>
<style lang="scss" scoped>
.product-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  .left-wrap {
    display: flex;
    flex-direction: column;
    margin: 0 30px;
  }

  .back {
    width: 50px;
    height: 30px;
    border-radius: 5px;
    background-color: var(--text-background-color);
    line-height: 30px;
    text-align: center;
    margin-bottom: 5px;

    &:hover {
      font-weight: bold;
      background-color: var(--main-bg-color);
    }
  }

  .image {
    width: 400px;
    height: 400px;

    >img {
      width: 100%;
      height: 100%;
    }
  }

  .detail {
    width: 300px;
    padding: 10px;

    .option {
      width: 100px;
      height: 25px;
    }

    .check-button {
      width: 100px;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      background-color: var(--main-bg-color);
      color: var(--main-text-color);
      text-align: center;
      font-weight: bold;
    }
  }

  .option {
    .option-input {
      width: 40px;
    }
  }

}
</style>
