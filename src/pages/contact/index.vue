<template>
  <div class="contact">
    <div class="title-wrap">
      <div class="title">Contact Us</div>
      <div class="tip">Have any questions? We'd love to hear from you.</div>
    </div>

    <div class="container">
      <div class="block">
        <div class="content">
          <div class="title">
            Press
          </div>
          <div class="tip">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem labore dolor inventore quos,
            assumenda nobis quidem maiores omnis! Veniam molestias atque tempora suscipit accusamus facere consequuntur
            qui, quisquam eum.
          </div>
        </div>
        <div class="button">
          Visit Press Page
        </div>
      </div>
      <div class="block">

        <div class="content">
          <div class="title">
            Help & Support
          </div>
          <div class="tip">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem labore dolor inventore quos,
            assumenda nobis quidem maiores omnis! Veniam molestias atque tempora suscipit accusamus facere consequuntur
            qui, quisquam eum.
          </div>
        </div>
        <div class="button">
          View Support Page
        </div>
      </div>
      <div class="block">
        <div class="content">
          <div class="title">
            Sales
          </div>
          <div class="tip">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem labore dolor inventore quos,
            assumenda nobis quidem maiores omnis! Veniam molestias atque tempora suscipit accusamus facere consequuntur
            qui, quisquam eum.
          </div>
        </div>
        <div class="button">
          Contact Sales
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
    // height: 400px;
    display: flex;
    // justify-content: space-around;
    // margin-top: 40px;
    flex-wrap: wrap;
    justify-content: center;

    .block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 200px;
      max-width: 300px;
      height: 300px;
      border: 1px solid #DDD;
      border-top: 5px solid var(--main-bg-color);
      padding: 0 20px;
      box-sizing: border-box;
      margin: 0 5px;


      .content {
        font-size: 14px;

        .title {
          font-size: 16px;
          font-weight: bold;
          padding: 10px;
          text-align: center;
        }

        .tip{
          color:#999;
        }
      }

      .button {
        width: 200px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: var(--main-bg-color);
        border-radius: 20px;
        margin: 15px auto;
      }
    }
  }
}
</style>
