<template>
    <div class="title-wrap" @click="toggle">
        <div class="title">問題: {{ item.title }}</div>
        <i
            :class="[
                'mdi',
                `${isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'}`,
            ]"
        ></i>
    </div>
    <div
        class="item-wrap"
        :style="{ height: `${wrapperHeight}px` }"
        :class="{ open: isOpen }"
        id="wrapper"
    >
        <div ref="list" class="list">
            {{ item.content }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
    item: {
        type: Object,
        default: '',
    },
});

const list = ref<HTMLElement>();
const isOpen = ref<Boolean>(false);
const wrapperHeight = ref<Number>(0);

const toggle = () => {
    if (isOpen.value) {
        isOpen.value = false;
        wrapperHeight.value = 0;
    } else {
        isOpen.value = true;
        wrapperHeight.value = list.value!.offsetHeight || 0;
    }
};
</script>
<style lang="scss" scoped>
$background-color: var(--block-bg-color);
.title-wrap {
    background-color: $background-color;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
}

.item-wrap {
    background: $background-color;
    overflow: hidden;
    padding: 0px 5px;
    transition: height 0.2s linear;
    font-size: 14px;
    line-height: 18px;

    .list {
        padding: 10px 0;
    }
}
</style>
