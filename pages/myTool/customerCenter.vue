<template>
	<view class="box">
		<image class="logo" src="../../static/image/customer-header@2x.png"></image>
		<view class="cell">
			<image class="item-icon" src="../../static/image/online@2x.png"></image>
			<view class="item-content">
				<view class="item-tlt">在线客服</view>
				<view class="item-sub">咨询时间 09:00-20:00</view>
			</view>
			<image class="arrow" src="../../static/image/fj2.png"></image>
		</view>
		<view class="cell">
			<image class="item-icon" src="../../static/image/tel@2x.png"></image>
			<view class="item-content">
				<view class="item-tlt">电话客服</view>
				<view class="item-sub">7*24小时为您服务</view>
			</view>
			<image class="arrow" src="../../static/image/fj2.png"></image>
		</view>
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
	.logo{
		display: inline-block;
		width: 100%;
		height: 260upx;
	}
	.cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		height: 153upx;
		padding: 0px 37upx;
		margin-top: 10px;
		border-radius: 14upx;
		.item-icon{
			width: 48upx;
			height: 48upx;
		}
		.item-content{
			flex: 1;
			margin-left: 30upx;
			.item-tlt{
				color: #0D1C40;
				font-size: 15px;
			}
			.item-sub{
				color: #A0A7B5;
				font-size: 13px;
				margin-top: 12upx;
			}
		}
		.arrow{
			width: 10upx;
			height: 22upx;
		}
	}
</style>
