<template>
    <div class="item">
        <div class="item-image">
            <div v-if="imageLoading" class="image-loading">
                <skeleton />
            </div>
            <img
                v-show="!imageLoading"
                :src="getImage(`goods/${info.image}`)"
                alt="goods-image"
                @load="onImgLoad"
            />
        </div>
        <template v-if="!imageLoading">
            <div class="content">
                <div class="content-item">{{ info.name }}</div>
                <div class="content-item">價格:${{ info.price }}</div>
            </div>
            <div class="button-wrap">
                <div class="button" @click="clickHandler('goProduct', info)">
                    詳情
                </div>
                <div class="button" @click="clickHandler('addCart', info)">
                    加入購物車
                </div>
            </div>
        </template>
        <div v-else class="card-bottom-loading">
            <div class="block">
                <skeleton />
            </div>
            <div class="block">
                <skeleton />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Goods } from '@/store/types';
import skeleton from '@/components/skeleton/index.vue';
import { getImage } from '@/utils';

defineProps({
    info: {
        type: Object as () => Goods,
        required: true,
    },
});

const emit = defineEmits(['event']);

const imageLoading = ref(true);
const clickHandler = (key: string, i: Goods) => {
    emit('event', { key, i });
};

const onImgLoad = () => {
    imageLoading.value = false;
};
</script>
<style lang="scss" scoped>
.item {
    width: 200px;
    border: 1px solid #000;
    transition: all 0.1s linear;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-bottom: 10px;

    &:hover {
        transform: translateY(-3px);
    }

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

        > img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;

        .content-item {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 180px;
            padding-bottom: 5px;
        }
    }

    .button-wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;

        .button {
            flex:1 1 auto;
            min-width: 70px;
            padding: 5px;
            border: 3px solid var(--text-background-color);
            text-align: center;
            cursor: pointer;
            font-size: 14px;

            &:hover {
                background-color: var(--text-background-color);
                border: 3px solid var(--main-bg-color);
                font-weight: bold;
            }
        }
    }

    .card-bottom-loading {
        padding: 0 10px;

        .block {
            width: 100%;
            height: 30px;
            margin-top: 20px;
        }

        .block {
            width: 100%;
            height: 20px;
            margin-top: 20px;
        }
    }
}
</style>
