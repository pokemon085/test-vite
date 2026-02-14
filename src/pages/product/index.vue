<template>
    <div class="back" @click="router.back()">返回</div>
    <div class="product-wrap" v-if="productDetail">
        <div class="image-wrap">
            <div class="image">
                <div v-if="imageLoading" class="image-loading">
                    <skeleton />
                </div>
                <img
                    v-show="!imageLoading"
                    :src="getImage(`goods/${productDetail.image}`)"
                    alt=""
                    @load="onImgLoad"
                />
            </div>
        </div>
        <div class="detail">
            <div class="detail-item name">{{ productDetail.name }}</div>
            <div class="detail-item introduce">
                {{ productDetail.description }}
            </div>
            <div class="detail-item price">
                價格: ${{ productDetail.price }}
            </div>
            <div class="detail-item stock">庫存: {{ productDetail.stock }}</div>
            <div class="item">
                <div class="option">
                    購買數量:
                    <button
                        class="option-button"
                        @click="countHandler('subtract')"
                    >
                        -
                    </button>
                    <input class="option-input" type="number" v-model="count" />
                    <button class="option-button" @click="countHandler('add')">
                        +
                    </button>
                </div>
            </div>
            <hr />
            <div class="check-button" @click="addCart()">
                <i class="mdi mdi-cart" />加入購物車
            </div>
            <div class="check-button" @click="checkout()">
                <i class="mdi mdi-basket-check-outline" />結帳
            </div>
        </div>

        <pop-up v-if="showPopup" @close="showPopup = false" :data="popupData" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { cartStore } from '@/store/cart';
import { Goods, Popup } from '@/store/types';
import { goodsStore } from '@/store/goods';
import { userStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import skeleton from '@/components/skeleton/index.vue';
import popUp from '@/components/popUp/index.vue';
import { getImage } from '@/utils';
// 查看商品詳情頁面

const route = useRoute();
const router = useRouter();
const storeCart = cartStore();
const getGoodsStore = goodsStore();
const getUserStore = userStore();
getGoodsStore.readCategoryList();
getGoodsStore.readGoodsList();

const { cart } = storeToRefs(storeCart);

const productId = ref<number | null>(null); //傳進來的id
const productDetail = ref<Goods | null>(null); //存商品資訊
const stock = ref<number>(0); //存商品庫存
const cartCountTotal = ref<number>(0); //該商品存在購物車的總數
const count = ref<number>(0); //當前操作商品
const imageLoading = ref<boolean>(true);
const showPopup = ref<boolean>(false);

const popupData = reactive<Popup>({
    title: '提示',
    content: '成功加入購物車!',
    button: '確定',
    type: 'success',
    dialog: false,
});

/**
 * 商品操作數量(未加入購物車)
 * @param {string} key
 */
const countHandler = (key: 'add' | 'subtract'): void => {
    if (key === 'add') {
        count.value =
            count.value >= stock.value ? stock.value : count.value + 1;
    } else {
        count.value = count.value === 0 ? 0 : count.value - 1;
    }
};

/**
 * 將商品數量加入購物車
 */
const addCart = (): void => {
    if (count.value === 0) {
        showPopup.value = true;
        popupData.title = '錯誤';
        popupData.type = 'warning';
        popupData.content = '請選擇購買數量';
        return;
    }

    if (getUserStore.isLoginUser() === false) {
        router.push('/login');
        return;
    }

    cartCountTotal.value =
        cart.value.find((item) => item.id === productId.value)?.count || 0;
    if (count.value + cartCountTotal.value > stock.value) {
        showPopup.value = true;
        popupData.title = '錯誤';
        popupData.type = 'warning';
        popupData.content = '商品數量超過庫存';
        return;
    }

    if (productDetail.value) {
        storeCart.addCart(productDetail.value, count.value);
        showPopup.value = true;
        popupData.title = '提示';
        popupData.type = 'success';
        popupData.content = `已加入 ${count.value} 件商品至購物車`;
    }
};

/**
 * 結帳
 */
const checkout = (): void => {
    if (getUserStore.isLoginUser() === false) {
        router.push('/login');
        return;
    }

    setTimeout(() => {
        router.push('/cart');
    }, 300);
};

const onImgLoad = (): void => {
    imageLoading.value = false;
};

onMounted(() => {
    productId.value = route.query.id ? +route.query.id : null;
    productDetail.value =
        getGoodsStore.goods.find((item) => +item.id === +productId.value!) ||
        null;
    stock.value = productDetail.value ? productDetail.value.stock : 0;
    if (productDetail.value === null) {
        router.replace('/');
    }
});
</script>
<style lang="scss" scoped>
.back {
    display: inline-flex;
    align-items: center;
    padding: 4px 15px;
    border-radius: 0 15px 15px 0;
    background-color: var(--text-background-color);
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
    cursor: pointer;
    top: 20px;
    position: relative;

    &:hover {
        font-weight: bold;
        background-color: var(--main-bg-color);
    }
}

.product-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin-left: 50px;
    flex-wrap: wrap;

    .image-wrap {
        margin-right: 20px;

        .image {
            width: 300px;
            height: 300px;
            .image-loading {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }

            > img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .detail {
        width: 500px;

        .detail-item {
            padding: 5px 0;
        }

        .name {
            font-size: 20px;
            font-weight: 600;
            word-break: break-all;
        }

        .option {
            min-width: 100px;
            height: 25px;
            display: flex;
            align-items: center;

            .option-button {
                margin: 0 5px;
            }

            > input {
                text-align: center;
            }
        }

        .check-button {
            display: inline-flex;
            min-width: 50px;
            width: auto;
            padding: 8px 20px;
            align-items: center;
            border-radius: 20px;
            background-color: var(--main-bg-color);
            color: var(--main-text-color);
            text-align: center;
            font-weight: bold;
            margin-bottom: 10px;
            cursor: pointer;
            font-size: 16px;

            > i {
                padding-right: 5px;
                font-size: 16px;
            }
        }

        .check-button + .check-button {
            margin-left: 15px;
        }
    }

    .option {
        .option-input {
            width: 40px;
        }
    }
}

@media screen and (max-width: 767px) {
    /* 在螢幕寬度小於 767px 時使用以下 CSS 規則 */
    .product-wrap {
        .left-wrap {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
