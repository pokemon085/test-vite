<template>
  <div class="contact">
    <div class="title-wrap">
      <div class="title">Contact Us</div>
      <div class="tip">Have any questions? We'd love to hear from you.</div>
    </div>

    <div class="container">
      <div class="block">
          <div class="major">
            <i class="mdi mdi-map-marker"></i>
            <div class="title">
              ADDRESS
            </div>
          </div>
          <div class="tip">
            Street: 21F., NO. 447, SEC. 3<br />
            City: Wensin Rd.<br />
            State/province/area: TAICHUNG CITY<br />
            Country: Taiwan(China)<br />
          </div>
      </div>
      <div class="block">
        <div class="major">
          <i class="mdi mdi-phone-classic"></i>
          <div class="title">
            PHONE
          </div>
        </div>
        <div class="tip phone">
          Phone number: 886-4-3703-3939<br />
          Country calling code: +886<br />
        </div>
      </div>
      <div class="block">
        <div class="major">
          <i class="mdi mdi-email"></i>
          <div class="title">
            EMAIL
          </div>
        </div>
        <div class="tip email">
          dettedoweijei-2207@yopmail.com
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.contact {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;

  .title-wrap {
    width: 100%;
    height: 50px;
    text-align: center;
    margin: 20px 0;

    .title {
      font-size: 20px;
      padding: 5px 0;
      font-weight: bold;
    }

    .tip {
      font-size: 14px;
    }
  }

  .container {
    width: 100%;
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    grid-gap: 15px;
    justify-content: center;
    justify-items: center;

    .block {
      display: flex;
      flex-direction: column;
      height: 280px;
      border: 1px solid #DDD;
      border-top: 5px solid var(--main-bg-color);
      padding: 0 20px;
      box-sizing: border-box;
      margin: 10px;

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

          >i {
            font-size: 40px;
            color: gray;
          }
        }

        .tip {
          color: #999;
          text-align: center;
          font-size: 14px;

          &.email {
            font-size: 16px;
          }
        }

    }
  }
}
</style>
