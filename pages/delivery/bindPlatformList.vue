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
    <view class="cell">
      <view class="nav">
        <image
          class="logo"
          src="../../static/image/meituan-logo@2x.png"
        ></image>
        <text class="tlt">美团</text>
        <text class="status">已绑定</text>
      </view>
      <view class="info">
        <image
          class="shop-img"
          src="../../static/image/meituan-logo@2x.png"
        ></image>
        <view>
          <view class="name">美团店铺名称</view>
          <view class="sub-name" style="margin-top: 8px">店铺ID：32323</view>
          <view class="sub-name">账户余额：32元</view>
        </view>
      </view>
      <view class="menu-list">
        <view class="menu bind">解绑</view>
        <view class="menu delete">删除</view>
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
          console.warn(res);
        },
      };
      this.$http.request(params);
    },
    change(index) {
      this.current = index;
			this.http_waimai()
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
