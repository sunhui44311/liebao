<template>
	<view>
		<view class="box">
			<view class="tlt">修改密码</view>
			<view class="cell">
				<text class="pre">+86</text>
				<input style="flex: 1;"  placeholder="请输入手机号"/>
			</view>
			<view class="cell">
				<input style="flex: 1;" placeholder="请输入验证码"/>
				<view class="send">获取验证码</view>
			</view>
			<view class="cell">
				<input style="flex: 1;" placeholder="请输入密码"/>
			</view>
			<view class="login">确认设置</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.box{
		margin: 30px 24px;
	}
	.tlt{
		color: #0D1C40;
		font-size: 20px;
		margin-bottom: 30px;
	}
	.cell{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 10px;
		margin-bottom: 15px;
		border-bottom: solid 1px #CCCCCC60;
		.pre{
			color: #0D1C40;
			margin-right: 25px;
		}
	}
	.send{
		color: #E95008;
		font-size: 14px;
		margin-right: 40px;
	}

	.tip{
		color: #9EA7B7;
		font-size: 12px;
	}
	.login{
		height: 45px;
		background-color: #E95008;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		margin: 40px 20px 12px 20px;
		opacity: 0.5;
	}
</style>
