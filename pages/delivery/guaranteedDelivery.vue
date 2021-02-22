<template>
	<view class="box">
		<view class="section">
			<view class="nav">
				<text class="tlt">保底配送</text>
				<u-switch></u-switch>
			</view>
			<view class="sub">开启后按费用由低到高发单，直到骑手接单为止</view>
		</view>
		<view class="section">
			<view class="nav">
				<text class="tlt">保底y运力</text>
			</view>
			<view class="list">
				<view class="item">美团</view>
				<view class="item">达达</view>
				<view class="item">蜂鸟</view>
				<view class="item">闪送</view>
				<view class="item">顺丰</view>
			</view>
		</view>
		<view class="section">
			<view class="nav">
				<text class="tlt">触发时长</text>
			</view>
			<view class="sub">配送下单<text>1</text>分钟后，如未接单则发起保底配送</view>
			<view class="delivery-menu">
				<view class="delivery-tlt">下单时长</view>
				<view class="delivery-value">1分钟</view>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
		</view>
		<view class="section">
			<view class="nav">
				<text class="tlt">触发时长</text>
			</view>
			<view class="sub">配送下单<text>1</text>分钟后，如未接单则发起保底配送</view>
			<view class="delivery-menu">
				<view class="delivery-tlt">小费金额</view>
				<view class="delivery-value">1分钟</view>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
			<view class="delivery-menu">
				<view class="delivery-tlt">自动加价金额</view>
				<view class="delivery-value">1分钟</view>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save">保存</view>
	</view>
</template>

<script>
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
		padding: 16px 9px;
		border-radius: 7px;
		margin-bottom: 10px;
	}
	.nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.tlt{
			color: #0D1C40;
			font-size: 17px;
		}
	}
	.sub{
		color: #9FA7B6;
		font-size: 12px;
		margin-top: 6px;
	}
	
	.list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		.item{
			height: 28px;
			line-height: 28px;
			padding: 0px 15px;
			border: solid 1px #9EA7B7;
			border-radius: 14px;
			margin-right: 15px;
			margin-top: 12px;
			color: #0D1C40;
			font-size: 13px;
		}
	}
	.delivery-menu{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 8px;
		.delivery-tlt{
			color: #101E3E;
			font-size: 14px;
		}
		.delivery-value{
			color: #DB5F29;
			font-size: 14px;
			flex: 1;
			text-align: right;
			padding-right: 5px;
		}
		.arrow{
			width: 5px;
			height: 11px;
		}
	}
	
	.bottom{
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
		background-color: #E95008;
	}
</style>
