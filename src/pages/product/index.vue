<template>
  <div class="back" @click="router.back()">{{`< back`}}</div>
  <div class="product-wrap" v-if="productDetail">
    <div class="left-wrap">
      <div class="image-wrap">
        <div class="image">
          <div v-if="imageLoading" class="image-loading">
            <skeleton />
          </div>
          <img v-show="!imageLoading" src="https://picsum.photos/id/130/200/200" alt="" @load="onImgLoad">
        </div>
      </div>
      <div class="detail">
        <div class="detail-item name">{{ productDetail.name }}</div>
        <div class="detail-item introduce">introduce:{{ productDetail.introduce }}</div>
        <div class="detail-item category">category:{{ productDetail.category }}</div>
        <div class="detail-item price">price:{{ productDetail.money }}</div>
        <div class="detail-item stock">stock:{{ productDetail.stock }}</div>
        <div class="item">
          <div class="option">
            <button class="option-button" @click="countHandler('subtract')">-</button>
            <input class="option-input" type="number" v-model="count" />
            <button class="option-button" @click="countHandler('add')">+</button>
          </div>
        </div>
        <hr />
        <div class="check-button" @click="addCart()">
          <i class="mdi mdi-cart" />addCart
        </div>
        <div class="check-button" @click="checkout()">
          <i class="mdi mdi-basket-check-outline" />checkout
        </div>
      </div>
    </div>

    <pop-up v-if="showPopup" @close="showPopup = false" :data="popupData" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { cartStore } from "@/store/cart"
import { Goods, Popup } from '@/store/types';
import { goodsStore } from "@/store/goods"
import { userStore } from "@/store/user"
import { storeToRefs } from 'pinia'
import skeleton from '@/components/skeleton/index.vue'
import popUp from "@/components/popUp/index.vue"
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
const imageLoading = ref<boolean>(true)
const showPopup = ref<boolean>(false)

const popupData = reactive<Popup>({
  title: 'Tip',
  content: 'add cart success!',
  button: 'ok',
  type: 'success',
  dialog: false
})

/**
 * 商品操作數量(未加入購物車)
 * @param {string} key
 */
const countHandler = (key: 'add' | 'subtract'): void => {
  if (key === 'add') {
    count.value = count.value >= stock.value ? stock.value : count.value + 1
  } else {
    count.value = count.value === 0 ? 0 : count.value - 1
  }
}

/**
 * 將商品數量加入購物車
 */
const addCart = (): void => {

  if (count.value === 0) {
    return
  }

  cartCountTotal.value = cart.value.find(item => item.id === productId.value)?.count || 0
  if (count.value + cartCountTotal.value > stock.value) {
    count.value = 0
    showPopup.value = true
    popupData.title = 'error'
    popupData.type = 'warning'
    popupData.content = `add amount is max`
    return
  }

  if (productDetail.value) {
    storeCart.addCart(productDetail.value, count.value)
    showPopup.value = true
    popupData.title = 'Tip'
    popupData.type = 'success'
    popupData.content = `add amount ${count.value} success`
  }

}

/**
 * 結帳
 */
const checkout = (): void => {
  if (Object.keys(getUserStore.isLogin).length === 0) {
    router.push("/login")
    return
  }

  setTimeout(() => {
    router.push("/cart")
  }, 300);
}

const onImgLoad = (): void => {
  imageLoading.value = false
}

onMounted(() => {
  productId.value = route.query.id ? +route.query.id : null;
  productDetail.value = getGoodsStore.goods.find(item => +item.id === +productId.value!) || null
  stock.value = productDetail.value ? productDetail.value.stock : 0
  if (productDetail.value === null) {
    router.replace('/')
  }
})


</script>
<style lang="scss" scoped>
.back {
  display: inline-flex;
  padding: 0 5px;
  height: 30px;
  border-radius: 5px;
  background-color: var(--text-background-color);
  line-height: 30px;
  text-align: center;
  margin-bottom: 5px;
  position: sticky;
  left: 0;
  top: 100px;

  &:hover {
    font-weight: bold;
    background-color: var(--main-bg-color);
  }
}

.product-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .left-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .image-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    max-width: 300px;
    min-width: 300px;

    .image {
      width: 200px;
      height: 200px;
      margin: 0 30px;

      .image-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }

      >img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .detail {
    min-width: 300px;
    width: auto;
    padding: 10px;

    .detail-item {
      padding: 5px 0;
    }

    .name {
      font-size: 20px;
      font-weight: 600;
      word-break: break-all;
    }

    .option {
      min-width: 100px;
      height: 25px;

      .option-button {
        margin: 0 5px;
      }

      >input {
        text-align: center;
      }
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
      margin-bottom: 10px;
      cursor: pointer;
      padding: 0 5px;
      font-size: 16px;

      >i {
        padding-right: 5px;
        font-size: 16px;
      }
    }
  }

  .option {
    .option-input {
      width: 40px;
    }
  }

}

@media screen and (max-width: 767px) {

  /* 在螢幕寬度小於 767px 時使用以下 CSS 規則 */
  .product-wrap {
    .left-wrap {
      display: flex;
      flex-direction: column;

    }
  }

}
</style>
