<template>
	<view>
		<view class="header">
			<view class="city">
				<text>苏州市</text>
				<image src="../../static/image/arrow@2x.png"></image>
			</view>
			<view class="search">
				<u-search shape="square" :show-action="false" placeholder="请输入收件地址，如小区、大厦、街道名"></u-search>
			</view>
		</view>
		<view class="box">
			<view class="cell" @click.stop="choiceAdress">
				<image class="location" src="../../static/image/bill-location@2x.png"></image>
				<view class="info">
					<view>苏州市纳米科技园</view>
					<view>苏州工业园区若水路388号</view>
				</view>
				<view class="line"></view>
			</view>
			<view class="cell">
				<image class="location" src="../../static/image/bill-location@2x.png"></image>
				<view class="info">
					<view>苏州市纳米科技园</view>
					<view>苏州工业园区若水路388号</view>
				</view>
				<view class="line"></view>
			</view>
			<view class="cell">
				<image class="location" src="../../static/image/bill-location@2x.png"></image>
				<view class="info">
					<view>苏州市纳米科技园</view>
					<view>苏州工业园区若水路388号</view>
				</view>
				<view class="line"></view>
			</view>
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
			choiceAdress(){
				uni.navigateTo({
					url:'/pages/bill/choiceMapAddress'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.header{
		background-color: white;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 20px;
		z-index: 999;
	}
	.city{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 60px;
		image{
			width: 16upx;
			height: 16upx;
			margin-left: 16upx;
		}
	}
	.search{
		flex: 1;
	}
	.cell{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 15px 8px;
		position: relative;
	}
	.box{
		margin: 64px 10px 0px 10px;
		background-color: white;
		border-radius: 6px;
	}
	.location{
		width: 36upx;
		height: 36upx;
		margin-right: 12px;
	}
	.info>view:first-child{
		color: #0D1C40;
		font-size: 14px;
	}
	.info>view:last-child{
		color: #9FA7B6;
		font-size: 12px;
		margin-top: 6px;
	}
	.line{
		position: absolute;
		bottom: 0px;
		height: 1px;
		background-color: #EEEEEE;
		left: 35px;
		right: 30px;
	}
</style>
