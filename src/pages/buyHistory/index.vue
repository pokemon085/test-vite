<template>
    <subject-title>購買紀錄</subject-title>
    <div v-if="historyList.length === 0" class="empty">
        <i class="mdi mdi-clipboard-search-outline"></i>
        <div class="empty-text">目前無購買紀錄</div>
    </div>
    <template v-else>
        <div
            v-for="(history, index) in historyList"
            :key="index"
            class="history-list-wrap"
        >
            <div class="buy-time">購買時間: {{ history.time }}</div>
            <div
                v-for="(item, index) in history.items"
                :key="item.id"
                class="item"
            >
                <div class="order">{{ index + 1 }}</div>
                <div class="image">
                    <img :src="getImage(`goods/${item.image}`)" />
                </div>
                <div class="content">
                    <div class="name">{{ item.name }}</div>
                    <div class="count">數量:{{ item.count }}</div>
                    <div class="price">價格: ${{ item.price }}</div>
                </div>
                <div class="total">合計: ${{ item.price * item.count }}</div>
            </div>
            <div class="sum">總計: ${{ getTotal(history.items) }}</div>
        </div>
    </template>
</template>
<script lang="ts" setup>
import { buyHistoryStore } from '@/store/buyHistory';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { CartGoodsList } from '@/store/types';
import subjectTitle from '@/components/subjectTitle/index.vue';
import { getImage } from '@/utils';

const history = buyHistoryStore();
const { historyList } = storeToRefs(history);

const getTotal = (items: CartGoodsList[]) => {
    return items.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);
};

onMounted(() => {
    history.getBuyHistoryList();
});
</script>
<style lang="scss" scoped>
.history-list-wrap {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    border: 1px solid gray;
    border-radius: 10px;

    & + .history-list-wrap {
        margin-top: 20px;
    }

    .item {
        width: 100%;
        min-height: 80px;
        display: flex;
        align-items: center;

        .order {
            text-align: center;
            width: 80px;
        }

        .image {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;

            > img {
                width: 100%;
                height: 100%;
            }
        }

        .content {
            margin: 0 10px;
            flex: 1;

            .name {
                word-break: break-all;
                margin-bottom: 5px;
                font-weight: 500;
            }

            .count,
            .price {
                font-size: 14px;
                margin-bottom: 5px;
            }
        }

        .total {
            padding: 0 20px;
        }
    }
}

.buy-time {
    font-size: 14px;
    padding: 10px;
    background-color: var(--block-bg-color);
    border-radius: 10px 10px 0 0;
}

.sum {
    border-top: 1px solid gray;
    text-align: right;
    margin: 10px 20px;
    padding-top: 10px;
    font-weight: bold;
}

.empty {
    text-align: center;
    margin-top: 100px;
    font-size: 18px;

    .mdi {
        font-size: 48px;
        color: gray;
    }

    .empty-text {
        margin-top: 10px;
        color: gray;
    }
}
</style>
