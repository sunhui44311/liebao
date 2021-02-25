<template>
	<view>
		<view class="nav" @click.stop="filter_Click">
			<view class="tab">
				<view>门店统计</view>
				<image src="../../static/image/dibiao2.png"></image>
			</view>
			<view class="tab">
				<view>今日</view>
				<image src="../../static/image/dibiao2.png"></image>
			</view>
		</view>
		<view class="box">
			<view class="section">
				<view class="section-tlt">
					<image src="../../static/image/static-meituan@2x.png"></image>
					<view>美团配送</view>
				</view>
				<view class="list">
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>当日订单</text>
						</view>
						<view class="num">0</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-money@2x.png"></image>
							<text>当日消费</text>
						</view>
						<view class="num" style="color: #DB5F29;">0.0</view>
					</view>
				</view>
			</view>
		</view>
		<statistics-filter ref="statisticsFilter"></statistics-filter>
	</view>
</template>

<script>
	import statisticsFilter from './statisticsFilter.vue'
	export default{
		components:{
			statisticsFilter
		},
		data(){
			return{
				
			}
		},
		methods:{
			filter_Click(){
				this.$refs['statisticsFilter'].init()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60upx;
		background-color: white;
	}
	.tab{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #4D5660;
		font-size: 14px;
		image{
			width: 15upx;
			height: 8upx;
			margin-left: 15upx;
		}
	}
	
	.box{
		padding: 10px;
	}
	
	.section{
		background-color: white;
		padding: 28upx 15upx;
		position: relative;
		margin-bottom: 10px;
		border-radius: 7px;
	}
	
	.section-tlt{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #0D1C40;
		font-size: 15px;
		margin-bottom: 6px;
		image{
			width: 51upx;
			height: 51upx;
			margin-right: 14upx;
		}
	}
	
	.list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	
	.list-item{
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		width: 50%;
	}
	
	.item{
		color: #4E565F;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: -55px;
		image{
			width: 48upx;
			height: 48upx;
		}
	}
	.num{
		text-align: center;
		width: 70px;
		margin-left: 30px;
		color: #0D1C40;
		font-size: 16px;
	}
</style>
