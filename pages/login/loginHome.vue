<template>
	<view class="box">
		<image class="logo" src="../../static/image/logo@2x.png"></image>
		<view class="phone">138****1234</view>
		<view class="tip" style="margin-top: 10px;">中国移动提供认证服务</view>
		<view class="btn" style="margin-top: 32px;">一键登录</view>
		<view class="btn other" @click.stop="login">使用其他手机号</view>
		<view class="footer">
			<image src="../../static/image/weixuanzhong@2x.png"></image>
			<view class="tip">登录注册即同意用户协议与隐私政策</view>
		</view>
		<view>
			<view class="bar">
				<view class="line"></view>
				<view class="bar-tlt">微信账号快捷登录</view>
				<view class="line"></view>
			</view>
			<image class="weixin" src="../../static/image/weixin@2x.png"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			login(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.logo{
		height: 112upx;
		width: 283upx;
		margin-top: 20px;
	}
	.footer{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: -30px;
		margin-top: 10px;
		image{
			width: 12px;
			height: 12px;
			margin-right: 10px;
		}
	}
	.phone{
		color: #0D1C40;
		font-size: 22px;
		margin-top: 34px;
	}
	.tip{
		color: #9EA7B7;
		font-size: 12px;
	}
	.btn{
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		width: 580upx;
		color: white;
	}
	.other{
		background-color: white;
		color: #0D1C40;
		font-size: 16px;
		border: solid 1px #9EA7B7;
		margin-top: 17px;
	}
	.bar{
		margin-top: 120px;
		display: flex;
		justify-content: center;
		align-items: center;
		.line{
			height: 1px;
			background-color: #CCCCCC;
			width: 100px;
			margin: 0px 20px;
		}
		.bar-tlt{
			color: #9EA7B7;
			font-size: 12px;
		}
	}
	.weixin{
		width: 80upx;
		height: 80upx;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 45upx;
	}
</style>
