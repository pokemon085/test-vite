<template>
    <div class="title">
        buy history
    </div>
    <div class="history-list-wrap">

        <div v-for="(item, index) in historyList" :key="item.id" class="item">
            <div class="order">{{ index + 1 }}</div>
            <div class="image">
                <img src="https://picsum.photos/id/50/50/50" />
            </div>
            <div class="content">
                <div class="name">name:{{ item.name }}</div>
                <div class="count">buyCount:{{ item.count }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { buyHistoryStore } from "@/store/buyHistory"
import { storeToRefs } from 'pinia'
import { onMounted } from "vue"

const history = buyHistoryStore()
const { historyList } = storeToRefs(history)

onMounted(() => {
    history.getBuyHistoryList()
})
</script>
<style lang="scss" scoped>
.title {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
}

.history-list-wrap {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    border: 1px solid gray;
    border-radius: 10px;


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
            width: 80px;
            min-height: 80px;
            display: flex;
            align-items: center;
        }

        .content {
            width: calc(100% - 160px);
            margin: 0 10px;

            .name {
                word-break: break-all;
                margin-bottom: 5px;
            }
        }
    }
}
</style>
