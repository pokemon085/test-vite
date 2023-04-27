<template>
  <div class="catelog-wrap">
    <div class="left">
      <div class="block">
        <div class="title">Category</div>
        <div class="category-list" v-if="categoryList.length > 0">
          <div :class="['category-item', { active: currentCategory === i.name }]" v-for="i in categoryList" :key="i.id"
            @click="filterCategoryHandler(i.name)">
            {{ i.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="good-list" v-if="filterGoodsRange.length > 0">
        <div class="item" v-for="i in filterGoodsRange">
          <div class="item-image">
            <img src="https://picsum.photos/id/100/200/200" alt="">
          </div>
          <div class="content">
            <div class="content-item">name:{{ i.name }}</div>
            <div class="content-item">category:{{ i.category }}</div>
            <div class="content-item">money:{{ i.money }}</div>
            <div class="content-item">stock:{{ i.stock }}</div>
          </div>
          <div class="button-wrap">
            <div class="button" @click="goProduct(i)">content</div>
            <div class="button" @click="addCartToStore(i)">addCart</div>
          </div>
        </div>
      </div>
      <vue-awesome-paginate :total-items="filterCategoryList.length" :items-per-page="pageInterval"
        :max-pages-shown="pageInterval" v-model="currentPage" :on-click="clickShowPageHandler" />
    </div>
    <pop-up v-if="showPopup" @close="showPopup = false" />
    <loading v-show="showLoading" />
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
import loading from '@/components/loading/index.vue'
const storeGoods = goodsStore()
const storeCart = cartStore()
const getUserStore = userStore()
const router = useRouter()
const showPopup = ref(false)
const currentPage = ref(1)
const showLoading = ref(false)
const currentCategory = ref('all')
storeGoods.readGoodsList()
storeGoods.readCategoryList()
onMounted(() => {
  loadingHandler()
  clickShowPageHandler(currentPage.value)
})
const goodList = computed(() => {
  return storeGoods.goods as Goods[]
})
const categoryList = computed(() => {
  return [{ id: 0, name: "all" }, ...storeGoods.category] as Category[]
})
const pageInterval = ref(10)
const filterCategoryList = ref<Goods[]>(goodList.value)
const filterGoodsRange = ref<Goods[]>([])

const filterCategoryHandler = (val: string): void => {
  loadingHandler()
  currentCategory.value = val
  if (val === 'all') {
    filterCategoryList.value = goodList.value
  } else {
    filterCategoryList.value = goodList.value.filter(item => item.category === val)
  }
  clickShowPageHandler(1)
}

const clickShowPageHandler = (page: number): void => {
  filterGoodsRange.value = filterCategoryList.value.filter((i, index) => index >= (page - 1) * pageInterval.value && index <= (page * pageInterval.value) - 1);
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

const loadingHandler = () => {
  showLoading.value = true
  let timer = setTimeout(() => {
    showLoading.value = false
    clearTimeout(timer);
  }, 300);
}


</script>
<style lang="scss" scoped>
.catelog-wrap {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .block {
      width: 100%;
      height: 100%;
      margin: 0 5px;
      background: rgb(190, 164, 164);
      text-align: center;
    }

    .title {
      border-bottom: 1px solid #bbb8b8;
      padding: 30px 0 20px 0;
      font-weight: bold;
      font-size: 20px;
    }

    .category-list {
      min-width: 180px;
      height: 500px;
      overflow-y: auto;
      text-align: center;
      padding: 10px 0;

      .category-item {
        margin: 20px auto 20px auto;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        background: #faebd7;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        cursor: pointer;

        &:hover{
          scale: 1.1;
        }

        &.active {
          color: var(--loading-color);
          font-weight: bold;
        }
      }
    }
  }

  .right {
    display: grid;
    grid-template-rows: 5fr 1fr;
    align-items: center;

    .good-list {
      padding: 20px;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(5, minmax(200px, 200px));
      gap: 20px 20px;
    }

    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #000;

      .item-image {
        width: 100%;

        >img {
          width: 100%;
          height: 100%;
        }
      }

      .content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 200px;
        padding: 0 10px;
        box-sizing: border-box;

        .content-item {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 180px;
        }
      }

      .button-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 40px;

        .button {
          width: 70px;
          border: 3px solid var(--text-background-color);
          text-align: center;
          line-height: 30px;

          &:hover{
            background-color: var(--text-background-color);
            border: 3px solid var(--main-bg-color);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>