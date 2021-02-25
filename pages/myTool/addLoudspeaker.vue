<template>
	<view class="box">
		<view class="section">
			<view class="section-tlt">选择云音响</view>
			<view class="voice-list">
				<view class="item">
					<image class="item-bg" src="../../static/image/visit-bg@2x.png"></image>
					<view class="voice-name">政通云音响</view>
					<image class="flg" src="../../static/image/voice-select-no@2x.png"></image>
				</view>
				<view class="item" style="margin-left: 23upx;">
					<image class="item-bg" src="../../static/image/visit-bg@2x.png"></image>
					<view class="voice-name">政通云音响</view>
					<image class="flg" src="../../static/image/voice-select-no@2x.png"></image>
				</view>
			</view>
			<view class="input-cell" style="margin-top: 20px;">
				<text>云音响名称</text>
				<input placeholder="给这台音响取个名字吧"/>
			</view>
			<view class="input-cell">
				<text>云音响编号</text>
				<input placeholder="请填写"/>
			</view>
		</view>
		<view class="section" style="margin-top: 10px;">
			<view class="section-header">
				<view class="section-tlt">播报设置</view>
				<view class="voice-off">
					<text style="color: #101E3E;font-size: 14px;">是否开启语音播报</text>
					<u-switch></u-switch>
				</view>
			</view>
			<view>
				<view class="cell-item" v-for="(item,index) in menuList" :key="index">
					<text>{{item.title}}</text>
					<view class="cell-right">
						<text>播报次数</text>
						<view class="uni-number">
							<view class="add-reduce">-</view>
							<view>0</view>
							<view class="add-number">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">确定</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				menuList:[
					{
						title:'新订单提醒'
					},
					{
						title:'配送被骑手接单'
					},
					{
						title:'配送 2 分钟无人接单'
					},
					{
						title:'配送被骑手取消'
					},
					{
						title:'订单被顾客取消'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F6F7F9;
	}
	.box{
		margin: 10px;
	}
	.section{
		padding: 20px 15px;
		background-color: white;
		border-radius: 6px;
	}
	.section-tlt{
		color: #222222;
		font-size: 15px;
		margin-bottom: 22upx;
	}
	.voice-list{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.item{
			flex: 1;
			position: relative;
			.item-bg{
				height: 161upx;
				width: 100%;
			}
		}
		.flg{
			position: absolute;
			bottom: 5px;
			right: 0px;
			width: 42upx;
			height: 42upx;
		}
	}
	.voice-name{
		position: absolute;
		top: 20upx;
		left: 15upx;
		color: #101E3E;
		font-size: 16px;
	}
	
	.input-cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 35px;
		line-height: 35px;
		text{
			color: #9EA7B7;
			font-size: 14px;
		}
		input{
			flex: 1;
			text-align: right;
			font-size: 14px;
		}
	}
	
	.voice-off{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.section-header{
		padding-bottom: 25upx;
		border-bottom: solid 1px #EEEEEE;
	}
	
	.cell-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #101E3E;
		font-size: 14px;
		margin-top: 25upx;
	}
	.cell-right{
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.uni-number{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 40upx;
		width: 132upx;
		border-radius: 20upx;
		border: solid 1px #DDDDDD;
		overflow: hidden;
		margin-left: 20upx;
		view{
			flex: 1;
			text-align: center;
			height: 40upx;
			color: #101E3E;
			font-size: 12px;
		}
		.add-reduce{
			border-right: solid 1px #DDDDDD;
		}
		.add-number{
			background-color: #FAEEE7;
			color: #E95008;
			border-left: solid 1px #DDDDDD;
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
		margin: 30px 20px
	}
</style>
