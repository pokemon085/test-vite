<template>
  <div class="catelog-wrap">
    <div class="left">
      <div class="title">Category</div>
      <div class="category-list" v-if="categoryList.length > 0">
        <div class="category-item" v-for="i in categoryList">
          {{ i.name }}
        </div>
      </div>
    </div>

    <div class="right">
      <div class="good-list" v-if="filterGoodsRange.length > 0">
        <div class="item" v-for="i in filterGoodsRange">
          id:{{ i.id }}
          name:{{ i.name }}
          money:{{ i.money }}
          stock:{{ i.stock }}
          <button @click="goProduct(i)">content</button>
          <button @click="addCartToStore(i)">addCart</button>
        </div>
      </div>

      <vue-awesome-paginate :total-items="storeGoods.goodsLength" :items-per-page="pageInterval"
        :max-pages-shown="pageInterval" v-model="currentPage" :on-click="onClickHandler" />
    </div>
    <pop-up v-if="showPopup" @close="showPopup = false" />
  </div>
</template>
<script lang="ts" setup>
import { Cart, Category, Goods } from '@/store/types'
import { ref, computed, onMounted } from 'vue'
import { goodsStore } from "@/store/goods"
import { cartStore } from "@/store/cart"
import { userStore } from "@/store/user"
import { useRouter } from "vue-router";
import popUp from "@/components/popUp/index.vue"
const storeGoods = goodsStore()
const storeCart = cartStore()
const getUserStore = userStore()
const router = useRouter();
const showPopup = ref(false)
const currentPage = ref(1);
storeGoods.readGoodsList()
storeGoods.readCategoryList()
onMounted(() => {
  onClickHandler(currentPage.value)
})
const goodList = computed(() => {
  return storeGoods.goods as Goods[]
})
const categoryList = computed(() => {
  return storeGoods.category as Category[]
})
const pageInterval = ref(5)
const filterGoodsRange = ref(goodList.value)
const onClickHandler = (page: number): void => {
  filterGoodsRange.value = goodList.value.filter((i, index) => index >= (page - 1) * pageInterval.value && index <= (page * pageInterval.value) - 1);
};

const addCartToStore = (key: Goods) => {
  if (Object.keys(getUserStore.isLogin).length === 0) {
    router.push("/login")
    return
  }
  showPopup.value = true
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
.catelog-wrap {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 3fr;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;

    .title {
      border-bottom: 1px solid #bbb8b8;
      width: 150px;
      text-align: center;
      padding: 10px 0;
    }

    .category-list {
      min-width: 180px;
      height: 500px;
      overflow-y: auto;
      text-align: center;
      padding: 10px 0;

      .category-item {
        margin: 10px auto 10px auto;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        background: #faebd7;
        cursor: pointer;
      }
    }
  }

  .right {
    background: rgb(189, 209, 233);
  }
}




</style>