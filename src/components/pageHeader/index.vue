<template>
    <div class="header">
        <div class="logo-wrap">
            <i class="mdi mdi-bread-slice"></i>
            <div class="logo-name">烘焙屋</div>
        </div>
        <div class="list">
            <router-link class="path" to="/"
                ><i class="mdi mdi-home"></i>
                <div class="path-name">首頁</div>
            </router-link>
            <router-link class="path" to="/catalog"
                ><i class="mdi mdi-list-box-outline"></i>
                <div class="path-name">商品</div>
            </router-link>
            <router-link class="path" to="/faqs"
                ><i class="mdi mdi-comment-question"></i>
                <div class="path-name">常見問題</div>
            </router-link>
            <router-link class="path" to="/contact"
                ><i class="mdi mdi-information-slab-box"></i>
                <div class="path-name">聯繫我們</div>
            </router-link>
        </div>
        <div class="function-icon">
            <div class="search" @click="openSearch"></div>
            <div class="cart" @click="$router.push('/cart')">
                <div v-if="getCartStore.cartTotal > 0" class="red-pot">
                    {{ cartCount }}
                </div>
            </div>
            <div class="login-wrap">
                <div
                    class="login"
                    v-if="getUserStore.isLoginUser() === false"
                    @click="$router.push('/login')"
                ></div>
                <div class="member-image" v-else @click="loginHandler">
                    {{ getUserStore.userFrontName }}
                    <tool-tip>
                        <template #user>
                            <div>{{ getUserStore.isLogin.email }}</div>
                        </template>
                        <template #item>
                            <div
                                class="list-item"
                                @click="$router.push('/buyHistory')"
                            >
                                購買紀錄
                            </div>
                            <div class="list-item" @click="signOutHandler">
                                登出
                            </div>
                        </template>
                    </tool-tip>
                </div>
            </div>
        </div>

        <div class="menu-wrap" @click="showDropDown = !showDropDown">
            <i class="mdi mdi-menu"></i>
        </div>
    </div>

    <div v-if="showDropDown" class="drop-down-wrap">
        <div class="drop-down">
            <div class="main-function">主功能</div>
            <div class="main-function-wrap" @click="showDropDown = false">
                <router-link class="path" to="/"
                    ><i class="mdi mdi-home"></i>
                    <div class="path-name">首頁</div>
                </router-link>
                <router-link class="path" to="/catalog"
                    ><i class="mdi mdi-list-box-outline"></i>
                    <div class="path-name">商品</div>
                </router-link>
                <router-link class="path" to="/faqs"
                    ><i class="mdi mdi-comment-question"></i>
                    <div class="path-name">常見問題</div>
                </router-link>
                <router-link class="path" to="/contact"
                    ><i class="mdi mdi-information-slab-box"></i>
                    <div class="path-name">聯繫我們</div>
                </router-link>
            </div>

            <div class="main-function">其他</div>
            <div class="main-function-wrap" @click="showDropDown = false">
                <div class="search" @click="openSearch">
                    <i class="mdi mdi-magnify"></i>搜尋
                </div>
                <div class="cart" @click="$router.push('/cart')">
                    <i class="mdi mdi-cart-outline"></i>購物車
                    <div v-if="getCartStore.cartTotal > 0" class="red-pot">
                        {{ cartCount }}
                    </div>
                </div>
            </div>

            <div class="main-function">會員</div>
            <div class="main-function-wrap" @click="showDropDown = false">
                <div
                    v-if="getUserStore.isLoginUser() === false"
                    @click="$router.push('/login')"
                    class="login"
                >
                    <i class="mdi mdi-login"></i>登入
                </div>
                <div v-else>
                    <div class="email">
                        信箱: {{ getUserStore.isLogin.email }}
                    </div>
                    <div class="history" @click="$router.push('/buyHistory')">
                        購買紀錄
                    </div>
                    <div class="logout" @click="signOutHandler">登出</div>
                </div>
            </div>
        </div>
    </div>
    <teleport to="body">
        <search v-if="showSearch" @close="closeHandler" />
    </teleport>
</template>
<script lang="ts" setup>
import { userStore } from '@/store/user';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import toolTip from '@/components/toolTip/index.vue';
import search from '@/components/search/index.vue';
import { cartStore } from '@/store/cart';
import { delay } from '@/utils';

