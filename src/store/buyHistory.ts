import { defineStore } from 'pinia';

import { CartGoodsList, BuyHistory } from './types';
import { saveBuyHistory, readBuyHistory } from '@/utils/localStorageUtils';
export const buyHistoryStore = defineStore({
    id: 'buyHistory',
    state: () => {
        return {
            historyList: [] as BuyHistory[],
        };
    },
    actions: {
        /**
         * 取得購買紀錄
         */
        getBuyHistoryList() {
            this.historyList = readBuyHistory();
        },
        /**
         * 儲存購買紀錄
         */
        setBuyHistoryList(data: CartGoodsList[]) {
            saveBuyHistory(data);
        },
    },
});
