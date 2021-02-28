<template>
	<view class="box">
		<view class="section">
			<view class="start">
				<text class="start-tlt">发</text>
				<text class="start-address">上海安慧里1区88号楼1单元州001</text>
			</view>
			<view class="start contact">
				<text class="name">闪先生</text>
				<text class="tel">18362766707</text>
			</view>
			
			<view class="start" style="margin-top: 20px;">
				<text class="start-tlt" style="background-color: #1087FE;">收</text>
				<text class="start-address">上海安慧里1区88号楼1单元州001</text>
			</view>
			<view class="start contact">
				<text class="name">闪先生</text>
				<text class="tel">18362766707</text>
			</view>
			<image class="exchange" src="../../static/image/exchange@2x.png"></image>
		</view>
		<view class="section1">
			<view class="cell" @click.stop="menu(1)">
				<view class="cell-left">
					<image class="icon" src="../../static/image/goods@2x.png"></image>
					<text>物品信息</text>
				</view>
				<view class="cell-right">
					<text>必填</text>
					<image src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="line"></view>
			</view>
			<view class="cell">
				<view class="cell-left">
					<image class="icon" src="../../static/image/time@2x.png"></image>
					<text>取件时间</text>
				</view>
				<view class="cell-right">
					<text>必填</text>
					<image src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="line"></view>
			</view>
			<view class="cell" @click.stop="menu(3)">
				<view class="cell-left">
					<image class="icon" src="../../static/image/remark@2x.png"></image>
					<text>备注</text>
				</view>
				<view class="cell-right">
					<text>选填</text>
					<image src="../../static/image/enter@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="btn">立即计价</view>
		<good-info-input ref="goodInfoInput"></good-info-input>
	</view>
</template>

<script>
	import goodInfoInput from './goodInfoInput.vue'
	export default{
		components:{
			goodInfoInput
		},
		data(){
			return{
				
			}
		},
		methods:{
			menu(index){
				if(index==1){
					this.$refs['goodInfoInput'].init()
				}
				else if(index==3){
					uni.navigateTo({
						url:'/pages/bill/billRemark'
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
		position: relative;
		background-color: white;
		padding: 40upx 20upx;
		border-radius: 6px;
	}
	.start{
		flex-direction: row;
		justify-content: flex-start;
	}
	.start-tlt{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: #FA6F06;
		border-radius: 10px;
		color: white;
		line-height: 20px;
		text-align: center;
		margin-right: 10px;
		font-size: 11px;
	}
	.contact{
		margin-left: 30px;
		margin-top: 8px;
	}
	.start-address{
		color: #0D1C40;
		font-size: 13px;
	}
	.name{
		color: #0D1C40;
		font-size: 12px;
	}
	.tel{
		color: #0D1C40;
		font-size: 12px;
		margin-left: 16px;
	}
	.exchange{
		position: absolute;
		width: 36upx;
		height: 36upx;
		right: 36upx;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.section1{
		margin-top: 10px;
		background-color: white;
		border-radius: 6px;
	}
	.cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 40upx 0px 10px;
		height: 49px;
		position: relative;
		.cell-left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #9EA7B7;
			font-size: 14px;
			.icon{
				width: 36upx;
				height: 36upx;
				margin-right: 12px;
			}
		}
		.cell-right{
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			image{
				width: 24upx;
				height: 24upx;
			}
		}
	}
	.line{
		position: absolute;
		bottom: 0px;
		left: 40px;
		right: 24px;
		background-color: #EEEEEE;
		height: 1px;
	}
	.btn{
		position: fixed;
		bottom: 22px;
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		text-align: center;
		color: white;
		width: calc(100% - 85px);
		left: 50%;
		transform: translateX(-50%);
		font-size: 16px;
	}
</style>
