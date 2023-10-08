<script setup>
import { ref } from 'vue';
import Account from './components/account.vue';
import Mobile from './components/mobile.vue';

const tabIndex = ref(0);

const tabMetas = ref([
  {
    title: '账号登录',
    subTitle: '手机号登录'
  },
  {
    title: '手机号登录',
    subTitle: '账号登录'
  }
]);

const changeLoginType = () => {
  tabIndex.value = Math.abs(tabIndex.value - 1);
};
</script>

<template>
  <view class="user-login">
    <view class="login-type">
      <text class="title">{{ tabMetas[tabIndex].title }}</text>
      <view class="type" @click="changeLoginType">
        <text class="">{{ tabMetas[tabIndex].subTitle }}</text>
        <text class="iconfont icon-caret"></text>
      </view>
    </view>

    <Account v-if="tabIndex === 0"></Account>
    <Mobile v-else></Mobile>
  </view>
</template>

<style lang="scss">
@import './index.scss';
</style>
