<template>
	<view class="box">
		<view class="section">
			<view class="nav">
				<text class="tlt">保底运力</text>
			</view>
			<view class="tip">用户选择非聚合配送发单时，优先将选中的运力置顶显示， 提高您的下单效率</view>
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
				<text class="tlt">屏蔽运力</text>
			</view>
			<view class="tip">用户选择非聚合配送发单时，屏蔽的运力将不再估价，提 高计价速度</view>
			<view class="list">
				<view class="item">美团</view>
				<view class="item">达达</view>
				<view class="item">蜂鸟</view>
				<view class="item">闪送</view>
				<view class="item">顺丰</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save">保存</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F7F9;
	}
	.box {
		padding: 10px;
	}
	.section {
		background-color: white;
		padding: 16px 9px;
		border-radius: 7px;
		margin-bottom: 10px;
	}
	
	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	
		.tlt {
			color: #0D1C40;
			font-size: 17px;
		}
	}
	.tip{
		color: #9FA7B6;
		font-size: 12px;
	}
	.list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	
		.item {
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
