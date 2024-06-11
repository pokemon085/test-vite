<template>
  <div class="home-container">
    <div class="feature">
      <div class="title">FEATURE</div>
      <div class="feature-wrap">
        <div class="item" v-for="(item, index) in feature" :key="index">
          <i :class="['mdi', item.icon, item.key]" />
          <div class="item-title">{{ item.title }}</div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
    </div>

    <div class="news">
      <div class="title">NEWS & EVENT</div>
      <div class="news-wrap clear-fix">
        <div class="item" v-for="i in newsListResult">
          <div class="news-image">
            <img src="https://picsum.photos/id/100/300/200" alt="">
          </div>
          <div class="content">
            <div class="item-title">Lorem ipsum dolor</div>
            <div class="date">{{ i.date }}</div>
            <div class="tip">{{ i.content }}</div>
          </div>
          <div @click="goNewsDetail(i)" class="news-button">see detail</div>
        </div>
      </div>
    </div>

    <div class="hot-products">
      <div class="title-wrap">
        <div class="title">
          <i class="mdi mdi-fire" />HOT PRODUCTS
        </div>
      </div>
      <div class="item">
        <swiper :spaceBetween="20" :slidesPerView="3" :centeredSlides="true" :loop="true" :modules="modules"
          :navigation="true">
          <swiper-slide v-for="(i, index) of hotGoods" :key="index" class="swiper-slide" @click="goProduct(i)">
            <div class="custom-image">
              <img :src="`https://picsum.photos/200/200/?random=${index}`" />
            </div>
            <div class="text-wrap">
              <div class="title">{{ i.name }}</div>
              <div class="text">price: ${{ i.money }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { feature } from './dataType';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Scrollbar, Navigation } from "swiper";
import { goodsStore } from "@/store/goods";
import { newsStore } from "@/store/news";
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import { Goods, News } from '@/store/types'

const router = useRouter()
const modules = [Scrollbar, Navigation];
const storeGoods = goodsStore()
const storeNews = newsStore()
const { goods } = storeToRefs(storeGoods)
const { newsListResult } = storeToRefs(storeNews)

const feature: feature[] = reactive([
  { key: 'ingredient', icon: 'mdi-egg-outline', title: 'test1', content: 'Lorem ipsum dolor sit amet consectetur' },
  { key: 'manual', icon: 'mdi-pot-mix', title: 'test2', content: 'Aperiam exercitationem voluptatem voluptate' },
  { key: 'delivery', icon: 'mdi-truck-outline', title: 'test3', content: 'labore aliquid maxime earum nihil quam beatae vel ab rerum' }
])

/**
 * 熱門商品前5個
 */
const hotGoods = computed(() => goods.value.sort((a, b) => b.sale - a.sale).slice(0, 5))

/**
 * 去商品頁面
 * @param {object} item - 點選該熱門項目
 */
const goProduct = (item: Goods) => {
  router.push({
    path: '/product',
    query: { id: item.id }
  })
}

const goNewsDetail = (item: News) => {
  storeNews.setNewsData(item)
  router.push('/news')
}

onMounted(async () => {
  await storeGoods.readGoodsList()
  await storeNews.getNewList()
});

</script>

<style lang="scss">
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
      width:100%;
      flex-wrap: wrap;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 200px;
        margin: 10px;

        .content {
          font-size: 12px;
          word-break: break-all;
        }

        >i {
          margin: 10px 0;
          width: 110px;
          font-size: 80px;
          padding: 10px 0;
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
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        min-width: 100px;
        margin: 0 15px 15px 15px;

        .news-image {
          margin: auto;

          >img {
            width: 100%;
            border-radius: 10px;
          }
        }

        .content {
          margin-bottom: 5px;

          .item-title {
            text-align: left;
            color: #4358ad;
            font-weight: bold;
            font-size: 16px;
          }

          .date {
            text-align: left;
          }

          .tip {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            text-align: left;
          }
        }

        .news-button {
          cursor: pointer;
          justify-self: flex-end;
          border: 2px solid pink;
          border-radius: 5px;
          display: inline-flex;
          float: right;
          color: rgb(97, 96, 96);
          padding: 0 5px;
        }

      }

    }
  }

  .hot-products {
    padding: 60px 0;

    .title {
      >i {
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
      height: 300px;

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
        width: 100%;
        height: 200px;

        >img {
          border-radius: 10px 10px 0 0;
          width: 100%;
          height: 100%;
        }
      }
    }


  }
}
</style>
