import { defineStore } from 'pinia'
import { User } from './types'
import { saveUser,readUser,readUserLogin, userLogin, userSignOut } from '@/utils/localStorageUtils'

export const userStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: [] as User[],
      isLogin: {} as User
    }
  },
  getters: {
    userFrontName():string{
      return this.isLogin.email.slice(0, 1)
    }
  },
  actions: {
    saveUserData(data: User) {
      this.user.unshift(data)
      saveUser(this.user)
    },
    saveLoginUser(){
      this.isLogin=readUserLogin() ?? {}
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