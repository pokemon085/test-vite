<template>
    <div class="cart-wrap">
        <div class="cart-list-wrap" v-if="cart.length > 0">
            <div class="cart-list">
                <div class="back-button-wrap" @click="$router.back()">
                    <i class="mdi mdi-arrow-left-bold back" />回上頁
                </div>
                <div class="title">購物清單</div>
                <div class="item" v-for="(i, index) in cart" :key="i.id">
                    <div class="check-wrap">
                        <div class="order">{{ index + 1 }}</div>
                        <input
                            type="checkbox"
                            :value="i.id"
                            v-model="selectCartList"
                        />
                    </div>
                    <div class="content">
                        <div class="image">
                            <img :src="getImage(`goods/${i.image}`)" />
                        </div>
                        <div class="wrap">
                            <div class="content-item">
                                名稱: {{ i.name }}<br />
                                價格: ${{ i.price }}<br />
                                庫存: {{ i.stock }}<br />
                            </div>
                            <div class="option">
                                <button @click="countHandler('subtract', i)">
                                    -
                                </button>
                                <input type="text" v-model="i.count" />
                                <button @click="countHandler('add', i)">
                                    +
                                </button>
                            </div>
                            <div class="money">
                                合計: ${{ i.count * i.price }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                v-if="selectCartList.length > 0"
                class="buy-button-wrap"
                @click="buy"
            >
                <i class="mdi mdi-cash-register checkout" />
                結帳
            </button>
        </div>
        <div v-else>
            <div class="empty">
                <div class="empty-cart"></div>
                <div class="title">購物車是空的</div>
                <div class="go-shop" @click="router.push('/catalog')">
                    去逛逛
                </div>
            </div>
        </div>
    </div>
    <loading v-if="showLoading" />

    <!-- 通知對話框 -->
    <pop-up v-if="showPopup" @close="closePopup" :data="popupData" />

    <!-- 刪除商品對話框 -->
    <pop-up
        v-if="showDeletePopup"
        @close="closeDeletePopup"
        :data="deletePopupData"
    >
        <div
            class="event-button button"
            @click="clickDelete(readyDeleteGoods.info, readyDeleteGoods.count)"
        >
            刪除
        </div>
    </pop-up>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { cartStore } from '@/store/cart';
import { CartGoodsList, Popup } from '@/store/types';
import { goodsStore } from '@/store/goods';
import { useRouter } from 'vue-router';
import loading from '@/components/loading/index.vue';
import popUp from '@/components/popUp/index.vue';
import { storeToRefs } from 'pinia';
import { getImage, delay } from '@/utils';

const showLoading = ref(false);
const store = cartStore();
const router = useRouter();
const getGoodsStore = goodsStore();
const { cart } = storeToRefs(store);

// 通知內容
const popupData = reactive<Popup>({
    title: '',
    content: '',
    button: '確定',
    type: 'success',
    dialog: false,
});
const showPopup = ref(false);

// 刪除對話框的內容
const deletePopupData = reactive<Popup>({
    title: '提示',
    content: '',
    button: '取消',
    type: 'warning',
    dialog: true,
});
// 存放要整個刪除的商品
const readyDeleteGoods = reactive({
    info: {} as CartGoodsList,
    count: 0 as number,
});
const showDeletePopup = ref(false);

// 存放選擇要結帳的商品id
const selectCartList = ref<number[]>([]);

const init = () => {
    store.reloadReadCart();
};

const buy = async () => {
    showLoading.value = true;
    getGoodsStore.updateGoods(selectCartList.value).then(async (result) => {
        if (result.status === 0) {
            showLoading.value = false;
            popupData.title = '錯誤';
            popupData.content = result.message;
            popupData.type = 'error';
            showPopup.value = true;
            return;
        }

        popupData.title = '通知';
        popupData.content = result.message;
        popupData.type = 'success';
        await delay(300);
        showLoading.value = false;
        showPopup.value = true;
    });
};

const closePopup = () => {
    showPopup.value = false;
    showLoading.value = true;
    init();
    showLoading.value = false;
};

const closeDeletePopup = () => {
    showDeletePopup.value = false;
    readyDeleteGoods.info = {} as CartGoodsList;
    readyDeleteGoods.count = 0;
};

const deleteGoodsHandler = (info: CartGoodsList, count: number) => {
    store.deleteCartCount(info, count);
};

const clickDelete = async (info: CartGoodsList, count: number) => {
    deleteGoodsHandler(info, count);
    showDeletePopup.value = false;
    showLoading.value = true;
    init();
    await delay(300);
    showLoading.value = false;
};

const countHandler = (key: string, i: CartGoodsList) => {
    let count = i.count;
    if (key === 'subtract') {
        // 遇到整個刪除該商品的情況
        if (i.count <= 1) {
            showDeletePopup.value = true;
            readyDeleteGoods.info = i;
            readyDeleteGoods.count = count;
            deletePopupData.content = `確定要刪除商品 <br/>${i.name}？`;
            return;
        }
        count -= 1;
        deleteGoodsHandler(i, count);
    }

    if (key === 'add') {
        if (i.count === i.stock) {
            count = i.stock;
        } else {
            store.addCart(i, 1);
        }
    }
};

onMounted(() => {
    init();
});
</script>
<style lang="scss" scoped>
.cart-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .cart-list-wrap {
        width: 80%;
        margin: 0 auto;
    }

    .cart-list {
        width: 100%;
        border-radius: 5px;
        margin-bottom: 10px;

        .title {
            font-size: 20px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #eee;
            border-radius: 5px 5px 0 0;
            position: sticky;
            top: 0;
        }

        .item {
            padding: 10px 5px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;

            .check-wrap {
                display: flex;
                width: 50px;
                text-align: center;

                .order {
                    margin: 0 5px;
                }
            }

            .content {
                display: flex;
                width: 100%;

                .wrap {
                    margin-left: 8px;
                    width: 100%;
                    padding: 10px;
                }
                .image {
                    min-width: 50px;
                    width: 50px;
                    height: 50px;
                    align-self: center;

                    > img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .content-item {
                    display: flex;
                    flex-direction: column;
                    word-break: break-all;
                }
            }

            .option {
                width: 150px;
                display: flex;
                justify-content: center;

                > input {
                    margin: 0 5px;
                    width: 80px;
                    text-align: center;
                }
            }

            .money {
                margin-top: 5px;
            }
        }
    }

    .empty {
        width: 400px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .empty-cart {
            background: url('@/assets/cart/empty-cart.png') 48% 50% no-repeat;
            width: 100%;
            height: 150px;
            background-size: 120px 120px;
        }

        .title {
            width: 100%;
            height: 30px;
            font-size: 20px;
            text-align: center;
            padding: 20px 0;
        }

        .go-shop {
            text-align: center;
            width: 200px;
            height: 40px;
            line-height: 40px;
            background: var(--main-bg-color);
            color: var(--main-text-color);
            border-radius: 20px;
            font-weight: bold;

            &:hover {
                background: var(--main-text-color);
                border: 2px solid var(--text-background-color);
                color: var(--main-bg-color);
            }
        }
    }
}

.event-button {
    padding: 5px;
    border: 1px solid red;
    cursor: pointer;
    border-radius: 5px;
    color: red;
}

.back-button-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: 30px;
    border: 2px solid gray;
    color: gray;
    margin-bottom: 10px;
    font-weight: bold;
    padding: 5px 10px;
    cursor: pointer;

    .back {
        color: gray;
        font-size: 20px;
        margin-right: 5px;
    }

    &:hover {
        background-color: gray;
        color: #fff;

        .back {
            color: #fff;
        }
    }
}

.buy-button-wrap {
    display: flex;
    align-items: center;
    border: 2px solid var(--main-bg-color);
    border-radius: 25px;
    margin-bottom: 10px;
    margin-left: auto;
    font-weight: bold;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 18px;
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
    animation: move 0.9s ease-in-out alternate infinite;

    .checkout {
        color: var(--main-text-color);
        font-size: 20px;
        margin-right: 5px;
    }
}

@keyframes move {
    0% {
        transform: scale(0.95);
    }
    50% {
        transform: scale(1.02);
    }
    100% {
        transform: scale(1);
    }
}
</style>
