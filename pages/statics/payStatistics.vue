<template>
	<view class="box">
		<view class="section">
			<view class="tab-list">
				<view class="tab">
					<view style="margin-left: -40px;">门店统计</view>
					<image src="../../static/image/dibiao2.png"></image>
				</view>
				<view class="tab">
					<view class="tab-item tab-select">今天</view>
					<view class="tab-item">昨天</view>
					<view class="tab-item-right">自定义</view>
				</view>
			</view>
			<view class="card-list">
				<view class="card">
					<view class="num">107.00</view>
					<view class="card-tlt">销售总额</view>
				</view>
				<view class="card" style="margin-left: 30upx;">
					<view class="num">0.00</view>
					<view class="card-tlt">充值总额</view>
				</view>
			</view>
			<view class="pay-statics-list">
				<view class="pay-cell">
					<view class="pay-tlt">交易总额</view>
					<view class="pay-money">107.00</view>
					<view class="pay-mount">10笔</view>
				</view>
				<view class="pay-cell">
					<view class="pay-tlt">退款总额</view>
					<view class="pay-money">0.00</view>
					<view class="pay-mount">0笔</view>
				</view>
			</view>
			<view class="pay-statics-list bottom-list">
				<view class="pay-cell">
					<view class="pay-tlt">活动抵扣</view>
					<view class="pay-money">107.00</view>
					<view class="pay-mount">10笔</view>
				</view>
				<view class="pay-cell">
					<view class="pay-tlt">会员抵扣</view>
					<view class="pay-money">0.00</view>
					<view class="pay-mount">0笔</view>
				</view>
				<view class="pay-cell">
					<view class="pay-tlt">积分抵扣</view>
					<view class="pay-money">0.00</view>
					<view class="pay-mount">0笔</view>
				</view>
			</view>
		</view>
		<view class="section" style="padding-left: 0px;padding-right: 0px;">
			<view class="tab-list" style="padding-left: 40upx;padding-right: 40upx;">
				<view class="tab-chart">
					<view class="chart-tlt">交易额趋势</view>
				</view>
				<view class="tab-chart section-tab">
					<view class="tab-item tab-select" style="width: 60px;">近七日</view>
					<view class="tab-item-right">近30天</view>
				</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :disable-scroll="true" @touchstart="touchLineA"
				 @touchmove="touchMove" @touchend="touchEnd"></canvas>
			</view>
		</view>
		<view class="section" style="padding-left: 0px;padding-right: 0px;">
			<view class="tab-list" style="padding-left: 40upx;padding-right: 40upx;">
				<view class="tab-chart">
					<view class="chart-tlt">新增会员趋势</view>
				</view>
				<view class="tab-chart section-tab">
					<view class="tab-item tab-select" style="width: 60px;">近七日</view>
					<view class="tab-item-right">近30天</view>
				</view>
			</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :disable-scroll="true" @touchstart="touchLineB"
				 @touchmove="touchMoveB" @touchend="touchEndB"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	var canvaLineA = null;
	var canvaLineB = null;
	import uCharts from '../../common/u-charts/u-charts.min.js';
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				chartData: {
					categories: ['2012', '2013', '2014', '2015', '2016', '2017','2018'],
					series: [{
						name: '成交量A',
						data: [100, 80, 95, 150, 112, 132,145],
						color: '#DB5F29'
					}]
				}
			}
		},
		onLoad() {
			_self = this
			_self.cWidth = uni.upx2px(700);
			_self.cHeight = uni.upx2px(500);
			let LineA = {
				categories: [],
				series: []
			};
			let LineB = {
				categories: [],
				series: []
			};
			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
			LineA.categories = this.chartData.categories;
			LineA.series = [this.chartData.series[0]];
			LineB.categories = this.chartData.categories;
			LineB.series = [this.chartData.series[0]];
			_self.showLineA("canvasLineA", LineA);
			_self.showLineA("canvasLineB", LineA);
		},
		methods: {
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize: 11,
					legend: {
						show: false,
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true,
					xAxis: {
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount:5,
						scrollShow:false,
						scrollAlign:'left',
						rotateLabel:true
					},
					yAxis: {
						// disabled: true,
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: 100,
						format: (val) => {
							return val.toFixed(0) + '元'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						area: {
							type: 'straight',
							opacity: 0.1,
							addLine: true,
							width: 1
						}
					}
				});
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
				canvaLineA.scrollStart(e);
			},

			touchMove(e) {
				canvaLineA.scroll(e);
			},
			touchEnd(e) {
				canvaLineA.scrollEnd(e);
			},
			
			touchLineB(e) {
				canvaLineB.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
				canvaLineB.scrollStart(e);
			},
			
			touchMoveB(e) {
				canvaLineB.scroll(e);
			},
			touchEndB(e) {
				canvaLineB.scrollEnd(e);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F7F9;
	}

	.box {
		padding: 10px;
	}

	.section {
		padding: 30upx 40upx 8upx 40upx;
		background-color: white;
		border-radius: 7px;
		margin-bottom: 10px;
	}

	.tab-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30upx;
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

	.tab-item {
		border-right: solid 1px #DDDDDD;
		padding-right: 22upx;
		padding-left: 22upx;
		flex: 1;
	}

	.section-tab {
		display: flex;
		justify-content: flex-end;
	}

	.tab-item-right {
		border-right: none;
		padding-left: 22upx;
		padding-right: 0upx;
		text-align: right;
	}

	.tab-select {
		color: #D2834E;
	}

	.card-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card {
		height: 70px;
		background: linear-gradient(-40deg, #FD3740, #FB832A);
		border-radius: 4px;
		flex: 1;
		padding: 28upx;

		.num {
			font-size: 20px;
			font-weight: bold;
			color: white;
		}

		.card-tlt {
			font-size: 12px;
			color: white;
		}
	}

	.pay-statics-list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: solid 1px #EEEEEE;

		.pay-cell {
			width: 80px;
			padding: 20upx 20upx;

			.pay-money {
				color: #4E565F;
				font-weight: bold;
				font-size: 20px;
			}

			.pay-mount {
				color: #4E565F;
				font-size: 10px;
			}
		}

		.pay-tlt {
			color: #9FA7B6;
			font-size: 12px;
		}
	}

	.bottom-list {
		border-bottom: none;
	}

	.tab-chart {
		.chart-tlt {
			color: #0D1C40;
			font-size: 15px;
		}
	}


	.qiun-charts {
		width: 700upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 700upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
