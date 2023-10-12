<script setup></script>
<template>
  <view class="page-container">
    <uni-list>
      <uni-list-item title="换绑手机" showArrow></uni-list-item>
      <uni-list-item title="修改密码" showArrow></uni-list-item>
      <uni-list-item title="消息通知设置" showArrow></uni-list-item>
      <uni-list-item title="修改密码" showArrow></uni-list-item>
      <uni-list-item title="清理缓存" showArrow></uni-list-item>
    </uni-list>
    <view class="button">退出</view>
  </view>
</template>

<style lang="scss">
.page-container {
  height: 100vh;
  background-color: $uni-bg-color;
  padding: 0 30rpx;
  padding-top: 40rpx;

  ::v-deep .uni-list-item__content-title {
    font-size: 32rpx;
  }
  .button {
    height: 120rpx;
    margin-top: 80rpx;
    background-color: #fff;
    border-radius: 16rpx;
    text-align: center;
    line-height: 120rpx;
  }
}
</style>
