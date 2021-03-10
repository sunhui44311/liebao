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
			<view class="section">
				<view class="section-tlt">外卖统计</view>
				<view class="list">
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>外卖订单</text>
						</view>
						<view class="num">{{staticData.waimai.orderNum}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-money@2x.png"></image>
							<text>外卖收入</text>
						</view>
						<view class="num">{{staticData.waimai.income}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-tui@2x.png"></image>
							<text>外卖退单</text>
						</view>
						<view class="num">{{staticData.waimai.chargeback}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-shiji@2x.png"></image>
							<text>外卖实收</text>
						</view>
						<view class="num" style="color: #DD7E42;">{{staticData.waimai.receipts}}</view>
					</view>
				</view>
				<image class="logo" src="../../static/image/waimai-static@2x.png"></image>
			</view>
			<view class="section">
				<view class="section-tlt">配送统计</view>
				<view class="list">
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>配送订单</text>
						</view>
						<view class="num">{{staticData.delivery.deliveryNum}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-money@2x.png"></image>
							<text>配送支出</text>
						</view>
						<view class="num">{{staticData.delivery.expenses}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-tui@2x.png"></image>
							<text>配送退款</text>
						</view>
						<view class="num">{{staticData.delivery.refund}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-shiji@2x.png"></image>
							<text>配送实付</text>
						</view>
						<view class="num" style="color: #DD7E42;">{{staticData.delivery.payMoney}}</view>
					</view>
				</view>
				<image class="logo" src="../../static/image/peisong-static@2x.png"></image>
			</view>
			<view class="section">
				<view class="section-tlt">支付统计</view>
				<view class="list">
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-order@2x.png"></image>
							<text>支付订单</text>
						</view>
						<view class="num">{{staticData.charge.payOrderNum}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-money@2x.png"></image>
							<text>支付收款</text>
						</view>
						<view class="num">{{staticData.charge.collection}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-tui@2x.png"></image>
							<text>支付退款</text>
						</view>
						<view class="num">{{staticData.charge.payRefund}}</view>
					</view>
					<view class="list-item">
						<view class="item">
							<image src="../../static/image/statics-shiji@2x.png"></image>
							<text>支付实收</text>
						</view>
						<view class="num" style="color: #DD7E42;">{{staticData.charge.payMoney}}</view>
					</view>
				</view>
				<image class="logo" src="../../static/image/pay-static@2x.png"></image>
			</view>
		</view>
		<statistics-filter ref="statisticsFilter" @statistics="filerCallBack"></statistics-filter>
	</view>
</template>

<script>
	import statisticsFilter from './statisticsFilter.vue'
	export default {
		components: {
			statisticsFilter
		},
		data() {
			return {
				shopName:'',
				timeName:'今日',
				dataForm: {
					shopId: 0,
					endTime: '',
					startTime: '',
					timeType: 1
				},
				staticData: {
					"charge": {
						"collection": 0,
						"payMoney": 0,
						"payOrderNum": 0,
						"payRefund": 0
					},
					"delivery": {
						"deliveryNum": 0,
						"expenses": 0,
						"payMoney": 0,
						"refund": 0
					},
					"waimai": {
						"chargeback": 0,
						"income": 0,
						"orderNum": 0,
						"receipts": 0
					}
				}
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			filter_Click() {
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
					url: 'app/statistics/shop',
					method: 'GET',
					data: this.dataForm,
					callBack: (res) => {
						uni.hideLoading()
						this.staticData = res.data
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
	page {
		background-color: #F6F7F9;
	}

	.nav {
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

	.tab {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #4D5660;
		font-size: 14px;

		image {
			width: 15upx;
			height: 8upx;
			margin-left: 15upx;
		}
	}

	.box {
		padding: 10px;
		margin-top: 30px;
	}

	.section {
		background-color: white;
		padding: 28upx 15upx;
		position: relative;
		margin-bottom: 10px;
		border-radius: 7px;
	}

	.section-tlt {
		color: #0D1C40;
		font-size: 15px;
		margin-bottom: 6px;
	}

	.list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.list-item {
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		width: 50%;
	}

	.item {
		color: #4E565F;
		font-size: 12px;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		image {
			width: 48upx;
			height: 48upx;
		}
	}

	.num {
		width: 70px;
		text-align: center;
		color: #0D1C40;
		font-size: 16px;
	}

	.logo {
		position: absolute;
		right: 0px;
		bottom: 0px;
		height: 100upx;
		width: 100upx;
	}
</style>
