<template>
  <view>
    <view class="box" v-if="info">
      <view class="section">
        <view class="nav">
          <image src="../../static/image/add_shop@2x.png"></image>
          <text>门店信息</text>
        </view>
        <view class="item">
          <text>门店名称</text>
          <text class="value">{{ info.name }}</text>
        </view>
        <view class="item">
          <text>门店地址</text>
          <text class="value">{{ info.address }}</text>
        </view>
        <view class="item">
          <text>门牌号</text>
          <text class="value">{{ info.street }}</text>
        </view>
      </view>
      <view class="section">
        <view class="nav">
          <image src="../../static/image/contact@2x.png"></image>
          <text>联系人</text>
        </view>
        <view class="item">
          <text>联系人姓名</text>
          <text class="value">{{ info.contactName }}</text>
        </view>
        <view class="item">
          <text>联系人电话</text>
          <text class="value">{{ info.mobile }}</text>
        </view>
      </view>
      <view class="section">
        <view class="nav">
          <image src="../../static/image/id_num@2x.png"></image>
          <text>门店照片</text>
        </view>
        <view style="padding-bottom: 20px">
          <image
            class="upload"
            mode="aspectFit"
            :src="info.doorHeadPhoto"
          ></image>
        </view>
      </view>
      <view class="section" v-if="info.deliveries.length > 0">
        <view class="nav">
          <image src="../../static/image/platform@2x.png"></image>
          <text>运力平台</text>
        </view>
        <view style="margin-top: 10px">
          <view
            class="platform-cell"
            v-for="(item, index) in info.deliveries"
            :key="index"
          >
            <image class="logo" :src="item.logo"></image>
            <view style="flex: 1">
              <view class="platform-tlt">{{ item.name }}</view>
              <view>
                <image
                  class="status-icon"
                  v-if="item.bindStatus == 1"
                  src="../../static/image/access@2x.png"
                ></image>
                <image
                  class="status-icon"
                  v-else
                  src="../../static/image/no-access@2x.png"
                ></image>
                <text
                  :class="['status-tlt', { 'none-tlt': item.bindStatus == 0 }]"
                  >{{ item.bindStatus == 1 ? "已通过" : "未通过" }}</text
                >
              </view>
            </view>
            <view class="delete">删除</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom"></view>
    <view class="save" @click="del">删除门店</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      shopId: null,
      info: null,
    };
  },
  onLoad(e) {
    if (e.id) {
      this.shopId = e.id;
    }
  },
  onShow() {
    this.updata();
  },
  methods: {
    updata() {
      var params = {
        url: "app/shop/detail",
        method: "GET",
        data: {
          shopId: this.shopId,
        },
        callBack: (res) => {
          uni.hideLoading();
          if (res.code == 200) {
            this.info = res.data;
          }
        },
      };
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      this.$http.request(params);
    },
    del() {
      var params = {
        url: "app/shop/delete",
        method: "POST",
        data: {
          shopId: this.info.id,
        },
        callBack: (res) => {
          uni.hideLoading();
          if (res.code == 200) {
            uni.showToast({
              title: "删除成功",
              icon: "none",
            });
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          }
        },
      };
      uni.showLoading({
        title: "删除中",
        mask: true,
      });
      this.$http.request(params);
    },
  },
  onNavigationBarButtonTap(e) {
    uni.navigateTo({
      url: `/pages/shop/addShop?id=${this.info.id}`,
    });
  },
};
</script>

<style lang="scss">
page {
  background-color: #f6f7f9;
}

.box {
  margin: 12px 10px 12px 10px;
}

.bar {
  height: 30px;
  line-height: 30px;
  background-color: #faeee7;
  color: #e95008;
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
}

.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  image {
    width: 24px;
    height: 24px;
  }
}

.section {
  background-color: white;
  padding: 16px 12px 0px 12px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border-bottom: solid 1px #eeeeee60;

  text {
    color: #9ea7b7;
    font-size: 14px;
  }

  .value {
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: rgba(16, 30, 62, 1);
  }
}

.item:last-child {
  border-bottom: none;
}

.upload {
  height: 125px;
  margin-top: 12px;
}
.bottom {
  height: 70px;
}

.save {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  color: white;
  width: calc(100% - 60px);
  text-align: center;
  font-size: 16px;
  background-color: #e95008;
}

.platform-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15upx;
}

.platform-tlt {
  color: #222222;
  font-size: 17px;
}

.logo {
  width: 38px;
  height: 38px;
  margin-right: 14px;
}
.status-icon {
  width: 12px;
  height: 12px;
}
.status-tlt {
  color: #33bb66;
  font-size: 12px;
  &.none-tlt {
    color: rgba(233, 80, 8, 1);
  }
}

.delete {
  color: #e95008;
  border: solid 1px #e95008;
  width: 60px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  text-align: center;
  font-size: 13px;
}
</style>
