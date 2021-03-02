<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#FFFFFF" title-color="#FFFFFF" title="账户充值" :background="{background:'#FC720000'}">
		</u-navbar>
		<view class="header">
			<view class="account">
				<view>充值账号</view>
				<view class="tel">13889768765</view>
			</view>
		</view>
		<view class="list">
			<view class="tlt">充值金额</view>
			<view class="options">
				<view class="item">20元</view>
				<view class="item">20元</view>
				<view class="item">20元</view>
				<view class="item">20元</view>
				<view class="item">20元</view>
				<view class="item">20元</view>
				<view class="item">20元</view>
				<view class="item">20元</view>
			</view>
			<view class="coupon">
				<image src="/static/image/coupon@2x.png"></image>
				<text>赠送2张9.5折优惠券</text>
			</view>
		</view>
		<view class="pay">
			<view class="tlt">支付方式</view>
			<view class="menu border">
				<image class="logo" src="/static/image/alipay@2x.png"></image>
				<text style="flex: 1;margin-left: 18px;">支付宝支付</text>
				<image class="" src="/static/image/select_normal@2x.png"></image>
			</view>
			<view class="menu">
				<image class="logo" src="/static/image/wxpay@2x.png"></image>
				<text style="flex: 1;margin-left: 18px;">微信支付</text>
				<image src="/static/image/select_yes@2x.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.header{
		margin-top: -64px;
		height: 166px;
		background-color: #FC7200;
		.account{
			padding-left: 32px;
			position: absolute;
			top: 60px;
			color: white;
		}
		.tel{
			font-size: 24px;
			font-weight: bold;
			margin-top: 10px;
		}
	}
	.list{
		position: relative;
		margin-top: -30px;
		background: #FFFFFF;
		box-shadow: 0px 4px 8px 0px rgba(221, 221, 221, 0.1);
		border-radius: 14px;
		margin-left: 10px;
		margin-right: 10px;
		padding: 17px 4px;
		.tlt{
			color: #0D1C40;
			font-size: 15px;
			padding-left: 21px;
		}
	}
	
	.options{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.item{
		border: solid 1px #DDDDDD;
		height: 40px;
		width: 90px;
		text-align: center;
		line-height: 40px;
		border-radius: 2px;
		color: #0D1C40;
		font-size: 13px;
		margin-left: 20px;
		margin-top: 12px;
	}
	.coupon{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #FAEEE7;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		margin: 15px 18px 0px 18px;
		color: #E95008;
		font-size: 12px;
		image{
			margin-left: 10px;
			width: 24px;
			height: 24px;
		}
	}
	
	.pay{
		background-color: white;
		height: 154px;
		padding: 17px 21px;
		margin: 10px 10px;
		.tlt{
			color: #0D1C40;
			font-size: 15px;
		}
	}
	.menu{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		height: 60px;
		.logo{
			width: 24px;
			height: 24px;
		}
	}
	.menu>image:last-child{
		width: 18px;
		height: 18px;
	}
	.border{
		border-bottom: solid 1px #EEEEEE;
	}
</style>
