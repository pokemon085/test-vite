<template>
  <div class="page-wrap">
    <div class="account-wrap">
      <div class="tab">
        <div :class="['button', { active: currentTab }]" @click="currentTab = true">LOGIN</div>
        <div :class="['button', { active: !currentTab }]" @click="currentTab = false">SIGN</div>
      </div>
      <div class="form" v-if="currentTab">
        <template v-if="!reset">
          <!-- login -->
          <div class="email label">
            <input class="email-input" :type="loginForm.email.inputType" :placeholder="loginForm.email.placeholder"
              @input="validateInput(loginForm.email.name)" v-model.trim="loginForm.email.value" />
            <div class="error-tip" v-show="loginForm.email.value !== '' && !loginForm.email.isValid">{{
              loginForm.email.error
            }}</div>
          </div>
          <div class="password label">
            <input class="password-input" :type="eye ? 'text' : loginForm.password.inputType"
              :placeholder="loginForm.password.placeholder" @input="validateInput(loginForm.password.name)"
              v-model.trim="loginForm.password.value" />
            <div :class="['eye', { open: eye }]" @click="eye = !eye" />
            <div class="error-tip" v-show="loginForm.password.value !== '' && !loginForm.password.isValid">{{
              loginForm.password.error }}</div>
          </div>
          <div class="reset" @click="reset = true">reset</div>
          <div class="button" @click="submitLogin()">login</div>
        </template>
        <template v-else>
          <!-- reset -->
          <div class="reset-wrap">
            <div class="title">RESET YOUR PASSWORD</div>
            <div class="tip">We will send you an email to reset your password.</div>
            <input class="email-input" type="text" placeholder="email">
            <div class="submit">submit</div>
          </div>
          <div @click="reset = false">back to login</div>
        </template>
      </div>
      <div class="form" v-if="!currentTab">
        <!-- sign -->
        <div class="email label">
          <input class="email-input" :type="signForm.email.inputType" :placeholder="signForm.email.placeholder"
            @input="validateInput(signForm.email.name)" v-model.trim="signForm.email.value" />
          <div class="error-tip" v-show="signForm.email.value !== '' && !signForm.email.isValid">{{
            signForm.email.error
          }}</div>
        </div>
        <div class="password label">
          <input class="password-input" :type="eye ? 'text' : signForm.password.inputType"
            :placeholder="signForm.password.placeholder" @input="validateInput(signForm.password.name)"
            v-model.trim="signForm.password.value" />
          <div :class="['eye', { open: eye }]" @click="eye = !eye" />
          <div class="error-tip" v-show="signForm.password.value !== '' && !signForm.password.isValid">{{
            signForm.password.error }}</div>
        </div>
        <div class="confirm-password label">
          <input class="confirm-password-input" :type="eye ? 'text' : signForm.confirm.inputType"
            :placeholder="signForm.confirm.placeholder" @input="validateInput(signForm.confirm.name)"
            v-model.trim="signForm.confirm.value" />
          <div :class="['eye', { open: eye }]" @click="eye = !eye" />
          <div class="error-tip" v-show="signForm.confirm.value !== '' && !signForm.confirm.isValid">{{
            signForm.confirm.error }}</div>
        </div>
        <div class="button" @click="submitSign()">sign</div>
      </div>
    </div>
    <loading v-show="showLoading" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import loading from '@/components/loading/index.vue'
import { userStore } from '@/store/user'
import { User } from "@/store/types";
const emit = defineEmits(['updateAccount'])
const router = useRouter()
const currentTab = ref(true)
const eye = ref(false)
const reset = ref(false)
const showLoading = ref(false)
const getUserStore = userStore()

const loginForm: any = ref({
  email: {
    name: 'email',
    inputType: 'text',
    placeholder: 'Email',
    error: 'email format error',
    isInput: false,
    regExp: /^(?=.{1,40}$)(([A-Za-z0-9.\-_]{1,})+@([A-Za-z0-9.-]{1,}))+\.[A-Za-z]+$/,
    value: '',
    isValid: false,
  },
  password: {
    name: 'password',
    inputType: eye.value ? 'text' : 'password',
    placeholder: 'Password',
    error: 'password format error',
    isInput: false,
    regExp: /^[A-Za-z0-9_+-.@!@#$%^&*]{6,20}$/,
    value: '',
    isValid: false,
  },
})

const signForm: any = ref({
  email: {
    name: 'email',
    error: 'email format error',
    inputType: 'text',
    placeholder: 'Email',
    isInput: false,
    value: '',
    regExp: /^(?=.{1,40}$)(([A-Za-z0-9.\-_]{1,})+@([A-Za-z0-9.-]{1,}))+\.[A-Za-z]+$/,
    isValid: false,
  },
  password: {
    name: 'password',
    error: 'password format error',
    inputType: 'Password',
    placeholder: 'Password',
    isInput: false,
    value: '',
    regExp: /^[A-Za-z0-9_+-.@!@#$%^&*]{6,20}$/,
    isValid: false,
  },
  confirm: {
    name: 'confirm',
    error: 'not same as password',
    inputType: 'password',
    placeholder: 'Password Again',
    isInput: false,
    value: '',
    regExp: /^[A-Za-z0-9_+-.!@#$%^&*]{6,20}$/,
    isValid: false,
  },
})

const validateInput = (name: string) => {
  const keyValue = currentTab.value ? loginForm.value : signForm.value
  if (keyValue[name].value === '') return


  if (!new RegExp(keyValue[name].regExp).test(keyValue[name].value)) {
    keyValue[name].isValid = false
  } else {

    if (keyValue[name].name === 'confirm' && keyValue[name].value !== keyValue['password'].value) {
      keyValue[name].isValid = true
    }
    keyValue[name].isValid = true
  }
}
const submitLogin = () => {

  const check = Object.keys(loginForm.value).every(item => {
    return loginForm.value[item].value !== '' && loginForm.value[item].isValid
  })

  if (check) {
    const params: User = {
      email: loginForm.value['email'].value,
      password: loginForm.value['password'].value,
    }
    const isMember = getUserStore.checkLogin(params)

    if (isMember) {
      showLoading.value = true
      emit('updateAccount', check)
      setTimeout(() => {
        showLoading.value = false
        router.replace('/')
      }, 3000);
    } else {
      alert('not user')
    }
  } else {
    alert('欄位不得為空')
  }
}

const submitSign = () => {
  showLoading.value = true
  const check = Object.keys(signForm.value).every(item => {
    return signForm.value[item].value !== '' && signForm.value[item].isValid
  })

  if (check) {
    const params: User = {
      email: signForm.value['email'].value,
      password: signForm.value['password'].value,
    }
    const hasSignIn = getUserStore.findUser(params)

    if (hasSignIn) {
      alert('已註冊過')
    } else {
      getUserStore.saveUserData(params)
      alert('註冊成功,請重新登入')
      setTimeout(() => {
        currentTab.value = true
        showLoading.value = false
      }, 3000);
    }


  }
}

</script>
<style lang="scss">
.page-wrap {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  .account-wrap {
    width: 600px;
    height: 350px;
    background-color: rgb(214, 185, 185);
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;

    .tab {
      width: 100%;
      height: 50px;
      display: flex;
      text-align: center;
      line-height: 30px;

      .button {
        width: 50%;
        padding: 10px;
        background: #eee;

        &.active {
          background: #d0c4c4;
        }
      }
    }

    .form {
      // background: #daedf7;
      width: 80%;
      height: 350px;
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .label {
        margin: 10px 0;
      }

      input {
        height: 30px;
        width: 300px;

        outline: none;
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
    }
  }


}
</style>
