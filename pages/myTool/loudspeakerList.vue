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
      <view class="cell">
        <view class="name">美团外卖前音响</view>
        <view class="item">
          <image src="../../static/image/voice-name@2x.png"></image>
          <text>证通云音响</text>
        </view>
        <view class="item">
          <image src="../../static/image/voice-num@2x.png"></image>
          <text style="font-size: 12px">GLNMSQ201102122</text>
        </view>
      </view>
    </view>
    <view class="btn" @click.stop="add">添加云音响</view>
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
  onLoad() {
    this.http_shop();
  },
  methods: {
    change(index) {
      this.current = index;
    },
    add() {
      uni.navigateTo({
        url: "/pages/myTool/addLoudspeaker",
      });
    },
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
          deviceType: 1,
          shopId: this.list[this.current].id,
        },
        callBack: (res) => {
          this.devicelist = res.data;
        },
      };
      this.$http.request(params);
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
.cell {
  background-color: white;
  padding: 28upx 24upx;
  border-radius: 7px;
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
  image {
    width: 28upx;
    height: 28upx;
  }
  text {
    color: #0d1c40;
    font-size: 13px;
    margin-left: 6px;
  }
}
.btn {
  position: fixed;
  bottom: 32upx;
  left: 31px;
  width: calc(100% - 62px);
  background-color: #e95008;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  border-radius: 45px;
  color: white;
}
</style>
