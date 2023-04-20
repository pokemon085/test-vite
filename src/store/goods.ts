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
    updateGoods() {
      return new Promise((resolve) => { 
        const getCartStore = cartStore()
        const currentCart = getCartStore.cart
        
        const changeStock=(cartItem:Cart)=>{
          const index=this.goods.findIndex((item) => {
              return (item.id===cartItem.id)
          })
          this.goods[index].stock-=cartItem.count
        }
  
        currentCart.forEach(cartItem => {
          changeStock(cartItem)
        })
        saveGoods(this.goods)
        resolve(1);  
      });
      
    }
  },
})
