<template>
	<view class="box">
		<view class="section">
			<view class="section-tlt">选择时反馈类型</view>
			<view class="question-list">
				<view class="item item-select" :style="{width:itemWith+'px'}">账号问题</view>
				<view class="item" :style="{width:itemWith+'px'}">功能问题</view>
				<view class="item" :style="{width:itemWith+'px'}" style="margin-right: 0px;">优化建议</view>
				<view class="item" :style="{width:itemWith+'px'}">其他问题</view>
			</view>
		</view>
		<view class="section">
			<view class="section-tlt">问题描述</view>
			<textarea class="input-area" placeholder="请详细描述您的问题，我们会尽快解决"></textarea>
		</view>
		<view class="section">
			<view class="section-tlt">提交截图（最多3张）</view>
			<view class="img-list">
				<view class="img">
					<image src="../../static/image/card@2x.png"></image>
				</view>
				<view class="add-upload">
					<image src="../../static/image/add-upload@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="btn">确定</view>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	export default{
		data(){
			return{
				itemWith:0
			}
		},
		onLoad() {
			this.itemWith=(globalData.windowWidth-75)/3.0
		},
		methods:{
			
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
	.section{
		padding: 28upx 18upx;
		background-color: white;
		border-radius: 7px;
		margin-bottom: 10px;
	}
	.section-tlt{
		color: #0D1C40;
		font-size: 17px;
		margin-bottom: 32upx;
	}
	.question-list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.item{
		border: solid 1px #9EA7B7;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		margin-bottom: 26upx;
		margin-right: 33upx;
		font-size: 13px;
		border-radius: 4upx;
	}
	.item-select{
		background-color: #FDEEE7;
		color: #E95008;
		border: 1px solid #E95008;
	}
	.input-area{
		background-color: #F5F5F7;
		width: calc(100% - 33px);
		padding: 28upx 33upx;
	}
	.img-list{
		display: flex;
		justify-content: flex-start;
	}
	.add-upload{
		background-color: #F5F5F7;
		width: 160upx;
		height: 160upx;
		border-radius: 4upx;
		padding: 47upx;
		image{
			
			width: 66upx;
			height: 66upx;
		}
	}
	.img{
		width: 160upx;
		height: 160upx;
		margin-right: 20upx;
		image{
			width: 160upx;
			height: 160upx;
		}
	}
	.btn{
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		margin: 30px 20px 0px 20px
	}
</style>
