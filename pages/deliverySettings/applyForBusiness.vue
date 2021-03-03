<template>
	<view>
		<view class="box">
			<view class="section">
				<view class="nav">
					<image src="../../static/image/add_shop@2x.png"></image>
					<text>门店信息</text>
				</view>
				<view class="item">
					<text>商家名称</text>
					<input placeholder="请填写" />
				</view>
				<view class="item">
					<text>商户类型</text>
					<u-radio-group v-model="dataForm.licenseType">
						<u-radio name="1" active-color="#FC7200">个体户</u-radio>
						<u-radio name="3" active-color="#FC7200">企业</u-radio>
					</u-radio-group>
				</view>
				<view class="item">
					<text>门店类型</text>
					<u-radio-group v-model="dataForm.merchantType">
						<u-radio name="1" icon-size="28" label-size="28rpx" active-color="#FC7200">单门店</u-radio>
						<u-radio name="2" icon-size="28" label-size="28rpx" active-color="#FC7200">多门店</u-radio>
					</u-radio-group>
				</view>
				<view class="item" @click.stop="showMainPop">
					<text>主营业务</text>
					<text></text>
					<image class="item-arrow" src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="item">
					<text>门店地址</text>
					<text></text>
					<image class="item-arrow" src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="item">
					<text>详细地址</text>
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
			<view class="section upload-info">
				<view class="tip">上传证照信息可获得更多优质运力</view>
				<view class="nav id-num">
					<image src="../../static/image/id-info@2x.png"></image>
					<text>证件信息</text>
					<text class="nav-tip">（身份证姓名需与联系人姓名一致）</text>
				</view>
				<view class="id-imgs">
					<view class="id-left">
						<image class="id-back" src="../../static/image/id-font@2x.png"></image>
						<image class="id-back" src="../../static/image/id-back@2x.png"></image>
					</view>
					<image class="id-right" src="../../static/image/business@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save">删除门店</view>
		<main-bussiness-input ref="mainBussinessInput"></main-bussiness-input>
	</view>
</template>

<script>
	import mainBussinessInput from './mainBussinessInput.vue'
	export default {
		components:{
			mainBussinessInput
		},
		data() {
			return {
				dataForm:{
					licenseType:'1',
					merchantType:'1'
				}
			}
		},
		methods: {
			/*主营业务*/
			showMainPop(){
				this.$refs['mainBussinessInput'].init()
			}
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
		overflow: hidden;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		line-height: 40px;
		border-bottom: solid 1px #EEEEEE60;
		color: #101E3E;
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
	.item-arrow{
		width: 24upx;
		height: 24upx;
	}
	.tip{
		background-color: #FFFFEA;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #E95008;
		text-align: center;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		overflow: hidden;
	}
	.upload-info{
		padding: 0px;
		overflow: hidden;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
	.nav-tip{
		color: #9FA7B6;
		font-size: 13px;
	}
	.id-num{
		padding: 30upx 23upx;
	}
	.id-imgs{
		display: flex;
		justify-content: space-between;
		padding: 0px 30upx 30upx 30upx;
		.id-left{
			flex: 1;
			.id-back{
				height: 193upx;
				width: 100%;
			}
		}
		.id-right{
			flex: 1;
			height: 405upx;
			margin-left: 20upx;
		}
	}
</style>
