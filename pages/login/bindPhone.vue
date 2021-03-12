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
      </view>
    </u-navbar>
    <view class="box">
      <view class="tlt">绑定手机号</view>
      <view class="cell">
        <text class="pre">+86</text>
        <input v-model="mobile" style="flex: 1" type="number" maxlength="11" placeholder="请输入手机号" />
      </view>
      <view class="cell">
        <input v-model="code" style="flex: 1" maxlength="6" placeholder="请输入验证码" />
        <view class="send" @click.stop="send" v-if="show"> 获取验证码 </view>
        <view class="send" v-else> {{ count }}s </view>
      </view>
      <view class="login" :style="{'opacity':enableLogin?1:0.5}"  @click="sign"
        >确定</view>
    </view>
  </view>
</template>

<script>
import globalData from "@/common/js/globalData.js";
export default {
  data() {
    return {
      mobile: "",
      code: "",
      show: true,
      count: 0,
      timer: null,
	  token:''
    };
  },
  computed:{
	 enableLogin(){
	 	return this.mobile&&this.code
	 }, 
  },
  onLoad(options) {
  	let clientInfo = plus.push.getClientInfo();
	this.token=options.token
  	console.log('需要绑定的clientid为'+clientInfo.clientid);
  },
  methods: {
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
          type: 2,
        },
        callBack: (res) => {
			console.log(res)
			this.code=res.data.code
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
      if (this.code == "") {
        uni.showToast({
          title: "手机验证码不能为空",
          icon: "none",
        });
        return;
      }
      let params = {
        url: "app/login/rebind/phone",
        method: "POST",
        data: {
          phone: this.mobile,
          code: this.code,
		  token:this.token
        },
        callBack: (res) => {
      	  uni.hideLoading();
      	  if(res.code==200){
      		  uni.setStorageSync("token", this.token);
      		  uni.navigateBack({
      		    delta: 2,
      		  });
      	  }
      	  else{
      		  uni.showToast({
      		  	title:res.msg,
      			icon:'none'
      		  })
      	  }
        },
        errCallBack:(err)=>{
      	  uni.hideLoading()
      	  uni.showToast({
      	  	title:res.msg,
      		icon:'none'
      	  })
        }
      };
      uni.showLoading({
        title: "正在登录",
      });
      this.$http.request(params,true);
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

