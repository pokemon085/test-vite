<template>
  <div class="home-container">
    <div class="feature-wrap">
      <div class="item" v-for="(item, index) in feature" :key="index">
        <img :src="`/src/assets/feature/${item.icon}.webp`">
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
      </div>
    </div>
    <div class="hot-products">
      <div class="title-wrap">
        <div class="tip">Add our hot products to your weekly lineup</div>
        <div class="title">OUR HOT PRODUCTS</div>
      </div>

      <div class="item">
        <swiper :spaceBetween="20" :slidesPerView="3" :centeredSlides="true" :loop="true"  :modules="modules" :navigation="true" >
          <swiper-slide v-for="(i, index) of state" :key="index" class="swiper-slide">
            <div class="custom-image">
              <img :src="`https://picsum.photos/200/200/?random=${index}`" />
            </div>
            <div class="text-wrap">
              <div class="title">{{ i.text }}</div>
              <div class="text">{{ i.content }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from 'vue'
import { feature } from './dataType';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Scrollbar, Navigation } from "swiper";


const feature: feature[] = reactive([{ icon: 'one', title: 'test1', content: 'Lorem ipsum dolor sit amet consectetur' }, { icon: 'two', title: 'test2', content: 'Aperiam exercitationem voluptatem voluptate' }, { icon: 'three', title: 'test3', content: 'labore aliquid maxime earum nihil quam beatae vel ab rerum' }])
let state = ref([
  {
    key: "a",
    text: "aaaaa",
    content: "Lorem ipsum dolor sit",
    img: "1",
  },
  {
    key: "b",
    text: "bbbbb",
    content: "amet consectetur adipisicing elit",
    img: "2",
  },
  {
    key: "c",
    text: "cccc",
    content: "amet consectetur adipisicing elit",
    img: "3",
  },
  {
    key: "d",
    text: "dddd",
    content: "amet consectetur adipisicing elit",
    img: "4",
  },
  {
    key: "e",
    text: "eee",
    content: "amet consectetur adipisicing elit",
    img: "5",
  },
  {
    key: "f",
    text: "ffff",
    content: "amet consectetur adipisicing elit",
    img: "6",
  },
  {
    key: "g",
    text: "gggg",
    content: "amet consectetur adipisicing elit",
    img: "7",
  },
  {
    key: "h",
    text: "hhh",
    content: "amet consectetur adipisicing elit",
    img: "8",
  },
  {
    key: "i",
    text: "iiii",
    content: "amet consectetur adipisicing elit",
    img: "9",
  },
]);
const modules = [Scrollbar, Navigation];

</script>

<style lang="scss">
.home-container {
  width: 100%;
  width: 80%;
  margin: 0 auto;

  .feature-wrap {
    padding: 30px 0 50px 0;
    display: flex;

    justify-content: space-around;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .content {
        width: 200px;
        font-size: 12px;
      }

      >img {
        width: 80px;
        height: 95px;
        padding: 10px 0;
      }
    }

  }

  .hot-products {
    margin: 30px auto;

    .title-wrap {
      width: 100%;
      height: 40px;
      text-align: center;
      margin: 20px 0;

      .tip {
        font-size: 14px;
        font-style: italic;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
      }
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
        padding-top:10px;
        .title {
          font-weight: bold;
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