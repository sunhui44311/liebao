<template>
	<view>
		<view class="cell">
			<view class="nav">
				<image class="logo" src="../../static/image/meituan-logo@2x.png"></image>
				<text class="tlt">美团</text>
				<text>已经绑定</text>
			</view>
			<view class="info">
				<image class="shop-img" src="../../static/image/meituan-logo@2x.png"></image>
				<view>
					<view>美团店铺名称</view>
					<view>店铺ID：32323</view>
					<view>账户余额：32元</view>
				</view>
			</view>
			<view>
				<view>解绑</view>
				<view>删除</view>
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
	}
	
	.info{
		display: flex;
		justify-content: flex-start;
	}
	
	.shop-img{
		width: 90px;
		height: 62px;
	}
</style>
