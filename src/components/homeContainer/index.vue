<template>
    <div class="home-container">
        <div class="feature">
            <div class="title">特色介紹</div>
            <div class="feature-wrap">
                <div class="item" v-for="(item, index) in feature" :key="index">
                    <i :class="['mdi', item.icon, item.key]" />
                    <div class="item-title">{{ item.title }}</div>
                    <div class="content">{{ item.content }}</div>
                </div>
            </div>
        </div>

        <div class="hot-products">
            <div class="title-wrap">
                <div class="title"><i class="mdi mdi-fire" />熱門商品</div>
            </div>
            <div class="item">
                <swiper 
                    :spaceBetween="20"
                    :loop="true"
                    :modules="modules"
                    :breakpoints="{
                        0: { slidesPerView: 1 },
                        854: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }"
                    :navigation="true"
                >
                    <swiper-slide
                        v-for="(i, index) of hotGoods"
                        :key="index"
                        class="swiper-slide"
                        @click="goProduct(i)"
                    >
                        <div class="custom-image">
                            <img :src="getImage(`goods/${i.image}`)" />
                        </div>
                        <div class="text-wrap">
                            <div class="title">{{ i.name }}</div>
                            <div class="text">價格: ${{ i.price }}</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="news">
            <div class="title">最新消息</div>
            <div class="news-wrap">
                <div class="item" v-for="i in newsListResult">
                    <div class="content">
                        <div class="date">{{ i.date }}</div>
                        <div class="item-title">{{ i.title }}</div>
                    </div>
                    <div @click="goNewsDetail(i)" class="news-button">
                        查看詳情
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { feature } from './dataType';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Scrollbar, Navigation } from 'swiper';
import { goodsStore } from '@/store/goods';
import { newsStore } from '@/store/news';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { Goods, News } from '@/store/types';
import { getImage } from '@/utils';

const router = useRouter();
const modules = [Scrollbar, Navigation];
const storeGoods = goodsStore();
const storeNews = newsStore();
const { goods } = storeToRefs(storeGoods);
const { newsListResult } = storeToRefs(storeNews);

const feature: feature[] = reactive([
    {
        key: 'ingredient',
        icon: 'mdi-egg-outline',
        title: '嚴選在地食材',
        content:
            '堅持使用產地直送土雞蛋與天然奶油，不添加人工香料，讓您吃得安心無負擔。',
    },
    {
        key: 'manual',
        icon: 'mdi-pot-mix',
        title: '職人手工製作',
        content:
            '每一份點心皆由職人親手揉製，精準掌控烘焙溫度，保留最純粹的手作溫度與口感。',
    },
    {
        key: 'delivery',
        icon: 'mdi-truck-outline',
        title: '每日新鮮出爐',
        content:
            '下單後才排單製作，搭配低溫物流快速配送，確保您收到的每一份心意都是最佳賞味期。',
    },
]);

/**
 * 熱門商品前5個
 */
const hotGoods = computed(() =>
    goods.value.sort((a, b) => b.saleCount - a.saleCount).slice(0, 5),
);

/**
 * 去商品頁面
 * @param {object} item - 點選該熱門項目
 */
const goProduct = (item: Goods) => {
    router.push({
        path: '/product',
        query: { id: item.id },
    });
};

const goNewsDetail = (item: News) => {
    storeNews.setNewsData(item);
    router.push('/news');
};

onMounted(async () => {
    await storeGoods.readGoodsList();
    await storeNews.getNewList();
});
</script>

<style lang="scss" scoped>
.home-container {
    width: 100%;
    width: 80%;
    margin: 0 auto;

    .title {
        text-align: center;
        font-size: 24px;
        padding: 10px 0;
    }

    .feature {
        width: 100%;
        text-align: center;
        padding: 60px 0;
        border-bottom: 1px solid #ddd;

        .feature-wrap {
            display: flex;
            justify-content: space-around;
            width: 100%;
            flex-wrap: wrap;

            .item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 200px;
                margin: 10px;

                .item-title {
                    padding: 5px 0;
                }

                .content {
                    font-size: 12px;
                    line-height: 18px;
                    word-break: break-all;
                }

                > i {
                    margin: 10px 0;
                    width: 110px;
                    font-size: 80px;
                    padding: 10px;
                    border: 2px solid;
                    border-radius: 50%;

                    &.ingredient {
                        border-color: pink;
                        color: pink;
                    }

                    &.manual {
                        border-color: #face2f;
                        color: #face2f;
                    }

                    &.delivery {
                        border-color: #63c6f0;
                        color: #63c6f0;
                    }
                }
            }
        }
    }

    .news {
        width: 100%;
        text-align: center;
        padding: 60px 0;
        border-bottom: 1px solid #ddd;

        .news-wrap {
            .item {
                min-width: 100px;
                display: flex;
                margin: 0 15px 15px 15px;
                justify-content: space-between;
                flex-wrap: wrap;

                .content {
                    display: flex;
                    margin-bottom: 5px;

                    .item-title {
                        color: #4358ad;
                        font-weight: bold;
                        font-size: 16px;
                        text-align: left;
                        line-height: 20px;
                    }

                    .date {
                        flex: 0 0 auto;
                        margin-right: 10px;
                    }
                }

                .news-button {
                    cursor: pointer;
                    border: 2px solid pink;
                    border-radius: 5px;
                    color: rgb(97, 96, 96);
                    padding: 5px;
                    font-size: 12px;
                    margin-left: auto;
                    display: inline-flex;
                    align-items: center;
                    height: 15px;
                }
            }
        }
    }

    .hot-products {
        padding: 60px 0;

        .title {
            > i {
                color: #f45d5d;
            }
        }

        .title-wrap {
            width: 100%;
            height: 40px;
            text-align: center;
            margin: 20px 0;
        }

        .swiper-wrap {
            width: 100%;
            height: 300px;
            background: #000;
            display: flex;
            align-items: center;
        }

        .swiper-slide {
            border-radius: 10px;
            font-size: 18px;
            background: #eee;
            position: relative;
            width: 100%;
            height: 400px;
            min-width: 300px;
            width: auto;

            .text-wrap {
                text-align: center;
                padding: 10px;

                .title {
                    font-weight: bold;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }

                .text {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }

            .custom-image {
                width: 300px;
                height: 300px;
                margin: 0 auto;
                padding: 10px;
                box-sizing: border-box;
                cursor: pointer;

                > img {
                    border-radius: 10px;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
