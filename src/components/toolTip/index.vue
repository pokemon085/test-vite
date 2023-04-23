<template>
  
  <div class="bottom">
    <slot name="user"></slot>
    <slot name="item" />
    <i></i>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bottom {
  display: block;
  min-width: 100px;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 20px;
  color: #444444;
  background-color: #eeeeee;
  font-weight: normal;
  font-size: 13px;
  border-radius: 8px;
  position: absolute;
  z-index: 99;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}

.bottom i {
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -12px;
  width: 24px;
  height: 12px;
  overflow: hidden;
}

.bottom i::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  left: 50%;
  transform: translate(-50%, 50%) rotate(45deg);
  background-color: #eeeeee;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}
</style>
