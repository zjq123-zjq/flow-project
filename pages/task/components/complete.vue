<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTasks } from '@/api/task.js';

//保存请求到的任务列表数据
const taskList = ref([]);

//请求的参数
const requestParams = ref({
  //页码
  page: 0,
  pageSize: 5,
  // 作业状态，1为待提货）、2为在途(在途和已交付)、3为改派、5为已作废、6为已完成（已回车登记）
  status: 6
});

//下拉刷新状态 false 未加载完成 true 全部已加载完
const isTriggered = ref(false);

// 数据是否加载完毕 false 未加载完成 true全部已加载完
const hasMore = ref(false);

// 控制是否显示暂无数据状态 false 不显示 true显示
const isEmpty = ref(false);

// 获取任务列表
const getTaskList = async () => {
  try {
    requestParams.value.page++;

    const result = await getTasks(requestParams.value);

    if (requestParams.value.page === 1) taskList.value = [];

    taskList.value = [...taskList.value, ...(result.data.items || [])];

    hasMore.value = requestParams.value.page == result.data.pages;

    isEmpty.value = taskList.value.length <= 0;
  } catch (e) {
    console.log(e);
  }
};

// 初始化加载
onLoad(() => {
  getTaskList();
});

// 监听上拉加载
const onScrollToLower = () => {
  if (hasMore.value) return;
  getTaskList();
};

// 监听下拉刷新
const onRefresh = async () => {
  isTriggered.value = true;
  requestParams.value.page = 0;
  await getTaskList();
  isTriggered.value = false;
};
</script>

<template>
  <view class="page-container">
    <!-- 搜索栏-->
    <view class="search-bar">
      <!-- #ifdef APP || MP -->
      <text class="iconfont icon-scan"></text>
      <!-- #endif -->

      <!-- #ifdef H5 -->
      <text class="iconfont icon-search"></text>
      <!-- #endif -->
      <input type="text" class="input" placeholder="输入任务编号" />
    </view>

    <scroll-view
      :refresher-triggered="isTriggered"
      @refresherrefresh="onRefresh"
      refresher-enabled
      background="#f4f4f4;"
      @scrolltolower="onScrollToLower"
      class="scroll-view-wrapper"
      scroll-y="true"
    >
      <view class="card" v-for="(item, index) in taskList" :key="index">
        <navigator hover-class="none" :url="`/subpkg_task/detail/index?id=${item.id}`">
          <view class="header">
            <text>任务编号：{{ item.transportTaskId }}</text>
          </view>
          <view class="body">
            <view class="time-line">
              <view class="line">{{ item.startAddress }}</view>
              <view class="line">{{ item.endAddress }}</view>
            </view>
          </view>
        </navigator>
        <view class="footer">
          <view class="time">
            <view>提货时间</view>
            <view>{{ item.planDepartureTime }}</view>
          </view>
          <navigator v-if="item.enablePickUp" class="action" :url="`subpkg_task/pickup/index?id=${item.id}`">交付</navigator>
          <navigator v-else class="action disabled">回车登记</navigator>
        </view>
      </view>
      <view v-if="isEmpty" class="task-blank">无待提货物</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
@import './styles.scss';
.page-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 44px);
}
.search-bar {
  background-color: #fff;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
  position: relative;
  .icon-scan,
  .icon-search {
    position: absolute;
    top: 50%;
    left: 40rpx;
    padding: 20rpx;
    font-weight: 600;
    transform: translateY(-50%);
    color: $uni-secondary-text-color;
    font-size: $uni-font-size-base;
  }
  .input {
    height: 64rpx;
    background-color: #f4f4f4;
    border-radius: 64rpx;
    padding-left: 80rpx;
    font-size: $uni-font-size-small;
  }
}
.time {
  display: flex;
  align-items: center;
  font-size: 28rpx !important;
  view:first-child {
    font-size: 28rpx !important;
  }
  view:last-child {
    margin-left: 10rpx;
    color: #818181;
  }
}
</style>
