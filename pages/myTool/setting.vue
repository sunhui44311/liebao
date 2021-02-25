<template>
	<view class="box">
		<view class="section">
			<view class="section-nav">
				<text class="section-tlt">新消息通知</text>
				<u-switch></u-switch>
			</view>
			<view class="tip">关闭新消息通知，将无法收到订单状态通知</view>
		</view>
		<view class="section">
			<view class="section-nav">
				<text class="section-tlt">语音播报</text>
				<u-switch></u-switch>
			</view>
			<view class="tip">关闭新消息通知，将无法收到订单状态通知</view>
		</view>
		<view class="section section-box">
			<view class="cell" @click.stop="menu(1)">
				<text>修改密码</text>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
			<view class="cell" @click.stop="menu(2)">
				<text>关于我们</text>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
			<view class="cell" @click.stop="menu(3)">
				<text>给我们好评</text>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
			<view class="cell" @click.stop="menu(4)">
				<text>隐私政策协议</text>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
		</view>
		<view class="btn">确定</view>
		<view class="delete">切换账号登录</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			menu(type){
				if(type==1){
					uni.navigateTo({
						url:'/pages/myTool/modifyPwd'
					})
				}
				else if(type==2){
					uni.navigateTo({
						url:'/pages/myTool/aboutUs'
					})
				}
				else if(type==4){
					uni.navigateTo({
						url:'/pages/myTool/privatePolicy'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.box{
		padding: 10px;
	}
	.section{
		background-color: white;
		padding: 32upx 18upx;
		border-radius: 7px;
		margin-bottom: 10px;
	}
	.section-nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.section-tlt{
			color: #0D1C40;
			font-size: 17px;
		}
	}
	.tip{
		color: #9FA7B6;
		font-size: 12px;
		margin-top: 12px;
	}
	.section-box{
		padding: 0px 18upx;
	}
	.cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 35px;
		line-height: 35px;
		border-bottom: solid 1px #EEEEEE60;
		text{
			color: #13203C;
			font-size: 14px;
		}
	}
	.arrow{
		width: 10upx;
		height: 22upx;
	}
	
	.btn{
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		position: fixed;
		bottom: 85px;
		left: 30px;
		width: calc(100% - 60px);
	}
	.delete{
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		font-size: 16px;
		background-color: #F6F7F9;
		border: solid 1px #E95008;
		color: #E95008;
		position: fixed;
		bottom: 30px;
		left: 30px;
		width: calc(100% - 60px);
	}
</style>
