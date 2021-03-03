<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<view class="pop-tlt">统计筛选</view>
					<image src="../../static/image/delete.png"></image>
				</view>
				<scroll-view scroll-y="true" style="height: 500upx;padding: 24upx 70upx;">
					<view class="cell">
						<view class="cell-tlt">门店</view>
						<view class="shop-list">
							<view class="select">门店1</view>
							<view class="noselect">门店1</view>
							<view class="noselect">门店1</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-tlt">时间</view>
						<view class="shop-list">
							<view class="select month" :style="{width:itemW+'px'}" style="border-radius: 28upx;">今日</view>
							<view class="noselect month" :style="{width:itemW+'px'}" style="border-radius: 28upx;">昨日</view>
							<view class="noselect month" :style="{width:itemW+'px'}" style="border-radius: 28upx;"> 本月</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-tlt">自定义时间</view>
						<view class="date-list">
							<view class="date-item" @click="selectDate(1)">
								<view>{{startTime}}</view>
								<image src="../../static/image/dibiao2.png"></image>
							</view>
							<view class="date-line"></view>
							<view class="date-item" @click="selectDate(2)">
								<view>{{endTime}}</view>
								<image src="../../static/image/dibiao2.png"></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	export default{
		mame:'showSetting',
		data(){
			return{
				show:false,
				itemW:0,
				startTime:'选择开始时间',
				endTime:'选择结束时间'
			}
		},
		onLoad() {
			
		},
		methods:{
			init(){
				this.show=true
				this.itemW=(globalData.windowWidth-105)/3.0
			},
			selectDate(type){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 32px;
		image{
			width: 12px;
			height:12px;
		}
	}
	
	.pop-tlt{
		color: #0D1C40;
		font-size: 15px;
		font-weight: bold;
		flex: 1;
		text-align: center;
	}
	.cell{
		margin-bottom: 40upx;
	}
	.cell-tlt{
		color: #0D1C40;
		font-size: 15px;
	}
	.shop-list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-top: 15px;
		view{
			font-size: 13px;
			height: 56upx;
			padding: 0px 26upx;
			border-radius: 4upx;
			line-height: 56upx;
			margin-right: 35upx;
		}
	}

	
	.select{
		color: #E95008;
		font-size: 13px;
		background-color: #FDEEE7;
		border: solid 1px #E95008;
	}
	
	.noselect{
		color: #0D1C40;
		font-size: 13px;
		border: solid 1px #9EA7B7;
	}
	.month{
		text-align: center;
		border-radius: 28px;
	}
	
	/*日期*/
	.date-list{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		width: calc(100% - 70px);
	}
	
	.date-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 130px;
		height: 24px;
		padding: 0px 12px;
		border: solid 1px #DDDDDD;
		border-radius: 12px;
		view{
			flex: 1;
			text-align: center;
			color: #333333;
			font-size: 12px;
		}
		image{
			width: 15upx;
			height: 8upx;
		}
	}
	.date-line{
		width: 23px;
		height: 1px;
		background-color: #DDDDDD;
		margin: 0px 10px;
	}
</style>
