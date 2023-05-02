<template>
  <div class="product-wrap">
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
          <button @click="countHandler('substract')">-</button>
          <input class="option-input" type="number" v-model="count" />
          <button @click="countHandler('add')">+</button>
        </div>
      </div>
      <hr />
      <div class="check-button" @click="checkout()">checkout</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { cartStore } from "@/store/cart"
import { Cart } from '@/store/types';
import { goodsStore } from "@/store/goods"
import { userStore } from "@/store/user"
const route = useRoute()
const router = useRouter()
const storeCart = cartStore()
const getGoodsStore = goodsStore()
const getUserStore = userStore()
getGoodsStore.readCategoryList()
getGoodsStore.readGoodsList()
const productId: any = computed(() => route.query.id)
const productDetail: any = computed(() => {
  return getGoodsStore.goods.find(item => +item.id === +productId.value)
})
const stock = ref(+productDetail.value.stock)
const count = ref(0)
const countHandler = (key: string) => {

  if (key === 'add') {
    count.value = count.value >= stock.value ? stock.value : count.value + 1
  } else {
    count.value = count.value === 0 ? 0 : count.value - 1
  }
}

const checkout = () => {
  if (Object.keys(getUserStore.isLogin).length === 0) {
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
<style lang="scss" scoped>
.product-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  .left-wrap{
    display: flex;
    flex-direction: column;
    margin:0 30px;
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