import { defineStore } from 'pinia'

import { CartGoodsList } from './types'
import { saveBuyHistory, readBuyHistory } from '@/utils/localStorageUtils'
export const buyHistoryStore = defineStore({
    id: 'buyHistory',
    state: () => {
        return {
            historyList: [] as CartGoodsList[]
        }
    },
    actions: {
        /**
         * 取得購買紀錄
         */
        getBuyHistoryList() {
            this.historyList = readBuyHistory()
        },
        /**
         * 儲存購買紀錄
         */
        setBuyHistoryList(data: CartGoodsList) {
            this.getBuyHistoryList()
            const existId = this.historyList.findIndex(item => item.id === data.id)
            console.log('this.historyList=', this.historyList)

            if (existId === -1) {
                this.historyList.push(data)
            } else {
                this.historyList[existId].count += data.count
            }
            saveBuyHistory(this.historyList)

        },
    }
})
