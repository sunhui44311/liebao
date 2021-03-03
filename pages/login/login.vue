<template>
  <view>
    <u-navbar
      :is-back="true"
      :is-fixed="true"
      :border-bottom="false"
      title-size="36"
      back-icon-color="#333333"
      title-color="#333333"
      :background="{ background: '#FFFFFF' }"
    >
      <view class="slot-wrap">
        <view @click.stop="showPwdLogin = !showPwdLogin">{{
          !showPwdLogin ? "密码登录" : "验证码登录"
        }}</view>
      </view>
    </u-navbar>
    <view class="box">
      <view class="tlt">{{ showPwdLogin ? "密码登录" : "手机号登录" }}</view>
      <view class="cell">
        <text class="pre">+86</text>
        <input v-model="mobile" style="flex: 1" placeholder="请输入手机号" />
      </view>
      <view class="cell" v-if="!showPwdLogin">
        <input v-model="code" style="flex: 1" placeholder="请输入验证码" />
        <view class="send" @click.stop="send" v-if="show"> 获取验证码 </view>
        <view class="send" v-else> {{ count }}s </view>
      </view>
      <view class="cell" v-else>
        <input v-model="password" style="flex: 1" placeholder="请输入密码" />
      </view>
      <view class="forget" v-if="showPwdLogin" @click.stop="forget_Click"
        >忘记密码</view
      >
      <view :class="['login', showPwdLogin ? 'pwdLogin' : '']" @click="sign"
        >登录</view
      >
      <view class="footer">
        <image src="../../static/image/weixuanzhong@2x.png"></image>
        <view class="tip">登录注册即同意用户协议与隐私政策</view>
      </view>
    </view>
  </view>
</template>

<script>
import globalData from "@/common/js/globalData.js";
export default {
  data() {
    return {
      showPwdLogin: false,
      mobile: "",
      code: "",
      show: true,
      count: 0,
      timer: null,
      password: "",
    };
  },
  methods: {
    forget_Click() {
      uni.navigateTo({
        url: "/pages/login/forgetPwd",
      });
    },
    /*发送邮件*/
    send() {
      if (this.mobile == "") {
        uni.showToast({
          title: "手机号不能为空",
          icon: "none",
        });
        return;
      }
      let params = {
        url: "app/login/send/sms",
        method: "POST",
        data: {
          mobile: this.mobile,
          type: 1,
        },
        callBack: (res) => {
			console.log(res)
          this.show = false;
          this.count = 59;
          this.timer = setInterval(() => {
            this.count--;
            if (this.count <= 0) {
              this.show = true;
              clearInterval(this.timer);
            }
          }, 1000);
          uni.hideLoading();
        },
      };
      uni.showLoading({
        title: "正在发送",
      });
      this.$http.request(params);
    },
    sign() {
      if (!this.showPwdLogin) {
        // 验证码
        if (this.code == "") {
          uni.showToast({
            title: "手机验证码不能为空",
            icon: "none",
          });
          return;
        }
        let params = {
          url: "app/login/verification",
          method: "POST",
          data: {
            mobile: this.mobile,
            code: this.code,
            platform: globalData.platform == "ios" ? 2 : 1,
          },
          callBack: (res) => {
            uni.setStorageSync("token", res.data.token);
            uni.hideLoading();
            uni.navigateBack({
              delta: 2,
            });
          },
        };
        uni.showLoading({
          title: "正在登录",
        });
        this.$http.request(params);
      } else {
        // 密码
        if (this.password == "") {
          uni.showToast({
            title: "登录密码不能为空",
            icon: "none",
          });
          return;
        }
        let params = {
          url: "app/login/password",
          method: "POST",
          data: {
            mobile: this.mobile,
            password: this.password,
            platform: globalData.platform == "ios" ? 2 : 1,
          },
          callBack: (res) => {
            uni.setStorageSync("token", res.data.token);
            uni.hideLoading();
            uni.navigateBack({
              delta: 2,
            });
          },
        };
        uni.showLoading({
          title: "正在登录",
        });
        this.$http.request(params);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slot-wrap {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  padding-right: 15px;
  color: #0d1c40;
  font-size: 15px;
}
.box {
  margin: 30px 24px;
}
.tlt {
  color: #0d1c40;
  font-size: 20px;
  margin-bottom: 30px;
}
.cell {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: solid 1px #cccccc60;
  .pre {
    color: #0d1c40;
    margin-right: 25px;
  }
}
.send {
  color: #e95008;
  font-size: 14px;
  margin-right: 40px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -30px;
  margin-top: 5px;
  image {
    width: 12px;
    height: 12px;
    margin-right: 10px;
  }
}
.tip {
  color: #9ea7b7;
  font-size: 12px;
}
.login {
  height: 45px;
  background-color: #e95008;
  line-height: 45px;
  text-align: center;
  border-radius: 45px;
  color: white;
  font-size: 16px;
  margin: 40px 20px 12px 20px;
  opacity: 0.5;
}
.pwdLogin {
  margin-top: 60px;
}
.forget {
  position: absolute;
  display: inline-block;
  right: 20px;
  color: #e95008;
  font-size: 14px;
}
</style>
