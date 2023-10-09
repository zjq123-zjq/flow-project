<script setup>
import { ref } from 'vue';
import { getTruck } from '@/api/user.js';
import { onLoad } from '@dcloudio/uni-app';

const truckInfo = ref();

const getTruckData = async () => {
  try {
    let res = await getTruck();
    console.log(res);
    truckInfo.value = res.data;
  } catch (e) {
    console.log(e);
  }
};
onLoad(() => {
  getTruckData();
});
</script>

<template>
  <view class="page-container page-content" v-if="truckInfo?.pictureList">
    <swiper class="truck-pictures" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in truckInfo?.pictureList" :key="index">
        <image class="picture" :src="item.url" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    <uni-list>
      <uni-list-item :border="false" title="车辆编号" :right-text="truckInfo.id"></uni-list-item>
      <uni-list-item :border="false" title="车辆号牌" :right-text="truckInfo.licensePlate"></uni-list-item>
      <uni-list-item :border="false" title="车型" :right-text="truckInfo.truckType"></uni-list-item>
      <uni-list-item :border="false" title="所属机构" :right-text="truckInfo.currentOrganName"></uni-list-item>
      <uni-list-item :border="false" title="载重" :right-text="truckInfo.allowableLoad"></uni-list-item>
    </uni-list>
  </view>
</template>

<style lang="scss">
.page-container {
  background-color: $uni-bg-color;
  height: 100vh;
}
.page-content {
  padding: 30rpx;

  .truck-pictures {
    width: 100%;
    height: 400rpx;
    border-radius: 16rpx;
    overflow: hidden;
    .picture {
      width: 100%;
      height: 100%;
    }
  }
  .uni-list {
    margin-top: 30rpx;
  }
  ::v-deep .uni-list-item__extra-text {
    font-size: 28rpx;
    color: #2a2929;
  }
  ::v-deep .uni-list-item__content-title {
    font-size: 28rpx;
    color: #818181;
  }
}
</style>
