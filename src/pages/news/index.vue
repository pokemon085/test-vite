<template>
    <div class="news-wrap">
        <div class="news-content-wrap">
            <i @click="router.back()" class="mdi mdi-arrow-left-circle back"></i>
            <div class="image-banner">
                <img src="https://picsum.photos/id/10/1000/200" alt="">
            </div>
            <div class="title">{{ news.name }}</div>
            <div class="news-content">{{ news.content }}</div>
            <div class="news-date">{{ news.date }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia';
import { newsStore } from "@/store/news";
import { useRouter } from "vue-router";

const router = useRouter()
const storeNews = newsStore()
const { news } = storeToRefs(storeNews)

onBeforeMount(async () => {
    await storeNews.readNewsDetail()
    if (Object.keys(news.value).length === 0) {
        router.replace('/')
    }
})

onBeforeUnmount(() => {
    storeNews.setNewsData({})
})


</script>

<style lang="scss" scoped>
.news-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    .news-content-wrap {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .back {
            font-size: 30px;
            align-self: flex-start;
            cursor: pointer;
        }

        .image-banner {
            width: 100%;

            >img {
                width: 100%;
            }
        }

        .title {
            font-weight: bold;
            font-size: 20px;
            padding: 10px 0;
        }

        .news-date {
            padding: 10px 0;
            align-self: flex-end;
        }
    }
}
</style>
