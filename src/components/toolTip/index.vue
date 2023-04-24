<template>
  <div class="hide-block">
    <div class="bottom">
      <div class="user">
        <slot name="user"></slot>
      </div>
      <div class="item">
        <slot name="item"></slot>
      </div>
      <i></i>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.hide-block {
  width: 30px;
  height: 100px;
  background: transparent;
  position: relative;
  top: -30px;

  &:hover {
    .bottom {
      display: block;
    }
  }
}

.bottom {
  display: none;
  min-width: 100px;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 10px;
  color: #444444;
  background-color: #eeeeee;
  font-weight: normal;
  font-size: 13px;
  border-radius: 8px;
  position: absolute;
  z-index: 99;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);

  .user {
    font-weight: bold;
    padding: 5px 0;
  }

  .item {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px 0;

    .list-item {
      width: 100px;
      height: 30px;

      &:hover {
        background: var(--text-background-color);
        border-radius: 5px;
      }
    }
  }
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
