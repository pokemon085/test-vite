import { defineStore } from 'pinia'
import { User } from './types'
import { saveUser,readUser, userLogin, userSignOut } from '@/utils/localStorageUtils'

export const userStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: [] as User[],
      isLogin: {} as User
    }
  },
  getters: {

  },
  actions: {
    saveUserData(data: User) {
      this.user.unshift(data)
      saveUser(this.user)
    },
    saveUserList() {
      this.user=readUser()
    },
    checkLogin(data: User): boolean {
      const isSave = this.findUser(data)
      
      if (isSave) {
        this.isLogin = data
        userLogin(this.isLogin)
        return true
      }
      return false
    },
    findUser(data: User): boolean {
      console.log(this.user)
      console.log(data)
      const result = this.user.find(item => {
        return item.email === data.email && item.password ===data.password
      })

      return result ? true : false
    },
    signOut() {
      this.isLogin = {} as User
      userSignOut()
    }
  }
})