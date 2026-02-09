<template>
    <div class="footer-wrap">
        <div class="text">
            <div class="title">聯絡我們</div>
            <div class="content">
                <div>
                    如果您對手工甜點或訂單有任何疑問，歡迎隨時與我們聯繫。
                </div>
                <div class="item">電話: (04) 2345-6789</div>
                <div class="item">信箱: service@bakery-lab.com</div>
                <div class="item">地址: 台中市大里區國光路三段77巷888號</div>
            </div>
        </div>

        <div class="text">
            <div class="title">安心承諾</div>
            <div class="content">
                <div>嚴选自然食材，百分之百手工製作。</div>
                <div>無添加人工防腐劑與色素。</div>
                <div>每日新鮮烘焙，限量供應。</div>
                <div>我們深信，好的食材能說出最動人的故事。</div>
            </div>
        </div>

        <div class="text">
            <div class="title">營業時間</div>
            <div class="content">
                <div>週一至週五：09:00 - 20:00</div>
                <div>週六：10:00 - 18:00</div>
                <div>週日與國定假日：公休</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.footer-wrap {
    max-width: 100%;
    display: flex;
    padding: 20px;
    margin: 0 auto;
    background: #eee;
    position: relative;

    .text {
        flex: 1 1 33%;
        display: flex;
        margin: 0 10px;
        align-content: center;
        flex-direction: column;
        text-align: center;
    }

    .title {
        margin-bottom: 10px;
    }

    .content {
        font-size: 12px;
        line-height: 18px;
    }
}
</style>
