<template>
  <view class="content">
    <view
      class="cell"
      @click.stop="shop_Act(item.id)"
      v-for="(item, index) in list"
      :key="index"
    >
      <view class="header">
        <view class="num">
          <view>门店编号：{{ item.code }}</view>
          <view class="copy">复制</view>
        </view>
        <view class="name">{{ item.name }}</view>
        <view class="location">
          <image class="icon" src="../../static/image/location@2x.png"></image>
          <view>{{ item.address }}</view>
        </view>
        <view class="location">
          <image class="icon" src="../../static/image/customer@2x.png"></image>
          <view>{{ item.contactName }}：{{ item.mobile }}</view>
        </view>
      </view>
      <view class="footer">
        <view class="txt">已获得运力</view>
        <view class="img-list">
          <image
            v-for="i in item.deliveries"
            :key="i"
            class="img"
            :src="i.logo"
          ></image>
        </view>
      </view>
    </view>
    <view class="add" @click.stop="add">新增门店</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    http_store() {
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
    add() {
      uni.navigateTo({
        url: "/pages/shop/addShop",
      });
    },
    shop_Act(id) {
      uni.navigateTo({
        url: `/pages/shop/shopInfo?id=${id}`,
      });
    },
  },
  onShow(e) {
    this.http_store();
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
.cell {
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
}
.header {
  padding: 16px 10px 8px 10px;
}
.num {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #4d5660;
  font-size: 14px;
  .copy {
    color: #fa6f06;
    border: solid 1px #e95008;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 3px;
    margin-left: 14px;
  }
}
.name {
  color: #0d1c40;
  font-size: 15px;
  margin-bottom: 8px;
  margin-top: 8px;
}
.location {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
}
.icon {
  width: 16px;
  height: 16px;
}
.footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 38px;
  line-height: 38px;
  background-color: #f8eee8;
  padding-left: 10px;
  .txt {
    color: #4d5660;
    font-size: 13px;
    margin-right: 6px;
  }
}
.img-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.img {
  width: 22px;
  height: 22px;
  margin-right: 10upx;
}
.add {
  position: fixed;
  bottom: 20px;
  width: calc(100% - 20px);
  background-color: #e95008;
  color: white;
  font-size: 16px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
}
</style>
