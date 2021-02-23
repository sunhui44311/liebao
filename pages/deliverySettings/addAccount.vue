<template>
	<view class="box">
		<view class="section">
			<view class="cell">
				<text class="tlt">所属门店</text>
				<text class="content" style="flex: 1;text-align: right;margin-right: 12px;">请选择</text>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
			<view class="cell">
				<text class="tlt">登录账号</text>
				<input class="content"  placeholder="请输入"/>
			</view>
			<view class="cell">
				<text class="tlt">登录密码</text>
				<text class="content pwd">初始密码：123456</text>
			</view>
			<view class="cell">
				<text class="tlt">员工姓名</text>
				<input class="content"  placeholder="请输入"/>
			</view>
			<view class="cell">
				<text class="tlt">员工姓名</text>
				<u-switch></u-switch>
			</view>
		</view>
		<view class="save">保存</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.box{
		padding: 10px;
	}
	.section{
		padding: 0px 17px;
		background-color: white;
		border-radius: 6px;
	}
	.cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 35px;
		line-height: 35px;
		border-bottom: solid 1px #EEEEEE60;
		.tlt{
			font-size: 14px;
			color: #9EA7B7;
		}
		.arrow{
			width: 5px;
			height: 11px;
		}
	}
	.content{
		display: 1;
		text-align: right;
		font-size: 14px;
	}
	.pwd{
		color: #E95008;
	}
	.save{
		margin: 25px 20px;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		color: white;
		width: calc(100% - 40px);
		text-align: center;
		font-size: 16px;
		background-color: #E95008;
	}
</style>
