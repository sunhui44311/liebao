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
      <view class="owner-cell">
        <view class="owner-header">
          <image
            class="owner-logo"
            src="../../static/image/dada@2x.png"
          ></image>
          <view class="owner-info">
            <view class="owner-tlt">达达</view>
            <view class="owner-sub-info">商户编号</view>
            <view class="owner-sub-info">配送门店</view>
          </view>
          <view class="bind">解绑</view>
        </view>
        <view class="tip">
          <text>开启后商家下单时首选该账号平台为配送平台</text>
          <u-switch></u-switch>
        </view>
      </view>
      <view class="cell" v-for="(item, index) in deliverylist" :key="index">
        <image class="logo" :src="item.logo"></image>
        <text class="name">{{ item.name }}</text>
        <view class="bind">去绑定</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      deliverylist: [],
      current: 0,
    };
  },
  onLoad() {
    this.http_shop();
    this.http_delivery();
  },
  methods: {
    http_shop() {
      let params = {
        url: "app/shop/list",
        method: "GET",
        data: {},
        callBack: (res) => {
          this.list = res.data;
        },
      };
      this.$http.request(params);
    },
   
    http_delivery() {
      let params = {
        url: "app/delivery/list",
        method: "GET",
        data: {},
        callBack: (res) => {
          this.deliverylist = res.data;
        },
      };
      this.$http.request(params);
    },
    change(index) {
      this.current = index;
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f6f7f9;
}
.content {
  margin: 10px;
}

/*自由*/
.owner-cell {
  padding: 12px 6px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 7px;
  .owner-logo {
    width: 60px;
    height: 60px;
  }
  .owner-header {
    display: flex;
    justify-content: space-between;
  }
  .owner-info {
    flex: 1;
    margin-left: 9px;
  }
  .owner-tlt {
    color: #0d1c40;
    font-size: 17px;
  }
  .owner-sub-info {
    color: #4e565f;
    font-size: 12px;
  }
  .tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9fa7b6;
    font-size: 12px;
    margin-top: 5px;
  }
}

.cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 14px 24px;
  border-radius: 7px;
  .logo {
    width: 32px;
    height: 32px;
  }
  .name {
    flex: 1;
    color: #0d1c40;
    font-size: 17px;
    margin-left: 18px;
  }
}

.bind {
  width: 60px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #e95008;
  font-size: 13px;
  border: solid 1px #e95008;
  border-radius: 12px;
}
</style>
