<template>
	<view>
		<view class="box">
			<view class="tlt">修改密码</view>
			<view class="cell">
				<text class="pre">+86</text>
				<input v-model="mobile" style="flex: 1;" type="number"  maxlength="11" placeholder="请输入手机号"/>
			</view>
			<view class="cell">
				<input v-model="code" type="number" maxlength="6" style="flex: 1" placeholder="请输入验证码" />
				<view class="send" @click.stop="send" v-if="show"> 获取验证码 </view>
				<view class="send" v-else> {{ count }}s </view>
			</view>
			<view class="cell">
				<input v-model="newPassword" style="flex: 1;" placeholder="请输入密码"/>
			</view>
			<view class="login" :style="{'opacity':enableLogin?1:0.5}" @click.stop="submit">确认设置</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				mobile: "",
				newPassword: "",
				code: "",
				show: true,
				count: 0,
			}
		},
		computed:{
			enableLogin(){
				return this.mobile&&this.code&&this.newPassword
			}
		},
		methods:{
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
			submit() {
			  if (this.code == "") {
			    uni.showToast({
			      title: "验证码不能为空",
			      icon: "none",
			    });
			    return;
			  }
			  if (this.newPassword == "") {
			    uni.showToast({
			      title: "新密码不能为空",
			      icon: "none",
			    });
			    return;
			  }
			  let params = {
			    url: "app/login/password/change",
			    method: "POST",
			    data: {
			      mobile: this.mobile,
			      code: this.code,
			      newPassword: this.newPassword,
			    },
			    callBack: (res) => {
			      uni.showToast({
			        title: "修改成功",
			        icon: "none",
			      });
			      setTimeout(() => {
			        uni.navigateBack({
			          delta: 1,
			        });
			      }, 1000);
			      uni.hideLoading();
			      clearInterval(this.timer);
			    },
			  };
			  uni.showLoading({
			    title: "正在修改",
			  });
			  this.$http.request(params);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		margin: 30px 24px;
	}
	.tlt{
		color: #0D1C40;
		font-size: 20px;
		margin-bottom: 30px;
	}
	.cell{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 10px;
		margin-bottom: 15px;
		border-bottom: solid 1px #CCCCCC60;
		.pre{
			color: #0D1C40;
			margin-right: 25px;
		}
	}
	.send{
		color: #E95008;
		font-size: 14px;
		margin-right: 40px;
	}

	.tip{
		color: #9EA7B7;
		font-size: 12px;
	}
	.login{
		height: 45px;
		background-color: #E95008;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		margin: 40px 20px 12px 20px;
		opacity: 0.5;
	}
</style>
