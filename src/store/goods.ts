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
    /**
     * 商品列表儲存到localstorage
     */
    async getAllGoods(): Promise<void> {
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
    /**
     * 商品分類列表儲存到localstorage
     */
    async getCategory(): Promise<void> {
      await categoryList().then((res) => {
        try {
          this.category = res.data
          saveCategory(this.category)
        } catch (error) {
          this.category = []
          saveCategory(this.category)
        }
      })
    },
    /**
     * 更新商品數量
     * @param {array} selectCartList 結帳頁面勾選要結帳的項目
     * @returns {Promise}
     */
    updateGoods(selectCartList: number[]): Promise<number> {
      return new Promise(async (resolve) => {
        //取得購物車清單
        const getCartStore = cartStore()
        const currentCart = getCartStore.cart
        // 更新商品列表
        await this.readGoodsList()

        //已勾選的購物車清單
        const readyCheckoutCart = currentCart.filter(item => selectCartList.includes(item.id))

        //未勾選的購物車清單
        const newCart = currentCart.filter(item => !selectCartList.includes(item.id))


        const changeStock = (cartItem: Cart) => {
          const index = this.goods.findIndex((item) => (item.id === cartItem.id))

          if (index) {
            this.goods[index].stock -= cartItem.count
            if (this.goods[index].stock === 0) {
              this.goods.splice(index, 1)
            }
          }
        }

        // 更新總商品清單及購物車
        readyCheckoutCart.forEach(cartItem => {

          changeStock(cartItem)
        })
        saveGoods(this.goods)
        getCartStore.saveCartHandler(newCart)
        resolve(1);
      });
    },
    /**
    * 取得商品列表
    */
    async readGoodsList(): Promise<void> {
      if (this.goods.length === 0) {
        const stashGoods = readGoods()
        if (stashGoods.length === 0) {
          await this.getAllGoods()
        } else {
          this.goods = stashGoods;
        }
      }
    },
    /**
     * 取得商品分類列表
     */
    async readCategoryList(): Promise<void> {
      if (this.category.length === 0) {
        const stashCategory = readCategory()
        if (stashCategory.length === 0) {
          await this.getCategory()
        } else {
          this.category = stashCategory;

        }
      }
    }
  },
})
