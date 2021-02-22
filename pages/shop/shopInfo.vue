<template>
	<view>
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
				<view style="padding-bottom: 20px;">
					<image class="upload" mode="aspectFit" src="../../static/image/upload@2x.png"></image>
				</view>
			</view>
			<view class="section">
				<view class="nav">
					<image src="../../static/image/platform@2x.png"></image>
					<text>运力平台</text>
				</view>
				<view style="margin-top: 10px;">
					<view class="platform-cell">
						<image class="logo" src="../../static/image/meituan@2x.png"></image>
						<view style="flex: 1;">
							<view class="platform-tlt">美团</view>
							<view>
								<image class="status-icon" src="../../static/image/access@2x.png"></image>
								<text class="status-tlt">通过</text>
							</view>
						</view>
						<view class="delete">删除</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save">删除门店</view>
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

<style lang="scss" scoped>
	page {
		background-color: #F6F7F9;
	}

	.box {
		margin: 12px 10px 12px 10px;
	}

	.bar {
		height: 30px;
		line-height: 30px;
		background-color: #FAEEE7;
		color: #E95008;
		font-size: 12px;
		text-align: center;
		margin-bottom: 10px;
	}

	.nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		image {
			width: 24px;
			height: 24px;
		}
	}

	.section {
		background-color: white;
		padding: 16px 12px 0px 12px;
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

	.item:last-child {
		border-bottom: none;
	}

	.upload {
		height: 125px;
		margin-top: 12px;
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
	
	.platform-cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.platform-tlt{
		color: #222222;
		font-size: 17px;
	}
	
	.logo{
		width: 38px;
		height: 38px;
		margin-right: 14px;
	}
	.status-icon{
		width: 12px;
		height: 12px;
	}
	.status-tlt{
		color: #33BB66;
		font-size: 12px;
	}
	.delete{
		color: #E95008;
		border: solid 1px #E95008;
		width: 60px;
		height: 24px;
		line-height: 24px;
		border-radius: 12px;
		text-align: center;
		font-size: 13px;
	}
</style>
