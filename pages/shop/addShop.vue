<template>
  <view>
    <view class="bar">部分运力门店基本信息不可修改，如需修改请新增门店</view>
    <view class="box">
      <view class="section">
        <view class="nav">
          <image src="../../static/image/add_shop@2x.png"></image>
          <text>门店信息</text>
        </view>
        <view class="item">
          <text>门店名称</text>
          <input v-model="form.name" placeholder="请填写" />
        </view>
        <view class="item" @click.stop="choiceAddress">
          <text>门店地址</text>
          <text
            class="active-input"
            v-if="form.address ? true : false"
            style="color: #13203c"
            >{{ form.address }}</text
          >
          <text class="inactive-txt" v-else>点击选择位置</text>
          <image
            class="item-arrow"
            src="../../static/image/enter@2x.png"
          ></image>
        </view>
        <view class="item">
          <text>门牌号</text>
          <input v-model="form.street" placeholder="请填写" />
        </view>
      </view>
      <view class="section">
        <view class="nav">
          <image src="../../static/image/contact@2x.png"></image>
          <text>联系人</text>
        </view>
        <view class="item">
          <text>联系人姓名</text>
          <input v-model="form.contactName" placeholder="请填写" />
        </view>
        <view class="item">
          <text>联系人电话</text>
          <input v-model="form.mobile" placeholder="请填写手机号" />
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
            :src="
              form.doorHeadPhoto
                ? form.doorHeadPhoto
                : '../../static/image/upload@2x.png'
            "
            @click.stop="showActionSheet = true"
          ></image>
        </view>
      </view>
    </view>
    <view class="bottom"></view>
    <view class="save">保存</view>
    <u-action-sheet
      :list="actionSheetList"
      v-model="showActionSheet"
      @click="click"
      :cancel-btn="true"
    ></u-action-sheet>
  </view>
</template>

<script>
export default {
  data() {
    return {
      shopId: null,
      form: {
        name: "",
        address: "",
        street: "",
        contactName: "",
        mobile: "",
        doorHeadPhoto: "",
      },
      showActionSheet: false,
      actionSheetList: [
        {
          text: "拍照",
          color: "#0D1C40",
          fontSize: 30,
        },
        {
          text: "从相册选取",
          color: "#0D1C40",
          fontSize: 30,
        },
      ],
    };
  },
  onLoad(e) {
    if (e.id) {
      this.shopId = e.id;
      this.updata();
    }
    uni.$on("selectAddress", (data) => {
      this.form.address = data.address + data.street;
      this.form.lng = data.longitude;
      this.form.lat = data.latitude;
    });
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
            this.form = res.data;
          }
        },
      };
      uni.showLoading({
        title: "加载中",
        mask: true,
      });
      this.$http.request(params);
    },
    click(index) {
      uni.chooseImage({
        count: 1,
        sourceType: [index == 0 ? "camera" : "album"],
        success: (res) => {
          let params = {
            url: "app/common/upload",
            data: {
              imageUrl: res.tempFilePaths[0],
              name: "file",
            },
            callBack: (response) => {
              let result = JSON.parse(response);
              uni.hideLoading();
              if (result.code === 200) {
                uni.showToast({
                  title: "上传成功",
                });
                this.form.doorHeadPhoto = result.data.url;
              }
            },
          };
          uni.showLoading({
            title: "正在上传",
            mask: true,
          });
          _self.$http.uploadImage(params);
        },
      });
    },
    choiceAddress() {
      uni.navigateTo({
        url: `/pages/bill/choiceAddress`,
      });
    },
    save() {
      if (!this.form.name) {
        uni.showToast({
          title: "请输入门店名称",
          icon: "none",
        });
        return;
      }
      if (!this.form.mobile) {
        uni.showToast({
          title: "请输入联系人电话",
          icon: "none",
        });
        return;
      }
      if (!this.form.contactName) {
        uni.showToast({
          title: "请输入联系人姓名",
          icon: "none",
        });
        return;
      }
      if (!this.form.address) {
        uni.showToast({
          title: "请选择门店地址",
          icon: "none",
        });
        return;
      }

      if (!this.form.doorHeadPhoto) {
        uni.showToast({
          title: "请上传门店照片",
          icon: "none",
        });
        return;
      }
      var params = {
        url: this.shopId ? "app/shop/modify" : "app/shop/add",
        method: "POST",
        data: this.form,
        callBack: function (res) {
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
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f6f7f9;
}

.box {
  margin: 0px 10px 12px 10px;
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

  input {
    flex: 1;
    text-align: right;
    font-size: 14px;
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
.active-input {
  color: #13203c;
  flex: 1;
  text-align: right;
}
.inactive-txt {
  color: #9ea7b7;
  flex: 1;
  text-align: right;
}
.item-arrow {
  width: 24upx;
  height: 24upx;
}
</style>
