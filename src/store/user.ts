import { defineStore } from 'pinia'
import { User } from './types'
import { saveUser, readUser, readUserLogin, userLogin, userSignOut } from '@/utils/localStorageUtils'

export const userStore = defineStore({
  id: 'user',
  state: () => {
    return {
      user: [] as User[],
      isLogin: {} as User
    }
  },
  getters: {
    /**
     * 取得使用者帳號第一個字
     * @returns {string} 結果
     */
    userFrontName(): string {
      return this.isLogin.email.slice(0, 1)
    }
  },
  actions: {
    /**
     * 儲存使用者
     * @param {object} data email,password
     */
    saveUserData(data: User):void {
      this.user.unshift(data)
      saveUser(this.user)
    },
    /**
     * 登入的使用者帳號 email,password
     */
    saveLoginUser():void {
      this.isLogin = readUserLogin() ?? {}
    },
    /**
     * 取得使用者帳號
     */
    saveUserList():void {
      this.user = readUser()
    },
    /**
     * 檢查登入
     * @param data User
     * @returns {boolean} 登入結果
     */
    checkLogin(data: User): boolean {
      const isSave =this.findUser(data)

      if (isSave) {
        this.isLogin = data
        userLogin(this.isLogin)
        return true
      }
      return false
    },
    /**
     * 是否有這個使用者
     * @param data
     * @returns {boolean} 結果
     */
    findUser(data: User): boolean {
      const result = this.user.find(item => {
        return item.email === data.email && item.password === data.password
      })
      return result ? true : false
    },
    /**
     * 登出
     */
    signOut():void {
      this.isLogin = {} as User
      userSignOut()
    },
    /**
     * 忘記密碼 直接輸入信箱更改密碼
     * @param data
     * @returns {Promise} 更改結果
     */
    forgetPassword(data: User): Promise<string> {
      const result:number = this.user.findIndex(item => {
        return item.email === data.email
      })

      return new Promise<string>((resolve) => {
        if (result !== -1) {
          this.user[result].password = data.password
          saveUser(this.user)
          return resolve('ok')
        }
        return resolve('error')
      })
    },

  }
})
