<template>
  <div class="cart-wrap clearfix">
    <div class="cart-list-wrap" v-if="cart.length > 0">
      <div class="cart-list">
        <div class="back-button-wrap" @click="$router.back()">
          <i class="mdi mdi-arrow-left-bold back" />back
        </div>
        <div class="title">cart list</div>
        <div class="item" v-for="(i, index) in cart" :key="i.id">
          <div class="check-wrap">
            <div class="order">{{ index + 1 }}</div>
            <input type="checkbox" :value="i.id" v-model="selectCartList">

          </div>
          <div class="content">
            <div class="image"><img src="https://picsum.photos/id/100/100/200" /></div>
            <div class="wrap">
              <div class="content-item">
                name:{{ i.name }}<br />
                price:{{ i.money }}<br />
                stock:{{ i.stock }}<br />
              </div>
              <div class="option">
                <button @click="countHandler('subtract', i)">-</button>
                <input type="text" v-model="i.count" />
                <button @click="countHandler('add', i)">+</button>
              </div>
              <div class="money">total: {{ i.count * i.money }}</div>
            </div>
          </div>
        </div>
      </div>
      <button v-if="selectCartList.length > 0" :class="['buy-button-wrap']" @click="buy">
        <i class="mdi mdi-cash-register checkout" />
        checkout</button>
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

  <!-- 通知對話框 -->
  <pop-up v-if="showPopup" @close="closePopup" :data="popupData" />

  <!-- 刪除商品對話框 -->
  <pop-up v-if="showDeletePopup" @close="closeDeletePopup" :data="deletePopupData">
    <div class="event-button" @click="clickDelete(readyDeleteGoods.info, readyDeleteGoods.count)">delete</div>
  </pop-up>
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
const store = cartStore()
const router = useRouter()
const getGoodsStore = goodsStore()
const { cart } = storeToRefs(store)

// 通知內容
const popupData = reactive<Popup>({ title: '', content: '', button: 'ok', type: 'success', dialog: false })
const showPopup = ref(false)

// 刪除對話框的內容
const deletePopupData = reactive<Popup>({ title: 'Consider', content: '', button: 'cancel', type: 'warning', dialog: true })
// 存放要整個刪除的商品
const readyDeleteGoods = reactive({ info: {} as CartGoodsList, count: 0 as number })
const showDeletePopup = ref(false)

// 存放選擇要結帳的商品
const selectCartList = ref([])

const init = () => {
  store.reloadReadCart()
}

const buy = () => {
  console.log(selectCartList.value)
  showLoading.value = true

  getGoodsStore.updateGoods(selectCartList.value).then(() => {

    popupData.title = '通知'
    popupData.content = '結帳成功'
    popupData.type = 'success'

    setTimeout(() => {
      showLoading.value = false
      showPopup.value = true
    }, 300);

  })
}

const closePopup = () => {
  showPopup.value = false
  showLoading.value = true
  init()
  showLoading.value = false
}

const closeDeletePopup = () => {
  showDeletePopup.value = false
  readyDeleteGoods.info = {} as CartGoodsList
  readyDeleteGoods.count = 0

}

const deleteGoodsHandler = (info: CartGoodsList, count: number) => {
  store.deleteCartCount(info, count)
}

const clickDelete = (info: CartGoodsList, count: number) => {
  deleteGoodsHandler(info, count)
  showDeletePopup.value = false
  showLoading.value = true
  init()
  setTimeout(() => {
    showLoading.value = false
  }, 300);

}

const countHandler = (key: string, i: CartGoodsList) => {
  let count = i.count
  if (key === 'subtract') {

    // 遇到整個刪除該商品的情況
    if (i.count <= 1) {
      showDeletePopup.value = true
      readyDeleteGoods.info = i
      readyDeleteGoods.count = count
      deletePopupData.content = `Are you sure you want to delete this goods ${i.name} ?`
      return
    }
    count -= 1;
    deleteGoodsHandler(i, count)

  }

  if (key === 'add') {
    if (i.count === i.stock) {
      count = i.stock
    } else {
      store.addCart(i, 1)
    }
  }
}

onMounted(() => {
  init()
})

</script>
<style lang="scss" scoped>
.cart-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .cart-list-wrap {
    width: 80%;
    margin: 0 auto;
  }

  .cart-list {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;

    .title {
      font-size: 20px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eee;
      border-radius: 5px 5px 0 0;
      position: sticky;
      top: 0;

    }

    .item {
      padding: 10px 5px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;

      .check-wrap {
        display: flex;
        width: 50px;
        text-align: center;

        .order {
          margin: 0 5px;
        }
      }

      .content {
        display: flex;
        width:100%;

        .wrap{
          margin-left: 8px;
          width: 100%;
          padding: 10px;
        }
        .image {
          min-width: 50px;
          width: 50px;
          height: 50px;
          align-self: center;

          >img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .content-item {
          display: flex;
          flex-direction: column;
          word-break: break-all;
        }
      }

      .option {
        width: 150px;
        display: flex;
        justify-content: center;

        >input {
          margin: 0 5px;
          width: 80px;
          text-align: center;
        }

      }

      .money {
        margin-top: 5px;
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

//TODO:按鈕樣式共用
.event-button {
  padding: 5px;
  margin: 0 5px;
  border: 1px solid;
  cursor: pointer;
  border-radius: 5px;
}

.back-button-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 30px;
  border: 2px solid gray;
  color: gray;
  margin-bottom: 10px;
  font-weight: bold;
  padding: 5px 10px;
  cursor: pointer;

  .back {
    color: gray;
    font-size: 20px;
    margin-right: 5px;
  }

  &:hover {
    background-color: gray;
    color: #fff;

    .back {
      color: #fff;
    }
  }
}

.buy-button-wrap {
  float: right;
  display: inline-flex;
  align-items: center;
  border: 2px solid pink;

  margin-bottom: 10px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;

  font-size: 20px;
  background-color: pink;
  color: #fff;
  animation: move .5s linear alternate infinite;

  .checkout {
    color: #fff;
    font-size: 20px;
    margin-right: 5px;
  }

}

@keyframes move {
  0% {
    transform: scale(0.98);
  }

  100% {
    transform: scale(1);
  }

}
</style>
