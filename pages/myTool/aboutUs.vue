<template>
	<view class="box">
		<image class="logo" src="../../static/image/logo@2x.png"></image>
		<view style="margin-top: 10px;">V1.0.0</view>
		<view class="cell" style="margin-top: 150upx;">
			<text style="color: #13203C;">微信公众号</text>
			<text style="color: #A0A7B5;">woheni2021</text>
		</view>
		<view class="cell" style="40px">
			<text style="color: #13203C;">客服电话</text>
			<text style="color: #A0A7B5;">400-888-888</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 64upx;
	}
	.logo{
		height: 112upx;
		width: 283upx;
		margin-top: 20px;
	}
	.cell{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		font-size: 14px;
	}
</style>
