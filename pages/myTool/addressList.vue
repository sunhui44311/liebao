<template>
	<view class="box">
		<view class="cell">
			<view class="item">
				<view class="flag">默认</view>
				<view class="address">苏州纳米科技园</view>
			</view>
			<view class="item info"> 
				<text>张先生</text>
				<text style="margin-left: 8px;">13815296639</text>
			</view>
			<image class="edit" src="../../static/image/edit@2x.png"></image>
		</view>
		<view class="btn" @click.stop="add">添加地址</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			add(){
				uni.navigateTo({
					url:'/pages/myTool/addAddress'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.box{
		padding: 10px;
	}
	.cell{
		background-color: white;
		padding: 28upx 42upx;
		border-radius: 12upx;
		position: relative;
	}
	.flag{
		background-color: #FAEEE7;
		color: #E95008;
		font-size: 12px;
		width: 70upx;
		height: 32upx;
		line-height: 32upx;
		border-radius: 4upx;
		text-align: center;
	}
	.item{
		display: flex;
		justify-content: flex-start;
	}
	.address{
		color: #0D1C40;
		font-size: 14px;
		margin-left: 8px;
		margin-top: -2px;
	}
	.info{
		color: #9FA7B6;
		font-size: 12px;
		margin-top: 8px;
	}
	.edit{
		position: absolute;
		right: 42upx;
		bottom: 15px;
		width: 24upx;
		height: 24upx;
		padding: 10upx;
	}
	
	.btn{
		position: fixed;
		bottom: 0upx;
		width: calc(100% - 60px);
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		margin: 30px 20px
	}
</style>
