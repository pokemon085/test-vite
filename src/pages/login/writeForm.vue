<template>
    <!-- 信箱 -->
    <div class="email label">
        <input class="email-input" :type="infoData.email.inputType" :placeholder="infoData.email.placeholder"
            @input="validateInput(infoData.email.name)" v-model.trim="infoData.email.value" />
        <div class="error-tip" v-show="infoData.email.value !== '' && !infoData.email.isValid">{{
            infoData.email.error
        }}</div>
    </div>
    <!-- 密碼 -->
    <div class="password label">
        <input class="password-input" :type="eye ? 'text' : infoData.password.inputType"
            :placeholder="infoData.password.placeholder" @input="validateInput(infoData.password.name)"
            v-model.trim="infoData.password.value" />
        <div :class="['eye', { open: eye }]" @click="eye = !eye" />
        <div class="error-tip" v-show="infoData.password.value !== '' && !infoData.password.isValid">{{
            infoData.password.error }}</div>
    </div>
    <!-- 確認密碼(reset/sign) -->
    <div v-if="['sign','reset'].includes(currentTab)" class="confirm-password label">
        <input class="confirm-password-input" :type="eye ? 'text' : infoData.confirm.inputType"
            :placeholder="infoData.confirm.placeholder" @input="validateInput(infoData.confirm.name)"
            v-model.trim="infoData.confirm.value" />
        <div :class="['eye', { open: eye }]" @click="eye = !eye" />
        <div class="error-tip" v-show="infoData.confirm.value !== '' && !infoData.confirm.isValid">{{
            infoData.confirm.error }}</div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
const eye = ref(false)
const props = defineProps({
    info: {
        type: Object,
        required: true
    },
    currentTab: {
        type: String,
        default: 'login'
    }
})
const emit = defineEmits(['update:infoData'])

const infoData = computed({
    get: () => props.info,
    set(val) {
        emit('update:infoData', val);
    },
});

const validateInput = (name: string) => {
    const data = infoData.value
    if (!new RegExp(data[name].regExp).test(data[name].value)) {
        data[name].isValid = false
    } else {
        if (data[name].name === 'confirm' && data[name].value !== data['password'].value) {
            data[name].isValid = true
        }
        data[name].isValid = true
    }
}

</script>
<style lang="scss">
.label {
    margin: 10px 0;
}

input {
    height: 30px;
    width: 300px;
    outline: none;
    border: 1px solid #fff;
}

input:focus {
    outline: none;
}

.confirm-password,
.password {
    position: relative;

    .eye {
        position: absolute;
        display: block;
        width: 15px;
        height: 15px;
        top: 10px;
        right: 8px;
        background: url("@/assets/account/hide.png") 100% 100% no-repeat;
        background-size: contain;

        &.open {
            background: url("@/assets/account/view.png") 100% 100% no-repeat;
            background-size: contain;
        }
    }
}

.error-tip{
    color:#fe4343;
}
</style>
