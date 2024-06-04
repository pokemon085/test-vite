<template>
    <div class="item" >
        <div class="item-image">
            <div v-if="imageLoading" class="image-loading"><skeleton /></div>
            <img v-show="!imageLoading" src="https://picsum.photos/id/100/200/200" alt="" @load="onImgLoad">
        </div>
        <template v-if="!imageLoading">
            <div class="content">
                <div class="content-item ">name:{{ info.name }}</div>
                <div class="content-item">category:{{ info.category }}</div>
                <div class="content-item">money:{{ info.money }}</div>
                <div class="content-item">stock:{{ info.stock }}</div>
            </div>
            <div class="button-wrap">
                <div class="button" @click="clickHandler('goProduct', info)">content</div>
                <div class="button" @click="clickHandler('addCart', info)">addCart</div>
            </div>
        </template>
        <div v-else class="card-bottom-loading">
            <div class="block"><skeleton /></div>
            <div class="block"><skeleton /></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Goods } from '@/store/types'
import skeleton from '@/components/skeleton/index.vue'

defineProps({
    info: {
        type: Object as () => Goods,
        required: true
    }
})

const emit = defineEmits(['event'])

const imageLoading = ref(true)
const clickHandler = (key: string, i: Goods) => {
    emit('event', { key, i })
}

const onImgLoad = () => {
    imageLoading.value = false
}

</script>
<style lang="scss" scoped>
.item {
    width: 100%;
    border: 1px solid #000;
    height: 315px;

    .image-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 200px;
    }

    .item-image {
        width: 199px;
        height: 200px;

        >img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        width: 200px;
        padding: 0 10px;
        box-sizing: border-box;

        .content-item {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 180px;
        }
    }

    .button-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 40px;

        .button {
            width: 70px;
            border: 3px solid var(--text-background-color);
            text-align: center;
            line-height: 30px;

            &:hover {
                background-color: var(--text-background-color);
                border: 3px solid var(--main-bg-color);
                font-weight: bold;
            }
        }

    }

    .card-bottom-loading {
        padding: 0 10px;
        .block{
            width: 100%;
            height: 30px;
            margin-top: 20px;
        }

        .block{
            width: 100%;
            height: 20px;
            margin-top: 20px;
        }
    }
}
</style>
