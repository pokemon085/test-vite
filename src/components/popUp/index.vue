<template>
    <Teleport to="#container">
        <!-- 選擇對話框 -->
        <div class="popup-wrap" v-if="data.dialog">
            <div class="popup-container">
                <div class="icon">
                    <i :class="['mdi', iconType]" />
                </div>
                <div v-if="data.title !== ''" class="title">
                    {{ data.title }}
                </div>
                <div class="content" v-html="data.content" />
                <div class="dialog-button-wrap">
                    <div class="close button" @click="emit('close')">
                        {{ data.button }}
                    </div>
                    <slot />
                </div>
            </div>
        </div>
        <!-- 通知 -->
        <div class="popup-wrap" v-else>
            <div class="popup-container">
                <div class="icon">
                    <i :class="['mdi', iconType]" />
                </div>
                <div v-if="data.title !== ''" class="title">
                    {{ data.title }}
                </div>
                <div class="content" v-html="data.content" />
                <div class="click-wrap" @click="emit('close')">
                    {{ data.button }}
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script lang="ts" setup>
import { Popup } from '@/store/types';
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Object as () => Popup,
        required: true,
    },
});
const emit = defineEmits(['close']);

/**
 * icon類別
 * @returns {string} icon類別
 */
const iconType = computed<string>(() => {
    const icon = props.data.type || 'success';
    switch (icon) {
        case 'success':
            return 'mdi-check-circle-outline success';
        case 'warning':
            return 'mdi-alert-circle-outline warning';
        case 'error':
            return 'mdi-close-circle-outline error';
    }
});
</script>
<style lang="scss" scoped>
.popup-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    overflow: auto;
    z-index: var(--popup-mask-z-index);

    .popup-container {
        width: 300px;
        background: #eee;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        z-index: var(--popup-z-index);
        text-align: center;
        border-radius: 8px;

        .icon {
            padding: 10px 0;
            font-size: 60px;

            .success {
                color: #618f54;
            }

            .warning {
                color: #f48f14;
            }

            .error {
                color: #f9685b;
            }
        }

        .title {
            font-size: 18px;
            height: auto;
            font-weight: bold;
            width: 100%;
        }

        .content {
            font-size: 16px;
            width: 100%;
            min-height: 40px;
            height: auto;
            box-sizing: border-box;
            word-break: break-all;
            line-height: 24px;
            padding: 10px;
        }

        .click-wrap {
            width: 100%;
            height: 50px;
            color: var(--main-text-color);
            background-color: #f2acb7;
            line-height: 50px;
            border-radius: 0 0 8px 8px;
            font-weight: bold;
            cursor: pointer;
        }
    }
}

.dialog-button-wrap {
    display: flex;
    width: 100%;
    padding: 20px 0;
    justify-content: center;

    .close {
        padding: 5px;
        border: 1px solid;
        cursor: pointer;
        border-radius: 5px;
    }
}
</style>
