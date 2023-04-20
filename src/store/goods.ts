import { defineStore } from 'pinia'
import { Goods } from './types'
import { goodsList } from '@/api/index'
import { saveGoods } from "@/utils/localStorageUtils"
import { Cart } from '@/store/types';
import { cartStore } from './cart';
export const goodsStore = defineStore({
  id: 'goods', // id必填，且需要唯一
  state: () => {
    return {
      goods: [] as Goods[]
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
            saveGoods([])
            console.log(error)
          }
        })
    },
    updateGoods(){
      const getCurrentCart=cartStore().cart
      console.log(getCurrentCart);
      

      //   {
      //     "id": 1,
      //     "categroy": "candy",
      //     "name": "aaa",
      //     "money": 100,
      //     "introduce": "sdfsfs afdsfsdfdsf",
      //     "stock": 1,
      //     "count": 1
      // }
      
    }
  },
})
