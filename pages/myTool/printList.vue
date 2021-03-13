<template>
	<view>
		<view class="nav" v-if="list.length>0">
			<view v-if="list.length>=2">
				<u-tabs :list="list" :is-scroll="true" active-color="#FA6F06" inactive-color="#4D5660"
					:current="current" @change="change"></u-tabs>
			</view>
			<view v-else>
				<view class="one-shop">
					<view id="tab" class="shop-name">{{list[0].name}}</view>
					<view class="bottom-bar" :style="{'left':offX+'px'}"></view>
				</view>
			</view>
		</view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="0" :bottom="0" @down="downCallback" :up="upOption"
			:down="{use:true}" @up="upCallback" @emptyclick="emptyClick">
			<view class="content">
				<view class="header">
					<view class="status-list">
						<view class="status" style="color: #5ab46e">
							<view style="font-size: 20px">1</view>
							<view>在线</view>
						</view>
						<view class="status" style="color: #9fa7b6">
							<view style="font-size: 20px">1</view>
							<view>离线</view>
						</view>
						<view class="status" style="color: #e84746">
							<view style="font-size: 20px">1</view>
							<view>异常</view>
						</view>
					</view>
					<view class="add-swper">
						<view @click.stop="add">添加</view>
					</view>
				</view>
				<view class="cell" v-for="(item, index) in devicelist" :key="index" @click="details(item.id)">
					<view class="cell-header">
						<view class="name">{{ item.name }}</view>
						<view class="cell-status">在线</view>
					</view>
					<view class="item">
						<image src="../../static/image/print-name@2x.png"></image>
						<text>{{ item.deviceName }}</text>
					</view>
					<view class="item">
						<image src="../../static/image/voice-num@2x.png"></image>
						<text style="font-size: 12px">{{ item.deviceSecret }}</text>
						<view class="btn">打印测试</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js"
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollUni
		},
		data() {
			return {
				list: [],
				offX: 0,
				current: 0,
				devicelist: [],
				upOption: {
					use:true,
					page: {
						num: 0,
						size: 100000 // 每页数据的数量
					},
					isLock:true,
					isBounce: true,
					textNoMore: '没有更多数据',
					noMoreSize: 10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: true,
						tip: "暂无相关数据~",
						icon: 'https://ecloud-cdn.51sssd.com/20210313/bdb9f357839e4575b3cdbc20e12f3511.png'
					}
				}
			};
		},
		onShow() {
			this.http_shop();
		},
		methods: {
			http_shop() {
				let _this = this
				let params = {
					url: "app/shop/list",
					method: "GET",
					data: {},
					callBack: (res) => {
						this.list = res.data;
						this.mescroll.endSuccess(this.list.length);
						this.http_device();
						let info = uni.createSelectorQuery().in(this).select(".shop-name");
						info.boundingClientRect(function(data) {
							if (data) {
								_this.offX = data.left + (data.width - 35) / 2.0
							}
						}).exec(function(res) {})
					},
				};
				this.$http.request(params);
			},
			http_device() {
				let params = {
					url: "app/shop/device/list",
					method: "GET",
					data: {
						deviceType: 2,
						shopId: this.list[this.current].id,
					},
					callBack: (res) => {
						this.devicelist = res.data;
					},
				};
				this.$http.request(params);
			},
			change(index) {
				this.current = index;
			},
			add() {
				uni.navigateTo({
					url: `/pages/myTool/addPrint?shopId=${this.list[this.current].id}`,
				});
			},
			details(id) {
				uni.navigateTo({
					url: `/pages/myTool/addPrint?id=${id}`,
				});
			},
			downCallback() {
				//联网加载数据
				console.log(1111)
				this.http_shop()
			},
			// 主动触发下拉刷新
			triggerDownScroll() {
				this.mescroll.scrollTo(0, 0)
				this.mescroll.triggerDownScroll()
			},

			emptyClick() {

			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f6f7f9;
	}

	.nav {
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		z-index: 99;
	}

	.one-shop {
		height: 40px;
		line-height: 40px;
		background-color: white;
		display: flex;
		justify-content: flex-start;
		position: relative;
		padding: 0px 16px;
	}

	.shop-name {
		color: #FA6F06;
		font-size: 14px;
	}

	.bottom-bar {
		position: absolute;
		width: 35px;
		height: 3px;
		top: 35px;
		background-color: #FA6F06;
	}

	.content {
		padding: 20upx;
		margin-top: 40px;
	}

	.header {
		height: 160upx;
		background-color: white;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 7px;

		.status-list {
			width: 60%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 13px;

			.status {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}

		.add-swper {
			width: 30%;

			view {
				background-color: #fa6f06;
				height: 48upx;
				width: 120upx;
				text-align: center;
				line-height: 48upx;
				border-radius: 24upx;
				color: white;
			}
		}
	}

	.cell {
		background-color: white;
		padding: 28upx 24upx;
		border-radius: 7px;

		.cell-header {
			display: flex;
			justify-content: space-between;

			.cell-status {
				background-color: #effdee;
				color: #33bb66;
				font-size: 12px;
				text-align: center;
				height: 32upx;
				width: 70upx;
			}
		}
	}

	.name {
		color: #0d1c40;
		font-size: 15px;
		margin-bottom: 12px;
	}

	.item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 8px;
		position: relative;

		image {
			width: 28upx;
			height: 28upx;
		}

		text {
			color: #0d1c40;
			font-size: 13px;
			margin-left: 6px;
		}

		.btn {
			position: absolute;
			right: 0px;
			width: 120upx;
			height: 48upx;
			line-height: 48upx;
			background: #ffffff;
			border: 1px solid #fa6f06;
			border-radius: 24upx;
			font-size: 12px;
			color: #fa6f06;
			text-align: center;
		}
	}
</style>
