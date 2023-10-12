<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getMessage, getReadAll } from '@/api/message.js';

//判断是否显示暂无数据 false表示有数据 true没有数据
const isEmpty = ref(false);
//false表示还有数据没有加载，true则表示所有数据已经加载完成
const hasMore = ref(false);
//消息类型，200；司机端公告，201：司机端系统通知
const contentType = ref('201');

//保存任务列表
const taskList = ref([]);
//页码
const nextPage = ref(0);

//条数
const pageSize = ref(5);

//控制下拉刷新的状态，true激活下拉刷新状态 false关闭下拉刷新状态
const isTriggered = ref(false);

//获取任务通知数据
const getTaskNotifyList = async () => {
  try {
    //页码＋1
    nextPage.value += 1;
    const result = await getMessage(contentType.value, nextPage.value, pageSize.value);
    // 如果页码为1, 则设置 taskList.value 为空数组
    if (nextPage.value === 1) taskList.value = [];
    taskList.value = [...taskList.value, ...(result.data.items || [])];
    hasMore.value = nextPage.value == result.data.pages;
    isEmpty.value = taskList.value.length === 0;
  } catch (e) {
    console.log(e);
  }
};
//初始化加载
onLoad(() => {
  getTaskNotifyList();
});

const onScrollToLower = () => {
  if (hasMore.value) return;
  getTaskNotifyList();
};

const onRefresh = async () => {
  //激活下拉刷新状态
  isTriggered.value = true;
  //重置页码
  nextPage.value = 0;
  //请求数据
  await getTaskNotifyList();
  //关闭刷新状态
  isTriggered.value = false;
};

//监听全部已读
const handleAllRead = async () => {
  try {
    const result = await getReadAll(contentType.value);
    nextPage.value = 0;
    getTaskNotifyList();
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <scroll-view
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresh"
    refresher-enabled
    @scrolltolower="onScrollToLower"
    scroll-y="true"
    class="scroll-view"
    background="#f4f4f4;"
  >
    <view class="scroll-view-wrapper">
      <view class="message-action" @click="handleAllRead">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-card :is-shadow="false" v-for="(item, index) in taskList" :key="index">
        <view class="brief">{{ item.content }}</view>
        <view class="extra">
          <text class="time">{{ item.created }}</text>
          <navigator class="link" url="/subpkg_message/content/index">查看详情</navigator>
        </view>
        <template v-slot:title>
          <view class="title" :class="{ unread: item.isRead === 0 }">
            {{ item.title }}
          </view>
        </template>
      </uni-card>
      <view class="tips" v-if="hasMore">已经到达底部了</view>
    </view>
    <view v-if="isEmpty" class="message-blank">暂无消息</view>
  </scroll-view>
</template>

<style lang="scss">
@import './styles.scss';
</style>
