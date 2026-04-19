<template>
    <div class="contact">
        <subject-title>
            聯絡我們
            <template #extra>
                如果您對手工甜點或訂單有任何疑問，歡迎隨時與我們聯繫
            </template>
        </subject-title>
        <div class="container">
            <div class="block">
                <div class="major">
                    <i class="mdi mdi-map-marker"></i>
                    <div class="title">門市地址</div>
                </div>
                <div class="tip">
                    台中市大里區國光路三段77巷888號<br />
                    <span>(近大里國民運動中心，步行約 5 分鐘)</span>
                </div>
            </div>
            <div class="block">
                <div class="major">
                    <i class="mdi mdi-phone-classic"></i>
                    <div class="title">客服專線</div>
                </div>
                <div class="tip phone">
                    (04) 2345-6789<br />
                    <div>服務時間：週一至週五 09:00 - 18:00</div>
                </div>
            </div>
            <div class="block">
                <div class="major">
                    <i class="mdi mdi-email"></i>
                    <div class="title">電子信箱</div>
                </div>
                <div class="tip email">service@bakery-lab.com</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import subjectTitle from '@/components/subjectTitle/index.vue';
</script>
<style lang="scss" scoped>
.contact {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: center;

    .container {
        width: 100%;
        margin-bottom: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fit, 350px);
        grid-gap: 15px;
        justify-content: center;
        justify-items: center;
        padding-top: 20px;

        .block {
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            border-top: 5px solid var(--main-bg-color);
            padding: 0 20px;
            box-sizing: border-box;
            margin: 10px;
            min-width: 350px;

            .major {
                width: 100%;
                height: 100px;
                text-align: center;
                margin: 30px 0;

                .title {
                    font-size: 20px;
                    font-weight: bold;
                    padding: 10px;
                }

                > i {
                    font-size: 40px;
                    color: gray;
                }
            }

            .tip {
                color: #656464;
                text-align: center;
                font-size: 16px;
                line-height: 25px;
                padding-bottom: 10px;
            }
        }
    }
}
</style>
