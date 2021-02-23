<template>
	<view class="box">
		<view class="cell">
			<view>1001</view>
			<view class="item" style="margin-top: 10px;margin-bottom: 5px;">
				<image src="../../static/image/add_shop@2x.png"></image>
				<text>演示门店1</text>
			</view>
			<view class="item">
				<image src="../../static/image/user@2x.png"></image>
				<text style="flex: 1;">刘德海</text>
				<view class="menu-list">
					<view class="menu stop">启用</view>
					<view class="menu reset">重置密码</view>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save" @click.stop="add">新增门店账号</view>
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
					url:'/pages/deliverySettings/addAccount'
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
		padding: 16px 10px;
		border-radius: 4px;
	}
	.item{
		display: flex;
		justify-content: flex-start;
		color: #0D1C40;
		font-size: 13px;
		image{
			width: 16px;
			height: 16px;
		}
	}
	.menu-list{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.menu{
			height: 24px;
			width: 60px;
			line-height: 24px;
			text-align: center;
			border-radius: 12px;
		}
		.stop{
			border: solid 1px #3987F6;
			color: #3987F6;
			font-size: 13px;
			margin-right: 10px;
		}
		.reset{
			width: 80px;
			background-color: #E95008;
			color: white;
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
