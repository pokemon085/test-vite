<template>
  <div class="page-wrap">
    <div class="account-wrap">
      <div class="tab">
        <div :class="['button', { active: currentTab }]" @click="switchTab(true)">LOGIN</div>
        <div :class="['button', { active: !currentTab }]" @click="switchTab(false)">SIGN</div>
      </div>
      <div class="form" v-if="currentTab">
        <template v-if="!reset">
          <!-- login -->
          <write-form v-model:info="loginForm" current-tab="login" />
          <div class="login-button-wrap">
            <div class="reset" @click="reset = true">
              <i class="mdi mdi-lock-reset" />forget password
            </div>
            <div class="login" @click="submitLogin()">
              <i class="mdi mdi-account" />login
            </div>
          </div>
        </template>
        <template v-else>
          <!-- reset -->
          <write-form v-model:info="resetPasswordForm" current-tab="reset" />
          <div class="reset-button-wrap">
            <div class="reset" @click="submitForget"><i class="mdi mdi-cached" />reset</div>
            <div class="login" @click="reset = false"><i class="mdi mdi-subdirectory-arrow-right" />back to login</div>
          </div>
        </template>
      </div>
      <div class="form" v-if="!currentTab">
        <!-- sign -->
        <write-form v-model:info="signForm" current-tab="sign" />
        <div class="sign" @click="submitSign()">
          <i class="mdi mdi-account-plus" />sign
        </div>
      </div>
    </div>
    <loading v-show="showLoading" />
    <pop-up v-if="showPopup" @close="showPopup = false" :data="popupData" />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import loading from '@/components/loading/index.vue'
import { userStore } from '@/store/user'
import { User, LoginForm, SignForm, ResetPasswordForm, Popup } from "@/store/types";
import writeForm from './writeForm.vue'
import popUp from "@/components/popUp/index.vue"
const router = useRouter()
const currentTab = ref(true)
const eye = ref(false)
const reset = ref(false)
const showLoading = ref(false)
const getUserStore = userStore()
const showPopup = ref(false)
const popupData = reactive<Popup>({ title: '', content: '', button: 'ok', type: 'success' })

//登入表單
const loginForm = ref<LoginForm>({
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

//註冊表單
const signForm = ref<SignForm>({
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

//忘記密碼表單
const resetPasswordForm = ref<ResetPasswordForm>({
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
    placeholder: 'New Password',
    isInput: false,
    value: '',
    regExp: /^[A-Za-z0-9_+-.@!@#$%^&*]{6,20}$/,
    isValid: false,
  },
  confirm: {
    name: 'confirm',
    error: 'not same as password',
    inputType: 'password',
    placeholder: 'New Password Again',
    isInput: false,
    value: '',
    regExp: /^[A-Za-z0-9_+-.!@#$%^&*]{6,20}$/,
    isValid: false,
  },
})

/**
 * 檢查輸入欄位是否為空
 * @param formData
 */
const fieldEmpty = (formData: LoginForm | SignForm | ResetPasswordForm): boolean => {
  return Object.values(formData).every(field => field.value !== '' && field.isValid);
}

/**
 * 送出登入
 */
const submitLogin = (): void => {
  showLoading.value = true
  const formValue = loginForm.value
  const result = fieldEmpty(formValue)
  if (!result) {
    popupData.content = '欄位不得為空'
    popupData.type = 'warning'
    showPopup.value = true
    showLoading.value = false
    return;
  }

  const params: User = {
    email: formValue['email'].value,
    password: formValue['password'].value,
  }
  const isMember = getUserStore.checkLogin(params)

  if (isMember) {
    showLoading.value = true
    setTimeout(() => {
      showLoading.value = false
      router.replace('/')
    }, 3000);
  } else {
    popupData.content = '無這個使用者'
    popupData.type = 'error'
    showPopup.value = true
  }

}

/**
 * 送出註冊
 */
const submitSign = (): void => {
  showLoading.value = true
  const formValue = signForm.value
  const result = fieldEmpty(formValue)
  if (!result) {
    popupData.content = '欄位不得為空'
    popupData.type = 'warning'
    showLoading.value = false
    return;
  }

  const params: User = {
    email: formValue['email'].value,
    password: formValue['password'].value,
  }
  const hasSignIn = getUserStore.findUser(params)

  if (hasSignIn) {
    popupData.content = '已註冊過'
    popupData.type = 'warning'
    showPopup.value = true
  } else {
    getUserStore.saveUserData(params)
    popupData.content = '註冊成功,請重新登入'
    popupData.type = 'success'
    showPopup.value = true
    setTimeout(() => {
      currentTab.value = true
      showLoading.value = false
    }, 3000);
  }

}

/**
 * 送出更改密碼
 */
const submitForget = async (): Promise<void> => {
  try {
    showLoading.value = true;
    const formValue = resetPasswordForm.value
    const result = fieldEmpty(formValue)
    if (!result) {
      popupData.content = '欄位不得為空'
      popupData.type = 'warning'
      showPopup.value = true
      showLoading.value = false
      return;
    }

    const params = {
      email: formValue.email.value,
      password: formValue.password.value,
    };

    const submitResult = await getUserStore.forgetPassword(params);

    if (submitResult === 'error') {
      popupData.content = '找不到email'
      popupData.type = 'warning'
      showPopup.value = true
    } else {
      popupData.content = '修改成功,請重新登入'
      popupData.type = 'success'
      showPopup.value = true
      reset.value = false;
      currentTab.value = true;
    }
  } catch (err) {
    console.log(err);
  } finally {
    showLoading.value = false;
  }
}

const switchTab = (key: boolean) => {
  currentTab.value = key
  reset.value = false
}

</script>
<style lang="scss" scoped>
.page-wrap {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  .account-wrap {
    width: 600px;
    height: 350px;
    background-color: #efd7d7;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;

    .tab {
      width: 100%;
      height: 50px;
      display: flex;
      text-align: center;
      line-height: 30px;
      font-size: 14px;

      .button {
        width: 50%;
        padding: 10px;
        background: #f9f7f7;

        &.active {
          background: #f2e3e3;
          font-weight: bold;
          font-size: 16px;
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
    }
  }


}


@mixin submit-button {
  height: 35px;
  border: 1px solid #fff;
  color: #fff;
  padding: 0 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #fa96a7;
  font-size: 16px;
  @content;

  &:hover {
    transform: scale(1.05);
  }

  >i {
    margin-right: 5px;
  }
}


.reset {
  @include submit-button {
    background-color: #82a3e4d6;
    margin-right: 20px;
  }
}

.login {
  @include submit-button
}

.sign {
  @include submit-button {
    margin-top: 20px;
  }
}

.login-button-wrap {
  display: flex;
  margin-top: 20px;
}

.reset-button-wrap {
  display: flex;
  margin-top: 20px;
}
</style>
