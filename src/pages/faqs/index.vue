<template>
    <subject-title>常見問題</subject-title>
    <div class="faqs-wrap">
        <div class="item" v-for="i in faqs" :key="i.id">
            <dropdown :item="i" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import dropdown from './dropdown.vue';
import subjectTitle from '@/components/subjectTitle/index.vue';

const faqs = [
    {
        id: 1,
        title: '什麼時候可以下單訂購？',
        content:
            '為了確保食材新鮮與製作品質，我們每週三 08:00 開放當週限量預購，並於週五 23:00 結單。結單後，職人們會根據訂單量採購最新鮮的食材，並從零開始手工揉製、烘焙您的甜點。',
    },
    {
        id: 2,
        title: '下單後什麼時候可以收到商品？',
        content:
            '所有訂單將於隔週週一統一出貨或開放取貨。店內取貨時間為 16:00 - 18:00，低溫宅配則預計於 16:00 - 19:00 間送達。若有特殊配送需求，歡迎於下單時備註告知。',
    },
    {
        id: 3,
        title: '有最低訂購金額限制嗎？',
        content:
            '店內取貨不設最低消費金額，即使是一份馬卡龍我們也誠摯歡迎。若需要配送服務，為維護低溫物流品質，訂單總額需滿 NT$600 方能安排出貨。',
    },
    {
        id: 4,
        title: '宅配費用如何計算？',
        content:
            '全館消費滿 NT$1,500 即可享有免費低溫宅配服務（限台灣本島）。若訂單未達免運門檻，我們將酌收 NT$160 的冷藏物流處理費，確保甜點在運送過程中維持最佳口感。',
    },
    {
        id: 5,
        title: '收到馬卡龍或果醬後該如何保存？',
        content:
            '【馬卡龍】建議冷藏可保存 3-5 天，冷凍可保存 2 週，食用前室溫回溫 10 分鐘口感最佳。【手工果醬】未開封可冷藏保存 3 個月，開封後請務必冷藏並於 1 個月內食用完畢。',
    },
];
</script>
<style lang="scss" scoped>
.faqs-wrap {
    width: 80%;
    padding: 20px;
    margin: auto;

    .item {
        margin-bottom: 15px;
    }
}
</style>
