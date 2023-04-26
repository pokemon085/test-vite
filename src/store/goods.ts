import { defineStore } from 'pinia'
import { Goods } from './types'
import { goodsList, categoryList } from '@/api/index'
import { saveGoods, readGoods, saveCategory, readCategory } from "@/utils/localStorageUtils"
import { Cart, Category } from '@/store/types';
import { cartStore } from './cart';

export const goodsStore = defineStore({
  id: 'goods', // id必填，且需要唯一
  state: () => {
    return {
      goods: [] as Goods[],
      category: [] as Category[]
    }
  },
  getters: {
    goodsLength(state) {
      return state.goods.length
    }
  },
  actions: {
    async getAllGoods() {
      await goodsList().then((res) => {
        try {
          this.goods = res.data
          saveGoods(this.goods)
        } catch (error) {
          this.goods = []
          saveGoods([])
          console.log(error)
        }
      })
    },
    async getCategory() {
      console.log('aaa')
      await categoryList().then((res) => {
        try {
          this.category = res.data
          saveCategory(this.category)
        } catch (error) {
          this.category = []
          saveCategory(this.category)
          console.log(error)
        }
      })
    },
    updateGoods() {
      return new Promise((resolve) => {
        const getCartStore = cartStore()
        const currentCart = getCartStore.cart

        const changeStock = (cartItem: Cart) => {
          const index = this.goods.findIndex((item) => {
            return (item.id === cartItem.id)
          })
          this.goods[index].stock -= cartItem.count
        }

        currentCart.forEach(cartItem => {
          changeStock(cartItem)
        })
        saveGoods(this.goods)
        resolve(1);
      });

    },
    readGoodsList() {
      if (this.goods.length === 0) {
        const stashGoods = readGoods()
        if (stashGoods.length === 0) {
          this.getAllGoods()
        } else {
          this.goods = stashGoods;
        }
      }
    },
    readCategoryList() {
      if (this.category.length === 0) {
        const stashCategory = readCategory()
        if (stashCategory.length === 0) {
          this.getCategory()
        } else {
          this.category = stashCategory;

        }
      }
    }
  },
})
