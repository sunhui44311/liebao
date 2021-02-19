<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#333333" title-color="#333333" title="我的钱包" :background="{background:'#FFFFFF'}">
			<view class="slot-wrap">
				<image class="right-icon" src="../../static/image/des@2x.png"></image>
			</view>
		</u-navbar>
		<view class="content">
			<view class="cell">
				<view class="left">
					<text class="unit">¥</text>
					<text>1.0</text>
				</view>
				<view class="right">
					<view class="name">立减券</view>
					<view class="sub-tlt">有效期至：2020-10-10 24:00</view>
					<view class="sub-tlt">满15减5，仅限猫的平台使用，全国通用</view>
				</view>
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
	.content{
		margin: 10px 25px;
	}
	.right-icon{
		width: 20px;
		height: 20px;
	}
	.cell{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 80px;
	}
	.slot-wrap{
		display: flex;
		justify-content: flex-end;
		flex: 1;
		padding-right: 15px;
	}
	.left{
		width: 85px;
		text-align: center;
		background-color: #FAEEE7;
		height: 100%;
		color: #E95008;
		font-size: 22px;
		padding-top: 20px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		.unit{
			font-size: 13px;
			margin-right: 8px;
		}
	}
	.right{
		background-color: white;
		height: 100%;
		padding-left: 15px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.name{
		color: #0D1C40;
		font-size: 15px;
		margin-top: 12px;
	}
	.sub-tlt{
		color: #9EA7B7;
		font-size: 11px;
	}
</style>
