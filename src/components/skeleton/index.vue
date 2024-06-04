<template>
    <div class="loader"></div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.loader {
    width: 100%;
    height: 100%;
    background:
        linear-gradient(90deg, #5d5c5c11 33%, #706f6f55 50%, #bcb9b911 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: l1 1s infinite linear;
}

@keyframes l1 {
    0% {
        background-position: right
    }
}
</style>

