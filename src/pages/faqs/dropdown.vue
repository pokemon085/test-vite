<template>
    <div class="title-wrap" @click="toggle">
        <div class="title">Q: {{ item.title }} </div>
        <i :class="['mdi', `${isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'}`]"></i>
    </div>
    <div class="item-wrap" :style="{ height: `${wrapperHeight}px` }" :class="{ open: isOpen }" id="wrapper">
        <div ref="list">
            A: {{ item.content }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
    item: {
        type: Object,
        default: ''
    }
})

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
.title-wrap {
    background-color: #ccc;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

.item-wrap {
    background: #ccc;
    overflow: hidden;
    padding: 0 5px;
    transition: height .2s linear;
}
</style>
