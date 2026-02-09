<template>
    <div class="subject-title">
        <div class="title">
            <slot></slot>
        </div>
        <div class="extra">
            <slot name="extra"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.subject-title {
    text-align: center;
    padding: 10px 0;
}

.title {
    line-height: 50px;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 2px;
}

.extra {
    line-height: 20px;
    font-size: 14px;
    color: #656464;
    text-align: center;
}
</style>
