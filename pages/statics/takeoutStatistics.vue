<template>
	<view>
		<view class="nav" @click.stop="filter_Click">
			<view class="tab">
				<view>{{shopName?shopName:'全部门店'}}</view>
				<image src="../../static/image/dibiao2.png"></image>
			</view>
			<view class="tab">
				<view>{{timeName}}</view>
				<image src="../../static/image/dibiao2.png"></image>
			</view>
		</view>
		<view class="box">
			<view class="section" v-for="(item,index) in dataList" :key="index">
				<view class="section-tlt">{{item.name}}</view>
				<view class="list">
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>当日订单</text>
						</view>
						<view class="num">{{item.orderNum}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-money@2x.png"></image>
							<text>当日收入</text>
						</view>
						<view class="num">{{item.income}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-tui@2x.png"></image>
							<text>当日退单</text>
						</view>
						<view class="num">{{item.chargeback}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-shiji@2x.png"></image>
							<text>当日实收</text>
						</view>
						<view class="num" style="color: #DD7E42;">{{item.receipts}}</view>
					</view>
				</view>
				<image class="logo" :src="item.logo"></image>
			</view>
		</view>
		<statistics-filter ref="statisticsFilter" @statistics="filerCallBack"></statistics-filter>
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
				shopName:'',
				timeName:'今日',
				dataForm: {
					shopId: 0,
					endTime: '',
					startTime: '',
					timeType: 1
				},
				dataList:[]
			}
		},
		onLoad() {
			this.getData()
		},
		methods:{
			filter_Click(){
				this.$refs['statisticsFilter'].init()
			},
			filerCallBack(data){
				this.dataForm=data
				this.shopName=data.shopName
				this.timeName=data.timeName
				this.getData()
			},
			getData() {
				var params = {
					url: 'app/statistics/waimai',
					method: 'GET',
					data: this.dataForm,
					callBack: (res) => {
						uni.hideLoading()
						this.dataList = res.data
					}
				}
				uni.showLoading({
					title: '正在加载',
					mask: true
				})
				this.$http.request(params)
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
		position: fixed;
		top: 0px;
		left: 0px;
		right:0px;
		z-index: 999;
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
		margin-top: 30px;
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
