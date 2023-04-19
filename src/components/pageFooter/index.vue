<template>
  <div class="footer-wrap">
      <div class="text">
        <div class="title">Contanct us</div>
        <div class="content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div class="item">
            <img src="https://picsum.photos/10/10/?random=10">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
          </div>
          <div class="item">
            <img src="https://picsum.photos/10/10/?random=10">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
          </div>
          <div class="item">
            <img src="https://picsum.photos/10/10/?random=10">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
          </div>
        </div>
      </div>
      <div class="text">
        <div class="title">main-menu</div>
        <div class="content">
          <p>home</p>
          <p>catalog</p>
          <p>contact us</p>
          <p>pages</p>
        </div>
      </div>
      <div class="text">
        <div class="title">open-hours</div>
        <div class="content">
          <p>Mon - Fri: 8AM - 10PM</p>
          <p>Sat: 9AM-8PM</p>
          <p>Sun: Closed</p>
          <p>National Holidays: Closed</p>
          <p>Home Delivery Service also available!</p>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {

  },
})
</script>
<style lang="scss">
.footer-wrap {
  display: flex;
  justify-content: space-evenly;
  padding:20px;
  margin: 0 auto;
  background: #eee;;
  height: 200px;

  .text {
    display: flex;
    flex-direction: column;

    .item-title {
      padding: 5px 0;
      font-size: 14px;
      font-weight: bold;
    }
    .content{
      font-size: 12px;
    }
  }
}
</style>
