<template>
	<view>
		<view class="cell">
			<view class="nav">
				<image class="logo" src="../../static/image/meituan-logo@2x.png"></image>
				<text class="tlt">美团</text>
				<text class="status">已绑定</text>
			</view>
			<view class="info">
				<image class="shop-img" src="../../static/image/meituan-logo@2x.png"></image>
				<view>
					<view class="name">美团店铺名称</view>
					<view class="sub-name" style="margin-top: 8px;">店铺ID：32323</view>
					<view class="sub-name">账户余额：32元</view>
				</view>
			</view>
			<view class="menu-list">
				<view class="menu bind">解绑</view>
				<view class="menu delete">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.cell{
		background-color: white;
		margin: 10px;
		padding: 10px 8px;
		border-radius: 7px;
	}
	.nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo{
			width: 22px;
			height: 22px;
		}
		.tlt{
			color: #0D1C40;
			font-size: 17px;
			flex: 1;
			margin-left: 7px;
		}
		.status{
			color: #33BB66;
			font-size: 12px;
			height: 43px;
			height: 16px;
			text-align: center;
			line-height: 16px;
			background-color: #EFFDEE;
		}
	}
	
	.info{
		display: flex;
		justify-content: flex-start;
		margin-top: 12px;
		padding-bottom: 13px;
		border-bottom: solid 1px #EEEEEE;
		.name{
			color: #0D1C40;
			font-size: 14px;
		}
	}
	
	.shop-img{
		width: 90px;
		height: 62px;
		margin-right: 11px;
	}
	.sub-name{
		color: #9FA7B6;
		font-size: 12px;
	}
	.menu-list{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 10px;
		.menu{
			width: 60px;
			height: 24px;
			line-height: 24px;
			text-align: center;
			border-radius: 12px;
			font-size: 13px;
		}
		.bind{
			border: solid 1px #E95008;
			color: #E95008;
			margin-right: 10px;
		}
		.delete{
			background-color: #DB5F29;
			color: white;
		}
	}
</style>
