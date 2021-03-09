<template>
  <view>
    <u-tabs
      :list="list"
      :is-scroll="false"
      active-color="#FA6F06"
      inactive-color="#4D5660"
      :current="current"
      @change="change"
    ></u-tabs>
    <view class="content">
      <view class="header">
        <view class="status-list">
          <view class="status" style="color: #5ab46e">
            <view style="font-size: 20px">1</view>
            <view>在线</view>
          </view>
          <view class="status" style="color: #9fa7b6">
            <view style="font-size: 20px">1</view>
            <view>离线</view>
          </view>
          <view class="status" style="color: #e84746">
            <view style="font-size: 20px">1</view>
            <view>异常</view>
          </view>
        </view>
        <view class="add-swper">
          <view @click.stop="add">添加</view>
        </view>
      </view>
      <view
        class="cell"
        v-for="(item, index) in devicelist"
        :key="index"
        @click="details(item.id)"
      >
        <view class="cell-header">
          <view class="name">{{ item.name }}</view>
          <view class="cell-status">在线</view>
        </view>
        <view class="item">
          <image src="../../static/image/print-name@2x.png"></image>
          <text>{{ item.deviceName }}</text>
        </view>
        <view class="item">
          <image src="../../static/image/voice-num@2x.png"></image>
          <text style="font-size: 12px">{{ item.deviceSecret }}</text>
          <view class="btn">打印测试</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      current: 0,
      devicelist: [],
    };
  },
  onShow() {
    this.http_shop();
  },
  methods: {
    http_shop() {
      let params = {
        url: "app/shop/list",
        method: "GET",
        data: {},
        callBack: (res) => {
          this.list = res.data;
          this.http_device();
        },
      };
      this.$http.request(params);
    },
    http_device() {
      let params = {
        url: "app/shop/device/list",
        method: "GET",
        data: {
          deviceType: 2,
          shopId: this.list[this.current].id,
        },
        callBack: (res) => {
          this.devicelist = res.data;
        },
      };
      this.$http.request(params);
    },
    change(index) {
      this.current = index;
    },
    add() {
      uni.navigateTo({
        url: `/pages/myTool/addPrint?shopId=${this.list[this.current].id}`,
      });
    },
    details(id) {
      uni.navigateTo({
        url: `/pages/myTool/addPrint?id=${id}`,
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f6f7f9;
}
.content {
  padding: 20upx;
}

.header {
  height: 160upx;
  background-color: white;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;
  .status-list {
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    .status {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .add-swper {
    width: 30%;
    view {
      background-color: #fa6f06;
      height: 48upx;
      width: 120upx;
      text-align: center;
      line-height: 48upx;
      border-radius: 24upx;
      color: white;
    }
  }
}

.cell {
  background-color: white;
  padding: 28upx 24upx;
  border-radius: 7px;
  .cell-header {
    display: flex;
    justify-content: space-between;
    .cell-status {
      background-color: #effdee;
      color: #33bb66;
      font-size: 12px;
      text-align: center;
      height: 32upx;
      width: 70upx;
    }
  }
}
.name {
  color: #0d1c40;
  font-size: 15px;
  margin-bottom: 12px;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;
  position: relative;
  image {
    width: 28upx;
    height: 28upx;
  }
  text {
    color: #0d1c40;
    font-size: 13px;
    margin-left: 6px;
  }
  .btn {
    position: absolute;
    right: 0px;
    width: 120upx;
    height: 48upx;
    line-height: 48upx;
    background: #ffffff;
    border: 1px solid #fa6f06;
    border-radius: 24upx;
    font-size: 12px;
    color: #fa6f06;
    text-align: center;
  }
}
</style>
