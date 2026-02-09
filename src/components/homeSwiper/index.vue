<template>
    <div class="swiper-wrap">
        <swiper
            :slidesPerView="1"
            :spaceBetween="30"
            :loop="true"
            :pagination="{
                clickable: true,
            }"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide class="swiper-slide">
                <div class="custom-image">
                    <img src="@/assets/carousel/carousel_1.jpg" />
                </div>
                <div class="text-wrap">
                    <div class="title">生活感與儀式感</div>
                    <div class="text">陪你度過每個微甜午後</div>
                </div>
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <div class="custom-image">
                    <img src="@/assets/carousel/carousel_2.jpg" />
                </div>
                <div class="text-wrap">
                    <div class="title">手作與溫度</div>
                    <div class="text">職人手作的純粹滋味</div>
                </div>
            </swiper-slide>
            <swiper-slide class="swiper-slide">
                <div class="custom-image">
                    <img src="@/assets/carousel/carousel_3.jpg" />
                </div>
                <div class="text-wrap">
                    <div class="title">美味與愜意</div>
                    <div class="text">陽光，草地，與一口好滋味</div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Autoplay, Pagination],
        };
    },
};
</script>

<style lang="scss" scoped>
.swiper-wrap {
    width: 100%;
    height: 350px;
    background: #000;
    display: flex;
    align-items: center;
}

.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    border-radius: 10px;
    font-size: 18px;
    background: #000;
    position: relative;
    width: 100%;

    .text-wrap {
        position: absolute;
        bottom: 15px;
        left: 30px;
        color: #fff;

        .title {
            font-weight: bold;
        }
    }

    .custom-image {
        width: 100%;
        // height: 200px;

        > img {
            width: 100%;
            height: 100%;
        }
    }

    .page-number {
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        color: #fff;
        min-width: 60px;
        height: 30px;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.6);
    }
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper {
    margin-left: auto;
    margin-right: auto;
}
</style>
