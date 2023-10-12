<script setup>
import { getTask } from '@/api/user.js';
import { ref } from 'vue';
const taskData = ref({});
const getTaskData = async () => {
  try {
    const result = await getTask(uni.utils.getYearAndMonth());
    console.log(result);
    taskData.value = result.data;
  } catch (e) {
    console.log(e);
  }
};
getTaskData();
const change = (e) => {
  console.log(e);
};
const calendar = ref();
</script>

<template>
  <view class="page-container">
    <view class="content">
      <view class="item">
        <text class="volumn">{{ taskData.taskAmounts }}</text>
        <text class="label">任务总量</text>
      </view>
      <view class="item">
        <text class="volumn">{{ taskData.completedAmounts }}</text>
        <text class="label">完成任务量</text>
      </view>
      <view class="item">
        <text class="volumn">{{ taskData.transportMileage }}</text>
        <text class="label">运输里程(km)</text>
      </view>
    </view>
    <uni-calendar ref="calendar" :insert="true" :lunar="true" clearDate="true" @change="change" />
  </view>
</template>

<style lang="scss">
.page-container {
  height: 100vh;
  background-color: $uni-bg-color;

  .content {
    height: 202rpx;
    margin: 45rpx 0;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    font-size: $uni-font-size-small;
    color: $uni-black-color;
    .volumn {
      display: block;
      font-size: 36rpx;
      margin-bottom: 20rpx;
      font-weight: 500;
    }
  }
}
</style>
