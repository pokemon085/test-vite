<template>
  <Teleport to="#container">
    <div class="popup-wrap">
      <div class="popup-container">
        <div class="icon">
          <i :class="['mdi', iconType]" />
        </div>
        <div v-if="data.title!==''" class="title">{{ data.title }}</div>
        <div class="content">
          {{ data.content }}
        </div>
        <div class="click-wrap" @click="emit('close')">{{ data.button }}</div>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import { Popup } from '@/store/types'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object as () => Popup,
    required: true
  }
})
const emit = defineEmits(["close"])

/**
 * icon類別
 * @returns {string} icon類別
 */
const iconType = computed<string>(() => {
  const icon = props.data.type || 'success'
  switch (icon) {
    case 'success':
      return 'mdi-check-circle-outline success'
    case 'warning':
      return 'mdi-alert-circle-outline warning'
    case 'error':
      return 'mdi-close-circle-outline error'
  }
})
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
      padding:10px 0;
      font-size: 60px;
      .success{
        color:#618f54;
      }

      .warning{
        color:#f48f14;
      }

      .error{
        color:#f9685b;
      }
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
      background-color: #f2acb7;
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

