<script setup>
import { ref } from 'vue';
import Notify from './components/notify.vue';
import Announce from './components/announce.vue';

//控制tab的选中
const tabIndex = ref(0);

//tab数据
const tabMetas = ref([
  { title: '公告', rendered: true },
  { title: '任务通知', rendered: false }
]);

//监听tab切换
const changeTab = (index) => {
  tabMetas.value[index].rendered = true;
  tabIndex.value = index;
};
</script>

<template>
  <view class="page-container">
    <view class="tab">
      <view class="tab-item" v-for="(item, index) in tabMetas" :key="index" @click="changeTab(index)">
        <view class="title" :class="{ active: tabIndex === index }">{{ item.title }}</view>
      </view>
    </view>
    <view class="message-list" v-show="tabIndex === 0" v-if="tabMetas[0].rendered">
      <!-- 公告组件 -->
      <Announce></Announce>
    </view>
    <view class="message-list" v-show="tabIndex === 1" v-if="tabMetas[1].rendered">
      <!-- 任务通知组件 -->
      <Notify></Notify>
    </view>
  </view>
</template>

<style lang="scss">
@import './index.scss';
</style>
