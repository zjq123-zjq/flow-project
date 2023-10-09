<script setup>
import { ref } from 'vue';
import { login } from '@/api/user.js';
import { useUserStore } from '@/stores/user.js';
import { onLoad } from '@dcloudio/uni-app';

const store = useUserStore();
const accountForm = ref();

const formData = ref({
  account: '',
  password: ''
});

//回调地址
const redirectURL = ref('');
//跳转方式
const routeType = ref('');

onLoad((e) => {
  redirectURL.value = e.redirectURL;
  routeType.value = e.routeType;
});

const accountRules = ref({
  account: {
    rules: [
      {
        required: true,
        errorMessage: '请输入登录账号'
      },
      {
        pattern: /^[a-zA-Z0-9]{6,8}$/,
        errorMessage: '登录账号格式不正确'
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: '请输入登录密码'
      },
      {
        pattern: /^\d{6}$/,
        errorMessage: '登录密码格式不正确'
      }
    ]
  }
});

const onFormSubmit = async () => {
  try {
    const formData = await accountForm.value.validate();
    const res = await login(formData);
    console.log(res);
    if (res.data) store.token = res.data;
    uni[routeType.value]({
      url: redirectURL.value
    });
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <uni-forms ref="accountForm" :rules="accountRules" :modelValue="formData" class="uni-form">
    <uni-forms-item name="account">
      <input placeholder-style="color:#818181" type="text" v-model="formData.account" placeholder="请输入账号" />
    </uni-forms-item>
    <uni-forms-item name="password">
      <input placeholder-style="color:#818181" type="password" v-model="formData.password" placeholder="请输入密码" />
    </uni-forms-item>
  </uni-forms>
  <button @click="onFormSubmit" :class="formData.account === '' || formData.password === '' ? 'disabled' : ''" class="submit-button">登录</button>
</template>

<style lang="scss">
.uni-form {
  .uni-forms-item {
    height: 100rpx;
    margin-bottom: 20rpx !important;
    border-bottom: 2rpx solid #eee;
    box-sizing: border-box;
    ::v-deep .uni-forms-item__content {
      display: flex;
      align-items: center;
    }
    ::v-deep input {
      width: 100%;
      font-size: $uni-font-size-base;
      color: $uni-secondary-text-color;
    }
  }
  ::v-deep .uni-forms-item__error {
    width: 100%;
    padding-top: 10rpx;
    border-top: 2rpx solid $uni-main-color;
    color: $uni-main-color;
    font-size: $uni-font-size-small;
    transition: none;
  }
}

.submit-button {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  border: none;
  background: $uni-main-color;
  border-radius: 49.54rpx;
  margin-top: 80rpx;
  font-size: $uni-font-size-big;
  color: $uni-white-color;
}

.disabled {
  background-color: #fadcd9;
  color: $uni-white-color;
}
</style>
