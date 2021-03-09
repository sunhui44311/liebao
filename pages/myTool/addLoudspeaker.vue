<template>
  <view class="box">
    <view class="section">
      <view class="section-tlt">选择云音响</view>
      <view class="voice-list">
        <u-row gutter="16">
          <u-col span="6" v-for="(item, index) in deviceslist" :key="index">
            <view class="item" @click="choice(item)">
              <image
                class="item-bg"
                src="../../static/image/证通云音响@2x.png"
              ></image>
              <view class="voice-name">{{ item.name }}</view>
              <image
                v-if="form.deviceId == item.id"
                class="flg"
                src="../../static/image/voice-select-yes@2x.png"
              ></image>
              <image
                v-else
                class="flg"
                src="../../static/image/voice-select-no@2x.png"
              ></image>
            </view>
          </u-col>
        </u-row>
      </view>
      <view class="input-cell" style="margin-top: 20px">
        <text>云音响名称</text>
        <input v-model="form.name" placeholder="给这台音响取个名字吧" />
      </view>
      <view class="input-cell">
        <text>云音响编号</text>
        <input v-model="form.deviceSn" placeholder="请填写" />
      </view>
    </view>
    <view class="section" style="margin-top: 10px">
      <view class="section-header">
        <view class="section-tlt">播报设置</view>
        <view class="voice-off">
          <text style="color: #101e3e; font-size: 14px">是否开启语音播报</text>
          <u-switch v-model="kg"></u-switch>
        </view>
      </view>
      <view>
        <view class="cell-item">
          <text>新订单提醒</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.neworderReminderCount"
              bg-color="#FAEEE7"
              :input-width="90"
              :input-height="50"
            ></u-number-box>
            <!-- <view class="uni-number">
              <view class="add-reduce">-</view>
              <view>0</view>
              <view class="add-number">+</view>
            </view> -->
          </view>
        </view>
        <view class="cell-item">
          <text>配送被骑手接单</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.riderorderReminderCount"
              bg-color="#FAEEE7"
              :input-width="90"
              :input-height="50"
            ></u-number-box>
            <!-- <view class="uni-number">
              <view class="add-reduce">-</view>
              <view>0</view>
              <view class="add-number">+</view>
            </view> -->
          </view>
        </view>
        <view class="cell-item">
          <text>配送 2 分钟无人接单</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.noanswerorderReminderCount"
              bg-color="#FAEEE7"
              :input-width="90"
              :input-height="50"
            ></u-number-box>
            <!-- <view class="uni-number">
              <view class="add-reduce">-</view>
              <view>0</view>
              <view class="add-number">+</view>
            </view> -->
          </view>
        </view>
        <view class="cell-item">
          <text>配送被骑手取消</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.ridercancelReminderCount"
              bg-color="#FAEEE7"
              :input-width="90"
              :input-height="50"
            ></u-number-box>
            <!-- <view class="uni-number">
              <view class="add-reduce">-</view>
              <view>0</view>
              <view class="add-number">+</view>
            </view> -->
          </view>
        </view>
        <view class="cell-item">
          <text>配送被骑手取消</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.ordercancelReminderCount"
              bg-color="#FAEEE7"
              :input-width="90"
              :input-height="50"
            ></u-number-box>
            <!-- <view class="uni-number">
              <view class="add-reduce">-</view>
              <view>0</view>
              <view class="add-number">+</view>
            </view> -->
          </view>
        </view>
      </view>
    </view>
    <view class="btn" @click="submit">确定</view>
    <view class="del" v-if="yunid" @click="del">删除</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      menuList: [
        {
          title: "新订单提醒",
        },
        {
          title: "配送被骑手接单",
        },
        {
          title: "配送 2 分钟无人接单",
        },
        {
          title: "配送被骑手取消",
        },
        {
          title: "订单被顾客取消",
        },
      ],
      deviceslist: [],
      form: {
        deviceId: null,
        deviceSn: null,
        name: "",
        deviceType: 1,
        shopId: null,
        openVoiceBroadcast: 0,
        neworderReminderCount: 0,
        riderorderReminderCount: 0,
        noanswerorderReminderCount: 0,
        ridercancelReminderCount: 0,
        ordercancelReminderCount: 0,
      },
      kg: false,
      yunid: null,
    };
  },
  methods: {
    init() {
      let params = {
        url: "app/shop/device/devices",
        method: "GET",
        data: {
          type: 1,
        },
        callBack: (res) => {
          this.deviceslist = res.data;
        },
      };
      this.$http.request(params);
    },
    http_yunyx() {
      let params = {
        url: "app/shop/device/detail",
        method: "GET",
        data: {
          id: this.yunid,
        },
        callBack: (res) => {
          this.form = res.data;
          if (res.data.openVoiceBroadcast) {
            this.kg = true;
          } else {
            this.kg = false;
          }
        },
      };
      this.$http.request(params);
    },
    choice(item) {
      this.form.deviceId = item.id;
    },
    del() {
      uni.showModal({
        title: "提示",
        content: "是否删除此设备方案",
        success: (res) => {
          if (res.confirm) {
            let params = {
              url: "app/shop/device/delete",
              method: "POST",
              data: {
                id: this.form.id,
              },
              callBack: function (res) {
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
          }
        },
      });
    },
    submit() {
      if (!this.form.name) {
        uni.showToast({
          title: "请输入云音响名称",
          icon: "none",
        });
        return;
      }
      if (!this.form.deviceSn) {
        uni.showToast({
          title: "请输入云音响编号",
          icon: "none",
        });
        return;
      }
      if (!this.form.deviceId) {
        uni.showToast({
          title: "请选择设备",
          icon: "none",
        });
        return;
      }
      let removePropertyOfNull = function (obj) {
        Object.keys(obj).forEach((item) => {
          if (!obj[item]) delete obj[item];
        });
        return obj;
      };
      let params = {
        url: "app/shop/device/add",
        method: "POST",
        data: removePropertyOfNull(this.form),
        callBack: (res) => {
          uni.hideLoading();
          if (res.code == 200) {
            uni.showToast({
              title: "保存成功",
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
        title: "正在提交",
        mask: true,
      });
      this.$http.request(params);
    },
  },
  onLoad(e) {
    if (e.shopId) {
      this.form.shopId = e.shopId;
    }
    if (e.id) {
      this.yunid = e.id;
      uni.setNavigationBarTitle({
        title: "编辑云音响",
      });
      this.http_yunyx();
    }
    this.init();
  },
  watch: {
    kg(e) {
      if (e) {
        this.form.openVoiceBroadcast = 1;
      } else {
        this.form.openVoiceBroadcast = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f6f7f9;
}
.box {
  margin: 10px;
}
.section {
  padding: 20px 15px;
  background-color: white;
  border-radius: 6px;
}
.section-tlt {
  color: #222222;
  font-size: 15px;
  margin-bottom: 22upx;
}
.voice-list {
  .item {
    width: 100%;
    position: relative;
    border-radius: 6upx;
    height: 161upx;
    .item-bg {
      height: 100%;
      width: 100%;
    }
  }
  .flg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 42upx;
    height: 42upx;
  }
}
.voice-name {
  position: absolute;
  top: 20upx;
  left: 15upx;
  color: #101e3e;
  font-size: 16px;
}

.input-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  line-height: 35px;
  text {
    color: #9ea7b7;
    font-size: 14px;
  }
  input {
    flex: 1;
    text-align: right;
    font-size: 14px;
  }
}

.voice-off {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-header {
  padding-bottom: 25upx;
  border-bottom: solid 1px #eeeeee;
}

.cell-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #101e3e;
  font-size: 14px;
  margin-top: 25upx;
}
.cell-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .title {
    margin-right: 20upx;
  }
}
.uni-number {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40upx;
  width: 132upx;
  border-radius: 20upx;
  border: solid 1px #dddddd;
  overflow: hidden;
  margin-left: 20upx;
  view {
    flex: 1;
    text-align: center;
    height: 40upx;
    color: #101e3e;
    font-size: 12px;
  }
  .add-reduce {
    border-right: solid 1px #dddddd;
  }
  .add-number {
    background-color: #faeee7;
    color: #e95008;
    border-left: solid 1px #dddddd;
  }
}
.btn {
  background-color: #e95008;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 45px;
  color: white;
  font-size: 16px;
  margin: 40upx 40upx 20upx 40upx;
}
.del {
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 45px;
  font-size: 16px;
  margin: 0 40upx;
  color: #e95008;
  border: 1px solid #e95008;
}
</style>
