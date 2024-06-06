<template>
  <div class="cart-wrap">
    <div v-if="cart.length > 0">
      <button @click="$router.back()">back</button>
      <div class="cart-list">
        <div class="title">cart list</div>
        <div class="item" v-for="i in cart">
          <div class="check-wrap">
            <input type="checkbox" :value="i.id" v-model="selectCartList">
          </div>
          <div class="content">
            <div class="image">aa</div>
            <div class="content-item">
              name:{{ i.name }}<br />
              price:{{ i.money }}<br />
              stock:{{ i.stock }}<br />
            </div>

          </div>
          <div class="option">
            <button @click="countHandler('subtract', i)">-</button>
            <input type="text" v-model="i.count" />
            <button @click="countHandler('add', i)">+</button>
          </div>
          <div class="money">total:{{ i.count * i.money }}</div>
        </div>
      </div>
      <button @click="buy">ok</button>
    </div>
    <div v-else>
      <div class="empty">
        <div class="empty-cart"></div>
        <div class="title">Your Cart is Currently Empty!</div>
        <div class="go-shop" @click="router.push('/catalog')">Shop Now</div>
      </div>
    </div>
  </div>
  <loading v-show="showLoading" />
  <pop-up v-if="showPopup" @close="closePopup" :data="popupData" />
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { cartStore } from "@/store/cart"
import { CartGoodsList, Popup } from '@/store/types';
import { goodsStore } from "@/store/goods"
import { useRouter } from "vue-router"
import loading from '@/components/loading/index.vue'
import popUp from "@/components/popUp/index.vue"
import { storeToRefs } from 'pinia'
const showLoading = ref(false)
const showPopup = ref(false)
const store = cartStore()
const router = useRouter()
const getGoodsStore = goodsStore()
const popupData = reactive<Popup>({ title: '', content: '', button: 'ok', type: 'success' })

const selectCartList = ref([])
const { cart } = storeToRefs(store)

const init = () => {
  store.reloadReadCart()
}

onMounted(() => {
  init()
})

const buy = () => {
  console.log(selectCartList.value)
  showLoading.value = true

  getGoodsStore.updateGoods(selectCartList.value).then(() => {
    showLoading.value = false
    popupData.title = '通知'
    popupData.content = '結帳成功'
    popupData.type = 'success'
  })
}

const closePopup = () => {
  showPopup.value = false
  showLoading.value = true
  init()
  showLoading.value = false
}

const countHandler = (key: string, i: CartGoodsList) => {
  let count = i.count
  if (key === 'subtract') {
    if (i.count <= 0) {
      count = 0
    }
    count -= 1;
    store.deleteCartCount(i, count)
  }

  if (key === 'add') {
    if (i.count === i.stock) {
      count = i.stock
    } else {
      count += 1;
      store.addCart(i, count)
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
  margin-top: 30px;

  .cart-list {
    border: 1px solid gray;
    width: 600px;

    .title {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eee;
    }

    .item {
      display: grid;
      grid-template-columns: 1fr 5fr 3fr 2fr;
      align-items: center;

      .check-wrap {
        justify-self: center;
      }

      .content {
        display: flex;
        border: 1px solid;
        border-width: 0 1px 0 1px;

        .image {
          width: 30px;
        }

        .content-item {
          display: flex;
          flex-direction: column;
        }
      }

      .option {
        display: flex;
        justify-content: center;

        >input {
          margin: 0 5px;
          width: 80px;
        }

      }

      .money {
        display: flex;
        height: 100%;
        border-left: 1px solid;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .empty {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .empty-cart {
      background: url("@/assets/cart/empty-cart.png") 48% 50% no-repeat;
      width: 100%;
      height: 150px;
      background-size: 120px 120px;
    }

    .title {
      width: 100%;
      height: 30px;
      font-size: 20px;
      text-align: center;
      padding: 20px 0;
    }

    .go-shop {
      text-align: center;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background: var(--main-bg-color);
      color: var(--main-text-color);
      border-radius: 20px;
      font-weight: bold;

      &:hover {
        background: var(--main-text-color);
        border: 2px solid var(--text-background-color);
        color: var(--main-bg-color);
      }
    }
  }
}
</style>
