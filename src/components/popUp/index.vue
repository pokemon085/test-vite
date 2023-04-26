<template>
  <Teleport to="#container">
      <div class="popup-wrap">
        <div class="popup-container">
          <div class="icon"></div>
          <div class="title">Tip</div>
          <div class="content">
            add cart success !
          </div>
          <div class="click-wrap" @click="emit('close')">OK</div>
        </div>
      </div>
  </Teleport>

</template>
<script lang="ts" setup>
const emit = defineEmits(["close"])
</script>
<style lang="scss" scoped>

.popup-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  overflow: auto;

  .popup-container {
    width: 300px;
    max-height: 300px;
    background: #eee;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    z-index: 10;
    text-align: center;
    border-radius: 8px;

    .icon {
      width: 100%;
      height: 80px;
      background: url("@/assets/dialog/check.png") 50% 50% no-repeat;
      background-size: 50px 50px;
    }

    .title {
      font-size: 18px;
      width: 100%;
      height: 40px;
      font-weight: bold;
    }

    .content {
      font-size: 16px;
      width: 100%;
      height: 40px;
    }

    .click-wrap {
      width: 100%;
      height: 50px;
      color: var(--main-text-color);
      background-color: rgb(242, 172, 183);
      line-height: 50px;
      border-radius: 0 0 8px 8px;
      font-weight: bold;

      &:hover {
        font-size: 18px;
      }
    }
  }
}



</style>

