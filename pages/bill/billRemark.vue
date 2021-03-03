<template>
	<view>
		<textarea class="txtarea" placeholder="可输入物品描述或送件要求。 如：易碎物品，请轻拿轻放"></textarea>
		<view class="btn">完成</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.txtarea{
		background-color: #F5F5F7;
		height: 279upx;
		font-size: 13px;
		margin: 10px;
		width: calc(100% - 40px);
		padding: 10px;
		border-radius: 6px;
	}
	.btn{
		position: relative;
		margin-top: 50px;
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		text-align: center;
		color: white;
		width: calc(100% - 20px);
		left: 50%;
		transform: translateX(-50%);
		font-size: 16px;
	}
</style>
