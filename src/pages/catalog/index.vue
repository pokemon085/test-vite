<template>
    <div class="category-wrap">
        <div class="left">
            <div class="block">
                <div class="title">商品</div>
                <div class="category-list" v-if="categoryList.length > 0">
                    <div
                        :class="[
                            'category-item',
                            { active: currentCategory === i.category },
                        ]"
                        v-for="i in categoryList"
                        :key="i.id"
                        @click="filterCategoryHandler(i.category)"
                    >
                        {{ i.name }}
                    </div>
                </div>
            </div>
        </div>

        <div class="right">
            <div class="good-list" v-if="filterGoodsRange.length > 0">
                <card
                    v-for="i in filterGoodsRange"
                    :info="i"
                    @event="eventHandler"
                />
            </div>
            <vue-awesome-paginate
                :total-items="filterCategoryList.length"
                :items-per-page="pageInterval"
                :max-pages-shown="pageInterval"
                v-model="currentPage"
                :on-click="clickShowPageHandler"
            />
        </div>
        <pop-up v-if="showPopup" @close="showPopup = false" :data="popupData" />
        <loading v-if="showLoading" />
    </div>
</template>
<script lang="ts" setup>
import card from './card.vue';
import { Category, Goods, Popup } from '@/store/types';
import { ref, computed, onMounted, reactive } from 'vue';
import { goodsStore } from '@/store/goods';
import { cartStore } from '@/store/cart';
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import popUp from '@/components/popUp/index.vue';
import loading from '@/components/loading/index.vue';
const storeGoods = goodsStore();
const storeCart = cartStore();
const getUserStore = userStore();
const router = useRouter();
const showPopup = ref(false);
const currentPage = ref(1);
const showLoading = ref(false);
const currentCategory = ref('all');
const { cart } = storeToRefs(storeCart);

const { goods } = storeToRefs(storeGoods);

const popupData = reactive<Popup>({
    title: '通知',
    content: '',
    button: '確定',
    type: 'success',
    dialog: false,
});

const pageInterval = ref<number>(8);
const filterCategoryList = ref<Goods[]>(goods.value);
const filterGoodsRange = ref<Goods[]>([]);

/**
 * 分類列表
 */
const categoryList = computed(() => {
    return [
        { id: 0, name: '全部', category: 'all' },
        ...storeGoods.category,
    ] as Category[];
});

/**
 * 篩選分類的結果
 * @param {string} val
 */
const filterCategoryHandler = (val: string): void => {
    loadingHandler();
    currentCategory.value = val;
    if (val === 'all') {
        filterCategoryList.value = goods.value;
    } else {
        filterCategoryList.value = goods.value.filter(
            (item) => item.category === val,
        );
    }
    clickShowPageHandler(1);
};

const clickShowPageHandler = (page: number): void => {
    filterGoodsRange.value = filterCategoryList.value.filter(
        (i, index) =>
            index >= (page - 1) * pageInterval.value &&
            index <= page * pageInterval.value - 1,
    );
    window.scroll(0, 0);
};

const addCartToStore = (key: Goods) => {
    if (getUserStore.isLoginUser() === false) {
        router.push('/login');
        return;
    }

    const findCartCount = cart.value.find((item) => item.id === key.id)?.count;
    //判斷購物車是否有跟庫存一樣數量
    if (findCartCount === key.stock) {
        (popupData.title = '警告'),
            (popupData.content = '您的購物車數量已達庫存上限');
        popupData.type = 'warning';
        showPopup.value = true;

        return;
    }
    popupData.content = '成功加入購物車!';
    popupData.type = 'success';
    showPopup.value = true;
    storeCart.addCart(key, 1);
};

const goProduct = (item: Goods) => {
    router.push({
        path: '/product',
        query: { id: item.id },
    });
};

const loadingHandler = () => {
    showLoading.value = true;
    let timer = setTimeout(() => {
        showLoading.value = false;
        clearTimeout(timer);
    }, 300);
};

const eventHandler = (val: { key: string; i: Goods }) => {
    const { key, i } = val;
    if (key === 'goProduct') {
        goProduct(i);
    }
    if (key === 'addCart') {
        addCartToStore(i);
    }
};

onMounted(async () => {
    await storeGoods.readGoodsList();
    await storeGoods.readCategoryList();

    // 分類
    filterCategoryHandler(currentCategory.value);
    loadingHandler();
    //預設頁碼第一頁
    clickShowPageHandler(currentPage.value);
});
</script>
<style lang="scss" scoped>
.category-wrap {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 1fr;

    .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: sticky;
        top: 50px;
        left: 0;
        height: 400px;

        .block {
            width: 100%;
            height: 100%;
            background: rgb(190, 164, 164);
            text-align: center;
        }

        .title {
            border-bottom: 1px solid #bbb8b8;
            padding: 30px 0 20px 0;
            font-weight: bold;
            font-size: 20px;
        }

        .category-list {
            text-align: center;
            padding: 10px;

            .category-item {
                margin: 20px auto 20px auto;
                height: 30px;
                line-height: 30px;
                border-radius: 30px;
                background: #faebd7;
                box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
                cursor: pointer;

                &:hover {
                    color: #764d4d;
                }

                &.active {
                    color: var(--loading-color);
                    font-weight: bold;
                }
            }
        }
    }

    .right {
        text-align: center;

        .good-list {
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(4, 200px);
            justify-content: center;
            justify-items: center;
            grid-gap: 15px;
        }
    }
}

@media screen and (max-width: 1036px) {
    .category-wrap {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 100px 2fr;
        grid-template-rows: 1fr;
    }
    .category-wrap .right .good-list {
        padding: 10px;
        grid-template-columns: repeat(2, 200px);
    }
}
</style>
