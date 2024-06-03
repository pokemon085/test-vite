import { defineStore } from 'pinia'
import { Cart, CartGoodsList, Goods } from './types'
import { saveCart, readCart } from '@/utils/localStorageUtils'

export const cartStore = defineStore({
  id: 'cart',
  state: () => {
    return {
      cart: [] as Cart[] | CartGoodsList[]
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.length
    }
  },
  actions: {
    addCart(cartItem: CartGoodsList | Goods, count: number) {
      const exist = this.cart.findIndex(item => {
        return (+item.id === +cartItem.id)
      })

      if (exist !== -1) {
        this.cart[exist].count += count
      } else {
        this.cart.unshift({ ...cartItem, count })
      }
      saveCart(this.cart)
    },
    deleteCartCount(cartItem: CartGoodsList | Goods, count: number) {
      const exist = this.cart.findIndex(item => {
        return (item.id === cartItem.id)
      })

      if (this.cart[exist].count <= 1) {
        this.deleteCart(exist)
      } else {
        this.cart[exist].count -= count
      }
      saveCart(this.cart)
    },
    deleteCart(index: number) {
      this.cart.splice(index, 1)
      saveCart(this.cart)
    },
    clearCart() {
      saveCart([])
    },
    reloadReadCart() {
      this.cart = readCart()

    }
  }
})
