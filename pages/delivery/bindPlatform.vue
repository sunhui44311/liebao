<template>
  <view>
    <view class="content">
      <view
        class="owner-cell"
        v-for="(item, index) in boundlist"
        :key="item.deliveryId"
      >
        <view class="owner-header">
          <image class="owner-logo" :src="item.logo"></image>
          <view class="owner-info">
            <view class="owner-tlt">{{ item.name }}</view>
            <view class="owner-sub-info">商户编号:{{ item.code }}</view>
          </view>
          <view class="bind" @click="untie(item)">解绑</view>
        </view>
        <view class="tip">
          <text>开启后商家下单时首选该账号平台为配送平台</text>
          <u-switch v-model="item.state" @change="kq(index)"></u-switch>
        </view>
      </view>
      <view class="cell" v-for="(item, index) in deliverylist" :key="index">
        <image class="logo" :src="item.logo"></image>
        <text class="name">{{ item.name }}</text>
        <view class="bind" @click="setdelivery(item)">去绑定</view>
      </view>
    </view>
    <u-popup
      v-model="show"
      mode="center"
      border-radius="12"
      width="590"
      @close="binding"
    >
      <view class="box">
        <view class="nav">
          <view class="nav-tlt">第三方平台绑定流程</view>
          <image
            @click.stop="show = false"
            class="close"
            src="../../static/image/delete.png"
          ></image>
        </view>
        <view class="content">
          <rich-text :nodes="explain"></rich-text>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      boundlist: [],
      deliverylist: [],
      explain: "",
      delivery: {},
    };
  },
  onLoad() {
    this.http_delivery();
    this.http_explain();
  },
  methods: {
    http_delivery() {
      let params = {
        url: "app/delivery/list",
        method: "GET",
        data: {},
        callBack: (res) => {
          let arr = res.data;
          let boundlist = arr.filter((e) => e.bindStatus == 1);
          boundlist.forEach((e) => {
            if (e.preferredDelivery == 1) {
              e.state = true;
            }
          });
          this.boundlist = boundlist;
          this.deliverylist = arr.filter((e) => e.bindStatus == 0);
        },
      };
      this.$http.request(params);
    },
    http_explain() {
      let params = {
        url: "app/delivery/explain",
        method: "GET",
        data: {},
        callBack: (res) => {
          console.warn(res);
          this.explain = res.data;
        },
      };
      this.$http.request(params);
    },
    setdelivery(item) {
      this.show = true;
      this.delivery = item;
    },
    binding() {
      let params = {
        url: "app/delivery/bind",
        method: "POST",
        data: {
          deliveryId: this.delivery.deliveryId,
        },
        callBack: (res) => {
          uni.hideLoading();
          if (res.code == 200) {
            uni.showToast({
              title: "绑定成功",
              icon: "none",
            });
            this.http_delivery();
          }
        },
      };
      uni.showLoading({
        title: "绑定中",
        mask: true,
      });
      this.$http.request(params);
    },
    kq(e) {
      let params = {
        url: "app/delivery/status",
        method: "POST",
        data: {
          id: this.boundlist[e].id,
          preferredDelivery: this.boundlist[e].state ? 1 : 0,
        },
        callBack: (res) => {
          uni.hideLoading();
          if (res.code == 200) {
            uni.showToast({
              title: this.boundlist[e].state ? "开启成功" : "关闭成功",
              icon: "none",
            });
            this.http_delivery();
          }
        },
      };
      uni.showLoading({
        title: this.boundlist[e].state ? "开启中" : "关闭中",
        mask: true,
      });
      this.$http.request(params);
    },
    untie(e) {
      uni.showModal({
        title: "提示",
        content: "是否解绑该运力平台",
        success: (res) => {
          if (res.confirm) {
            let params = {
              url: "app/delivery/release",
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
                  this.http_delivery();
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
.box {
  padding: 15px 12px;
  background-color: white;
}
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.nav-tlt {
  color: #0d1c40;
  font-size: 15px;
  font-weight: bold;
}
.close {
  position: absolute;
  right: 0px;
  padding: 12px;
  width: 12px;
  height: 12px;
}
.content {
  margin-top: 20px;
}
</style>
