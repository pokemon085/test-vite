import { defineStore } from 'pinia'
import { newsList } from '@/api/index'
import { News } from './types'
import { saveNewItem, readNewsItem } from '@/utils/localStorageUtils'
export const newsStore = defineStore({
    id: 'news',
    state: () => {
        return {
            newsListResult: [] as News[],
            news: {} as News
        }
    },
    actions: {
        /**
         * 取得消息列表
         */
        async getNewList():Promise<void> {
            await newsList().then((res) => {
                try {
                    this.newsListResult = res.data

                } catch (error) {
                    console.log(error)
                }
            })
        },
        /**
         * 儲存消息資訊
         */
        setNewsData(data = {} as News):void {
            saveNewItem(data)
        },
        /**
         * 取得消息資訊
         */
        readNewsDetail():void {
            this.news = readNewsItem()
        }
    }
})
