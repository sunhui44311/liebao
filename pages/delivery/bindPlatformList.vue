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
    <view class="cell" v-for="(item, index) in bdlist" :key="index">
      <view class="nav">
        <image class="logo" :src="item.logo"></image>
        <text class="tlt">{{ item.name }}</text>
        <text class="status">已绑定</text>
      </view>
      <view class="info">
        <image
          class="shop-img"
          src="../../static/image/meituan-logo@2x.png"
        ></image>
        <view>
          <view class="name">{{ item.shopName }}</view>
          <view class="sub-name" style="margin-top: 8px"
            >店铺ID：{{ item.thirdShopId }}</view
          >
          <view class="sub-name">账户余额：32元</view>
        </view>
      </view>
      <view class="menu-list">
        <view class="menu bind" @click="unbundling(item)">解绑</view>
        <view class="menu delete" @click="del(item)">删除</view>
      </view>
    </view>
    <view class="wcell" v-for="(item, index) in waimailist" :key="index">
      <image class="logo" :src="item.logo"></image>
      <text class="name">{{ item.name }}</text>
      <view class="bind" @click="setdelivery(item)">去绑定</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      current: 0,
      waimailist: [],
      bdlist: [],
    };
  },
  onLoad() {
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
          this.http_waimai();
        },
      };
      this.$http.request(params);
    },
    http_waimai() {
      let params = {
        url: "app/waimai/list",
        method: "GET",
        data: {
          shopId: this.list[this.current].id,
        },
        callBack: (res) => {
          let arr = res.data;
          this.waimailist = arr.filter((e) => e.bindStatus == 0);
          this.bdlist = arr.filter((e) => e.bindStatus == 1);
        },
      };
      this.$http.request(params);
    },
    setdelivery(item) {
      let params = {
        url: "app/waimai/bind",
        method: "POST",
        data: {
          shopId: this.list[this.current].id,
          waimaiId: item.waimaiId,
        },
        callBack: (res) => {
          this.http_waimai();
        },
      };
      this.$http.request(params);
    },
    unbundling(e) {
      uni.showModal({
        title: "提示",
        content: "是否解绑该外卖平台",
        success: (res) => {
          if (res.confirm) {
            let params = {
              url: "app/waimai/release",
              method: "POST",
              data: {
                id: e.id,
              },
              callBack: (res) => {
                uni.hideLoading();
                if (res.code == 200) {
                  uni.showToast({
                    title: "解绑成功",
                    icon: "none",
                  });
                  this.http_waimai();
                }
              },
            };
            uni.showLoading({
              title: "解绑中",
              mask: true,
            });
            this.$http.request(params);
          }
        },
      });
    },
    del(e) {
      uni.showModal({
        title: "提示",
        content: "是否删除该外卖平台",
        success: (res) => {
          if (res.confirm) {
            let params = {
              url: "app/waimai/delete",
              method: "POST",
              data: {
                id: e.id,
              },
              callBack: (res) => {
                uni.hideLoading();
                if (res.code == 200) {
                  uni.showToast({
                    title: "删除成功",
                    icon: "none",
                  });
                  this.http_waimai();
                }
              },
            };
            uni.showLoading({
              title: "删除中",
              mask: true,
            });
            this.$http.request(params);
          }
        },
      });
    },
    change(index) {
      this.current = index;
      this.http_waimai();
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f6f7f9;
}
.cell {
  background-color: white;
  margin: 10px;
  padding: 10px 8px;
  border-radius: 7px;
}
.wcell {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 14px 24px;
  border-radius: 7px;
  margin-bottom: 20upx;
  &:last-child {
    margin-bottom: 0;
  }
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
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    width: 22px;
    height: 22px;
  }
  .tlt {
    color: #0d1c40;
    font-size: 17px;
    flex: 1;
    margin-left: 7px;
  }
  .status {
    color: #33bb66;
    font-size: 12px;
    height: 43px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    background-color: #effdee;
  }
}

.info {
  display: flex;
  justify-content: flex-start;
  margin-top: 12px;
  padding-bottom: 13px;
  border-bottom: solid 1px #eeeeee;
  .name {
    color: #0d1c40;
    font-size: 14px;
  }
}

.shop-img {
  width: 90px;
  height: 62px;
  margin-right: 11px;
}
.sub-name {
  color: #9fa7b6;
  font-size: 12px;
}
.menu-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  .menu {
    width: 60px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 12px;
    font-size: 13px;
  }
  .bind {
    border: solid 1px #e95008;
    color: #e95008;
    margin-right: 10px;
  }
  .delete {
    background-color: #db5f29;
    color: white;
  }
}
</style>
