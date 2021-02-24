<template>
	<view>
		<view class="box">
			<view class="section">
				<view class="item select-item">
					<text>位置</text>
					<text class="item-content">点击选择位置</text>
					<image class="arrow" src="../../static/image/fj2.png"></image>
				</view>
				<view class="item">
					<text>门牌号</text>
					<input placeholder="请填写楼层、单元、门牌号" />
				</view>
				<view class="item">
					<text>联系人姓名</text>
					<input placeholder="请填写姓名" />
				</view>
				<view class="item">
					<text>联系人电话</text>
					<input placeholder="请填写手机号电话" />
				</view>
			</view>
			<view class="section section-default">
				<text>设为默认地址</text>
				<u-switch></u-switch>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F7F9;
	}

	.box {
		margin: 12px 10px 12px 10px;
	}

	.section {
		background-color: white;
		padding: 0px 12px 0px 12px;
		border-radius: 6px;
		margin-bottom: 10px;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		line-height: 40px;
		border-bottom: solid 1px #EEEEEE60;

		text {
			color: #9EA7B7;
			font-size: 14px;
		}

		input {
			flex: 1;
			text-align: right;
			font-size: 14px;
		}
	}
	.select-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.item-content{
			flex: 1;
			text-align: right;
			margin-right: 34upx;
		}
	}
	
	.arrow{
		width: 10upx;
		height: 22upx;
	}

	.item:last-child {
		border-bottom: none;
	}

	.bottom{
		height: 70px;
	}
	
	.section-default{
		height: 107upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #101E3E;
		font-size: 14px;
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
