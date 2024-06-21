import { defineStore } from 'pinia'
import { CartGoodsList, Goods } from './types'
import { saveCart, readCart } from '@/utils/localStorageUtils'

export const cartStore = defineStore({
  id: 'cart',
  state: () => {
    return {
      // 購物列表
      cart: [] as CartGoodsList[]
    }
  },
  getters: {
    /**
     * 購物車總數
     * @returns 購物車總數
     */
    cartTotal(state) {
      return state.cart.length
    }
  },
  actions: {
    /**
     * 將購物車資料存到localstorage
     * @param {array} data
     */
    saveCartHandler(data: CartGoodsList[] | []): void {
      saveCart(data)
    },
    /**
     * 加到購物車
     * @param {object} cartItem
     * @param {number} count
     */
    addCart(cartItem: CartGoodsList | Goods, count: number): void {
      const exist = this.cart.findIndex(item => {
        return (+item.id === +cartItem.id)
      })

      if (exist !== -1) {
        this.cart[exist].count += count
      } else {
        this.cart.unshift({ ...cartItem, count })
      }
      this.saveCartHandler(this.cart)
    },
    /**
     * 刪除購物車數量
     * @param {object} cartItem
     * @param {number} count
     */
    deleteCartCount(cartItem: CartGoodsList | Goods, count: number): void {
      const exist = this.cart.findIndex(item => {
        return (item.id === cartItem.id)
      })

      if (this.cart[exist].count <= 1) {
        this.deleteCart(exist)
      } else {
        this.cart[exist].count = count
      }
      saveCart(this.cart)
    },
    /**
     * 刪除購物車項目
     * @param {number} index
     */
    deleteCart(index: number): void {
      this.cart.splice(index, 1)
      saveCart(this.cart)
    },
    /**
     * 清除購物車
     */
    clearCart(): void {
      this.saveCartHandler([])
    },
    /**
     * 重整購物車
     */
    reloadReadCart() {
      this.cart = readCart()
    },
  }
})
