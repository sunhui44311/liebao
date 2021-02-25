<template>
	<view>
		<view class="nav">
			<view class="tab">
				<view>门店统计</view>
				<image src="../../static/image/dibiao2.png"></image>
			</view>
			<view class="tab">
				<view>今日</view>
				<image src="../../static/image/dibiao2.png"></image>
			</view>
		</view>
		<view class="box">
			<view class="section">
				<view>外卖统计</view>
				<view class="list">
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>外卖订单</text>
						</view>
						<view class="num">0</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>外卖收入</text>
						</view>
						<view class="num">0.0</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>外卖退单</text>
						</view>
						<view class="num">0.0</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>外卖实收</text>
						</view>
						<view class="num" style="color: #DD7E42;">0.0</view>
					</view>
				</view>
				<image src="../../static/image/waimai-static@2x.png"></image>
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
	.nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60upx;
		background-color: white;
	}
	.tab{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #4D5660;
		font-size: 14px;
		image{
			width: 15upx;
			height: 8upx;
			margin-left: 15upx;
		}
	}
	
	.box{
		padding: 10px;
	}
	
	.section{
		background-color: white;
		padding: 28upx 15upx;
	}
	
	.list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	
	.list-item{
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		width: 50%;
	}
	
	.item{
		color: #4E565F;
		font-size: 12px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		image{
			width: 48upx;
			height: 48upx;
		}
	}
	.num{
		width: 70px;
		text-align: center;
		color: #0D1C40;
		font-size: 16px;
	}
</style>
