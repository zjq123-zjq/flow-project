<script setup>
import { ref, computed } from 'vue';
import { takeDelivery } from '@/api/task.js';
import { onLoad } from '@dcloudio/uni-app';
//司机作业id
const id = ref('');

//初始化加载
onLoad((query) => {
  console.log(query);
  id.value = query.id;
});

// 提货凭证图⽚
const receiptPictrues = ref([]);
// 货品图⽚
const goodsPictrues = ref([]);

//提货凭证照片数组
const cargoPickUpPictureList = computed(() => {
  return receiptPictrues.value.map((item) => {
    return {
      url: item.url
    };
  });
});

const cargoPictureList = computed(() => {
  return goodsPictrues.value.map((item) => {
    return {
      url: item.url
    };
  });
});

const enableSubmit = computed(() => {
  return goodsPictrues.value.length > 0 && receiptPictrues.value.length > 0;
});

const onsubmitForm = async () => {
  try {
    const data = {
      id: id.value,
      cargoPickUpPictureList: cargoPickUpPictureList.value,
      cargoPictureList: cargoPictureList.value
    };
    const result = await takeDelivery(data);
    uni.reLaunch({
      url: '/subpkg_task/detail/index?id=' + id.value
    });
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <view class="page-container">
    <view class="receipt-info">
      <uni-file-picker v-model="receiptPictrues" file-extname="jpg,webp,gif,png" limit="3" title="请拍照上传回单凭证"></uni-file-picker>
      <uni-file-picker v-model="goodsPictrues" file-extname="jpg,webp,gif,png" limit="3" title="请拍照上传货品照⽚"></uni-file-picker>
    </view>
    <button @click="onsubmitForm" :disabled="!enableSubmit" class="button">提交</button>
  </view>
</template>

<style lang="scss">
.page-container {
  padding: 30rpx;
}
.receipt-info {
  min-height: 600rpx;
  background-color: #fff;
  padding: 20rpx 30rpx;
  border-radius: 16rpx;
}
::v-deep .uni-file-picker {
  margin-bottom: 30rpx;
}
.button {
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  border-radius: 100rpx;
  margin-top: 60rpx;
  color: #fff;
  font-size: $uni-font-size-big;
  background-color: $uni-main-color;

  &[disabled] {
    color: #fff;
    background-color: #fadcd9;
  }
}
</style>