const router = useRouter();
const getUserStore = userStore();
const getCartStore = cartStore();
const showAccountDetail = ref(false);
const showSearch = ref(false);
const showDropDown = ref(false);
const loginHandler = () => {
    showAccountDetail.value = !showAccountDetail.value;
};

const signOutHandler = async () => {
    getUserStore.signOut();

    await delay(300);
    alert('請重新登入');
    router.push('/');
};

const closeHandler = () => {
    showSearch.value = false;
};

const openSearch = () => {
    showSearch.value = true;
};

const cartCount = computed(() => {
    return getCartStore.cartTotal > 99 ? '99+' : getCartStore.cartTotal;
});
</script>
<style lang="scss" scoped>
.header {
    width: 100%;
    height: 50px;
    background: rgb(214, 185, 185);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;

    .logo-wrap {
        width: 100px;
        height: 50px;
        display: flex;
        align-items: center;
        margin-left: 10px;

        > i {
            margin: 0 5px;
            font-size: 30px;
        }
    }

    .list {
        display: flex;
        width: 300px;
        height: 50px;
        justify-content: space-between;
        align-items: center;

        .path {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            font-size: 12px;
            min-width: 60px;
            color: #333234;

            > i {
                color: #333234;
                text-align: center;
                font-size: 25px;
            }
        }
    }

    .function-icon {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 200px;
        height: 50px;

        .search {
            min-width: 20px;
            width: 20px;
            height: 20px;
            background: url('@/assets/header/search.png') 0 0 no-repeat;
            background-size: contain;
            cursor: pointer;
        }

        .login-wrap {
            min-width: 30px;
            width: 30px;
            height: 30px;
            position: relative;
            margin-right: 15px;

            .login {
                background: url('@/assets/header/user.png') 50% 50% no-repeat;
                background-size: contain;
                min-width: 20px;
                width: 20px;
                height: 30px;
                cursor: pointer;
            }

            .member-image {
                border-radius: 50%;
                background-color: #eee;
                width: 30px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: var(--loading-color);
                font-weight: bold;
            }
        }

        .cart {
            width: 20px;
            height: 20px;
            background: url('@/assets/header/cart.png') 0 0 no-repeat;
            background-size: contain;
            position: relative;
            cursor: pointer;

            .red-pot {
                position: absolute;
                min-width: 20px;
                min-height: 20px;
                font-size: 12px;
                background-color: rgb(234, 108, 108);
                color: #fff;
                border-radius: 50%;
                text-align: center;
                line-height: 20px;
                padding: 1px;
                bottom: 10px;
                left: 10px;
            }
        }
    }

    .menu-wrap {
        display: none;
        font-size: 30px;
        margin-right: 10px;
    }

    .drop-down-wrap {
        position: fixed;
        width: 100%;
        top: 50px;
        background-color: #fff;

        .drop-down {
            padding: 5px 0;
            border-bottom: 2px solid var(--block-bg-color);
        }

        .main-function {
            font-size: 18px;
            padding: 5px;
            background-color: var(--block-bg-color);
        }

        .path {
            display: flex;
            align-items: center;
            text-decoration: none;
            font-size: 12px;
            min-width: 60px;
            color: #333234;
            font-size: 16px;
            padding: 5px 10px;

            > i {
                color: #333234;
                text-align: center;
                font-size: 20px;
                margin-right: 8px;
            }
        }

        .main-function-wrap {
            .search,
            .cart,
            .login,
            .email,
            .history,
            .logout {
                padding: 10px;

                > i {
                    margin-right: 5px;
                }
            }

            .cart {
                display: flex;
                align-items: center;

                .red-pot {
                    position: relative;
                    margin-left: 10px;
                    color: #fff;
                    &::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        border-radius: 50%;
                        background-color: #f00;
                        min-width: 20px;
                        width: auto;
                        height: 20px;
                        font-size: 12px;
                        z-index: -1;
                    }
                }
            }
        }
    }
}

.list-item {
    cursor: pointer;
}

@media screen and (max-width: 767px) {
    /* 在螢幕寬度小於 767px 時使用以下 CSS 規則 */

    .header {
        .logo-wrap {
            .logo-name {
                display: none;
            }
        }

        .list {
            display: none;
        }

        .function-icon {
            display: none;
        }

        .menu-wrap {
            display: block;
        }
    }
}
</style>
