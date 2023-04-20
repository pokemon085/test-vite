import { defineStore } from 'pinia'
import { Cart } from './types'
import { saveCart } from '@/utils/localStorageUtils'

export const cartStore = defineStore({
  id: 'cart',
  state: () => {
    return {
      cart: [] as Cart[]
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.length
    }
  },
  actions: {
    addCart(cartItem: Cart) {
      const exist = this.cart.findIndex(item => {
        return (item.id === cartItem.id)
      })

      if (exist !== -1) {
        this.cart[exist].count += 1
      } else {
        cartItem.count += 1
        this.cart.unshift(cartItem)
      }
      saveCart(this.cart)
    },
    deleteCart(index: number) {
      this.cart.splice(index, 1)
    },
    modifyCart(index: number, cart: Cart) {
      this.cart[index] = cart
      saveCart(this.cart)
    },
    clearCart(){
      saveCart([])
    }
  }
})