<template>
	<view class="box">
		<view class="section">
			<view class="nav">
				<image src="../../static/image/add_shop@2x.png"></image>
				<text>门店信息</text>
			</view>
			<view class="item">
				<text>门店名称</text>
				<input placeholder="请填写" />
			</view>
			<view class="item">
				<text>门店地址</text>
				<input placeholder="请填写" />
			</view>
			<view class="item">
				<text>门牌号</text>
				<input placeholder="请填写" />
			</view>
		</view>
		<view class="section">
			<view class="nav">
				<image src="../../static/image/contact@2x.png"></image>
				<text>联系人</text>
			</view>
			<view class="item">
				<text>联系人姓名</text>
				<input placeholder="请填写" />
			</view>
			<view class="item">
				<text>联系人电话</text>
				<input placeholder="请填写手机号" />
			</view>
		</view>
		<view class="section">
			<view class="nav">
				<image src="../../static/image/id_num@2x.png"></image>
				<text>联系人</text>
			</view>
			<view></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	page{
		background-color: #F6F7F9;
	}
	.box{
		margin: 12px 10px;
	}
	.nav{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		image{
			width: 24px;
			height: 24px;
		}
	}
	.section{
		background-color: white;
		padding: 16px 12px 0px 12px;
		border-radius: 6px;
		margin-bottom: 10px;
	}
	.item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		line-height: 40px;
		border-bottom: solid 1px #EEEEEE60;
		text{
			color: #9EA7B7;
			font-size: 14px;
		}
		input{
			flex: 1;
			text-align: right;
			font-size: 14px;
		}
	}
	.item:last-child{
		border-bottom: none;
	}
</style>
