<template>
	<view class="content">
		<view class="cell">
			<view class="header">
				<view class="num">
					<view>门店编号：10091</view>
					<view class="copy">复制</view>
				</view>
				<view class="name">猎豹演示门店</view>
				<view class="location">
					<image class="icon" src="../../static/image/location@2x.png"></image>
					<view>上海安慧里1区88号楼1单元州001</view>
				</view>
				<view class="location">
					<image class="icon" src="../../static/image/customer@2x.png"></image>
					<view>闪先生：898832323</view>
				</view>
			</view>
			<view class="footer">
				<view class="txt">已获得运力</view>
				<view class="img-list">
					<image class="img" src="../../static/image/meituan@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="add" @click.stop="add">新增门店</view>
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
					url:'/pages/shop/addShop'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F6F7F9;
	}
	.content{
		margin: 10px;
	}
	.cell{
		background-color: white;
		border-radius: 4px;
		overflow: hidden;
	}
	.header{
		padding: 16px 10px 8px 10px;
	}
	.num{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #4D5660;
		font-size: 14px;
		.copy{
			color: #FA6F06;
			border: solid 1px #E95008;
			font-size: 12px;
			padding: 2px 6px;
			border-radius: 3px;
			margin-left: 14px;
		}
	}
	.name{
		color: #0D1C40;
		font-size: 15px;
		margin-bottom: 8px;
		margin-top: 8px;
	}
	.location{
		display: flex;
		justify-content: flex-start;
		margin-bottom: 8px;
	}
	.icon{
		width: 16px;
		height: 16px;
	}
	.footer{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 38px;
		line-height: 38px;
		background-color: #F8EEE8;
		padding-left: 10px;
		.txt{
			color: #4D5660;
			font-size: 13px;
			margin-right: 6px;
		}
	}
	.img-list{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.img{
		width: 22px;
		height: 22px;
	}
	.add{
		position: fixed;
		bottom: 20px;
		width: calc(100% - 20px);
		background-color: #E95008;
		color: white;
		font-size: 16px;
		text-align: center;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
	}
</style>
