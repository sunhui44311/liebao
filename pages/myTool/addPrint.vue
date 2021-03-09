<template>
  <view class="box">
    <view class="section">
      <view class="section-tlt">选择打印机</view>
      <view class="voice-list">
        <u-row gutter="16">
          <u-col span="6" v-for="(item, index) in printList" :key="index">
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
        <text>打印机名称</text>
        <input v-model="form.name" placeholder="给这台打印机起个名字吧" />
      </view>
      <view class="input-cell">
        <text>打印机编号</text>
        <input v-model="form.deviceSn" placeholder="查看打印机底部标签" />
      </view>
      <view class="input-cell">
        <text>打印机KEY</text>
        <input v-model="form.deviceSecret" placeholder="查看打印机底部标签" />
      </view>
    </view>
    <view class="section" style="margin-top: 10px">
      <view class="section-header">
        <view class="section-tlt">打印机设置</view>
        <view class="voice-off">
          <text style="color: #101e3e; font-size: 14px">接单自动打印</text>
          <u-switch v-model="kg"></u-switch>
        </view>
      </view>
      <view>
        <view class="cell-item">
          <text>客户联</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.printCustomerCount"
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
          <text>商家联</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.printMerchantCount"
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
          <text>厨房联</text>
          <view class="cell-right">
            <text class="title">播报次数</text>
            <u-number-box
              v-model="form.printKitchenCount"
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
    <view class="delete" v-if="yunid" @click="del">删除</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      printList: [],
      menuList: [
        {
          title: "客户联",
        },
        {
          title: "商家联",
        },
        {
          title: "厨房联",
        },
      ],
      kg: false,
      yunid: null,
      form: {
        deviceId: null,
        shopId: null,
        deviceType: 2,
        deviceSn: "",
        name: "",
        deviceSecret: "",
        openOrderPrint: 0,
        printCustomerCount: 0,
        printMerchantCount: 0,
        printKitchenCount: 0,
      },
    };
  },
  methods: {
    init() {
      let params = {
        url: "app/shop/device/devices",
        method: "GET",
        data: {
          type: 2,
        },
        callBack: (res) => {
          this.printList = res.data;
        },
      };
      this.$http.request(params);
    },
    choice(item) {
      this.form.deviceId = item.id;
    },
    http_dayj() {
      let params = {
        url: "app/shop/device/detail",
        method: "GET",
        data: {
          id: this.yunid,
        },
        callBack: (res) => {
          this.form = res.data;
          if (res.data.openOrderPrint) {
            this.kg = true;
          } else {
            this.kg = false;
          }
        },
      };
      this.$http.request(params);
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
          title: "请输入打印机名称",
          icon: "none",
        });
        return;
      }
      if (!this.form.deviceSn) {
        uni.showToast({
          title: "请输入打印机编号",
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
      if (!this.form.deviceSecret) {
        uni.showToast({
          title: "请输入打印机KEY",
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
        title: "编辑打印机",
      });
      this.http_dayj();
    }
    this.init();
  },
  watch: {
    kg(e) {
      if (e) {
        this.form.openOrderPrint = 1;
      } else {
        this.form.openOrderPrint = 0;
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

.item-offset {
  margin-left: 24upx;
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
  margin: 30px 20px 0px 20px;
}
.delete {
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 45px;
  font-size: 16px;
  margin: 10px 20px;
  background-color: #f6f7f9;
  border: solid 1px #e95008;
  color: #e95008;
}
</style>
