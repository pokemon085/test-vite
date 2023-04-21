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
          <div class="email">
            <input class="email-input" :type="loginForm.email.inputType" :placeholder="loginForm.email.placeholder"
              @input="validateInput(loginForm.email.name)" v-model.trim="loginForm.email.value" />
            <div class="error-tip" v-show="loginForm.email.value !== '' && !loginForm.email.isValid">{{
              loginForm.email.error
            }}</div>
          </div>
          <div class="password">
            <input class="password-input" :type="loginForm.password.inputType"
              :placeholder="loginForm.password.placeholder" @input="validateInput(loginForm.password.name)"
              v-model.trim="loginForm.password.value" />
            <div :class="['eye', { open: eye }]" @click="eye = !eye" />
            <div class="error-tip" v-show="loginForm.password.value !== '' && !loginForm.password.isValid">{{
              loginForm.password.error }}</div>
          </div>
          <div class="reset" @click="reset = true">reset</div>
          <div class="button" @click="submit()">login</div>
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
        <div class="email">
          <input class="email-input" :type="signForm.email.inputType" :placeholder="signForm.email.placeholder"
            @input="validateInput(signForm.email.name)" v-model.trim="signForm.email.value" />
          <div class="error-tip" v-show="signForm.email.value !== '' && !signForm.email.isValid">{{
            signForm.email.error
          }}</div>
        </div>
        <div class="password">
          <input class="password-input" :type="signForm.password.inputType" :placeholder="signForm.password.placeholder"
            @input="validateInput(signForm.password.name)" v-model.trim="signForm.password.value" />
          <div :class="['eye', { open: eye }]" @click="eye = !eye" />
          <div class="error-tip" v-show="signForm.password.value !== '' && !signForm.password.isValid">{{
            signForm.password.error }}</div>
        </div>
        <div class="confirm-password">
          <input class="confirm-password-input" :type="signForm.confirm.inputType"
            :placeholder="signForm.confirm.placeholder" @input="validateInput(signForm.confirm.name)"
            v-model.trim="signForm.confirm.value" />
          <div :class="['eye', { open: eye }]" @click="eye = !eye" />
          <div class="error-tip" v-show="signForm.confirm.value !== '' && !signForm.confirm.isValid">{{
            signForm.confirm.error }}</div>
        </div>
        <div class="button" @click="submit()">sign</div>
      </div>

    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()
const currentTab = ref(true)
const eye = ref(false)
const reset = ref(false)


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
    placeholder: 'register.placeholder.email',
    isInput: false,
    value: '',
    regExp: /^(?=.{1,40}$)(([A-Za-z0-9.\-_]{1,})+@([A-Za-z0-9.-]{1,}))+\.[A-Za-z]+$/,
    isValid: false,
  },
  password: {
    name: 'password',
    error: 'password format error',
    inputType: 'password',
    placeholder: 'register.placeholder.password',
    isInput: false,
    value: '',
    regExp: /^[A-Za-z0-9_+-.@!@#$%^&*]{6,20}$/,
    isValid: false,
  },
  confirm: {
    name: 'confirm',
    error: 'not same as password',
    inputType: 'password',
    placeholder: 'register.placeholder.confirm',
    isInput: false,
    value: '',
    regExp: /^[A-Za-z0-9_+-.!@#$%^&*]{6,20}$/,
    isValid: false,
  },
})

const validateInput = (name: string) => {
  console.log('aa')
  const keyValue = currentTab.value ? loginForm.value : signForm.value
  if (keyValue[name].value === '') return


  if (!new RegExp(keyValue[name].regExp).test(keyValue[name].value)) {
    keyValue[name].isValid = false
  } else {
    if (keyValue[name] === 'confirm' && keyValue[name].value !== keyValue['password'].value) {
      keyValue[name].isValid = true
    }
    keyValue[name].isValid = true
  }
}
const submit = () => {
  const keyValue = currentTab.value ? loginForm.value : signForm.value

  const check = Object.keys(keyValue).every(item => {
    return keyValue[item].value !== '' && keyValue[item].isValid
  })

  if (check) {
    router.replace('/')
  }
}

</script>
<style lang="scss">
.page-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .account-wrap {
    width: 600px;
    height: 300px;
    background-color: rgb(214, 185, 185);
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;

    .tab {
      width: 100%;
      height: 40px;
      display: flex;
      text-align: center;

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
      height: 250px;
      align-self: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      input {
        height: 30px;
        border-radius: 2px;
        width: 300px;
        margin: 10px 0;
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
          width: 20px;
          height: 20px;
          top: 18px;
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
