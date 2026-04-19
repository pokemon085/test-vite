<template>
    <div class="search-wrap">
        <div class="input-wrap">
            <input type="text" v-model="searchText" />
            <div
                class="cancel"
                v-show="searchText !== ''"
                @click="searchText = ''"
            ></div>
        </div>
        <div class="content">
            <div v-if="findResult.length > 0" class="item-wrap">
                <div
                    v-for="item in findResult"
                    class="item"
                    @click="goProduct(item)"
                >
                    {{ item.name }}
                </div>
            </div>
            <div class="no-data" v-else>查無商品</div>
        </div>
        <loading v-if="showLoading" />
    </div>
    <div class="mask" @click="emit('close')"></div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { goodsStore } from '@/store/goods';
import { useRouter } from 'vue-router';
import { Goods } from '@/store/types';
import loading from '@/components/loading/index.vue';
import { delay } from '@/utils';

const emit = defineEmits(['close']);
const router = useRouter();
const getGoodsStore = goodsStore();
const searchText = ref('');
const showLoading = ref(false);

const findResult = computed<Goods[]>(() => {
    const textToLower = searchText.value.toLowerCase();
    if (searchText.value === '') return getGoodsStore.goods;
    return getGoodsStore.goods.filter(
        (item: { category: string; name: string }) =>
            item.name.toLowerCase().includes(textToLower),
    );
});

const goProduct = async (item: Goods): Promise<void> => {
    showLoading.value = true;

    await delay(300);
    showLoading.value = false;
    emit('close');
    router.replace({
        path: '/product',
        query: { id: item.id },
    });
};

onMounted(() => {
    if (getGoodsStore.goods.length === 0) {
        getGoodsStore.getAllGoods();
    }
});
</script>
<style lang="scss" scoped>
.mask {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    inset: 0;
    z-index: var(--popup-mask-z-index);
}

.search-wrap {
    position: fixed;
    width: 80%;
    max-width: 400px;
    height: 400px;
    background: var(--block-bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--popup-z-index);
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;

    .input-wrap {
        margin: 10px 0;
        height: 50px;
        background: url('@/assets/search/search.png') 2% 50% no-repeat;
        background-size: 20px 20px;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 5px;
        box-sizing: border-box;
        width: 100%;

        input {
            min-width: 0;
            width: 100%;
            height: 44px;
            outline: none;
            margin-left: 25px;
            border: none;
        }

        input:focus {
            outline: none;
        }

        .cancel {
            width: 20px;
            height: 20px;
            background: url('/src/assets/search/cancel.png') center no-repeat;
            background-size: contain;
            cursor: pointer;
        }
    }

    .content {
        width: 100%;
        height: 400px;
        display: flex;
        overflow-y: auto;

        .item-wrap {
            width: 100%;
        }

        .item {
            font-size: 16px;
            padding: 10px 0;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:hover {
                background: var(--text-background-color);
                cursor: pointer;
            }
        }

        .no-data {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
        }
    }
}
</style>
