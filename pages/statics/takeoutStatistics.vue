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
				<view class="section-tlt">外卖统计</view>
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
							<text>当日收入</text>
						</view>
						<view class="num">0.0</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-tui@2x.png"></image>
							<text>当日退单</text>
						</view>
						<view class="num">0.0</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-shiji@2x.png"></image>
							<text>当日实收</text>
						</view>
						<view class="num" style="color: #DD7E42;">0.0</view>
					</view>
				</view>
				<image class="logo" src="../../static/image/meituan-logo@2x.png"></image>
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
		color: #0D1C40;
		font-size: 15px;
		margin-bottom: 6px;
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
		justify-content: flex-start;
		align-items: center;
		image{
			width: 48upx;
			height: 48upx;
		}
	}
	.num{
		width: 70px;
		text-align: center;
		color: #0D1C40;
		font-size: 16px;
	}
	
	.logo{
		position: absolute;
		top: 10px;
		right: 10px;
		height: 44upx;
		width: 44upx;
	}
</style>
