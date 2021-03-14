<template>
	<view style="position: relative;">
		<view id="list">
			<u-navbar :is-back="false" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#FFFFFF"
				title-color="#FFFFFF" title="" :background="{background:'#FFFFFF'}">
				<view class="slot-wrap">
					<view class="title">订单</view>
					<image class="right-icon" src="@/static/image/sousuo.png" @click.stop="search_Click"></image>
				</view>
			</u-navbar>
			<view v-if="isLogin">
				<view class="tab-bar">
					<u-tabs :list="tabs" :is-scroll="false" active-color="#FA6F06" inactive-color="#9EA7B7"
						:current="current" @change="tabsChange"></u-tabs>
				</view>
				<mescroll-uni ref="mescrollRef" :top="listTop" :bottom="0" @down="downCallback" :up="upOption"
					@init="mescrollInit" @up="upCallback">
					<view class="order-list">
						<view v-for="(item,index) in list" :key="index">
							<order-cell :model="item" @click.native="order_Click(item.id)" @cancel="cancelDd"
								@usertip="usertip"></order-cell>
						</view>
					</view>
				</mescroll-uni>
				<can-order-vue ref="canOrderVue" @cancel="qrcancel"></can-order-vue>
				<add-tip-vue ref="addTipVue" @confirm_tip="confirm_tip"></add-tip-vue>
			</view>
			<view v-else>
				<view class="no-login">
					<text>您还未登录,</text><text style="color: #E95008;margin-left: 8px;" @click.stop="login">去登录</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import MescrollMixin from "../../../components/mescroll-uni/mescroll-mixins.js"
	import MescrollUni from "../../../components/mescroll-uni/mescroll-uni.vue"
	import canOrderVue from './canOrderVue.vue'
	import orderCell from './orderCell.vue'
	import addTipVue from './addTipVue.vue'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				tabs: [{
					name: '待接单',
					id: 1
				}, {
					name: '待取货',
					id: 2
				}, {
					name: '配送中',
					id: 3
				}, {
					name: '已完成',
					id: 4
				}, {
					name: '已取消',
					id: -1
				}, {
					name: '待支付',
					id: 0
				}],
				current: 0,
				order: null,
				listTop: 210,
				query: {
					pageNum: 1,
					pageSize: 10,
				},
				upOption: {
					page: {
						num: 0,
						size: 10 // 每页数据的数量
					},
					isBounce: true,
					textNoMore: '没有更多数据',
					noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: true,
						tip: "暂无相关数据~",
						icon: 'https://ecloud-cdn.51sssd.com/20210313/bdb9f357839e4575b3cdbc20e12f3511.png'
					}
				},
				list: [],
				isLogin: true

			};
		},
		methods: {
			downCallback() {
				this.reset_updata()
			},
			upCallback() {
				this.updata()
			},
			// 用于初始化一些数据
			init() {
				if (this.isLogin) {
					this.http_marker()
				}
			},
			order_Click(id) {
				uni.navigateTo({
					url: `/pages/order/deliveryOrderDetail?id=${id}`
				})
			},
			login() {
				uni.navigateTo({
					url: '/pages/login/loginHome'
				})
			},
			search_Click() {
				uni.navigateTo({
					url: '/pages/order/orderSearch'
				})
			},
			// 用于更新一些数据
			updata() {
				let params = {
					url: "app/order/list",
					method: "GET",
					data: {
						status: this.tabs[this.current].id,
						pageNum: this.query.pageNum,
						pageSize: this.query.pageSize
					},
					callBack: (res) => {
						this.list = [...this.list, ...res.data.data]
						this.mescroll.endSuccess(res.data.data.length);
						this.query.pageNum++
					},
					errCallBack: (error) => {
						this.mescroll.endErr();
					}
				};
				this.$http.request(params);
			},
			tabsChange(index) {
				this.current = index;
				this.reset_updata()
			},

			reset_updata() {
				this.query.pageNum = 1
				this.list = []
				this.updata()
			},
			http_marker() {
				let params = {
					url: "app/order/marker",
					method: "GET",
					data: {},
					callBack: (res) => {
						let arr = [{
							name: '待接单',
							count: res.data.toBeReceivedNum,
							id: 1
						}, {
							name: '待取货',
							count: res.data.toBePickedNum,
							id: 2
						}, {
							name: '配送中',
							count: res.data.inDeliveryNum,
							id: 3
						}, {
							name: '已完成',
							count: res.data.completedNum,
							id: 4
						}, {
							name: '已取消',
							count: res.data.cancelNum,
							id: '-1'
						}, {
							name: '待支付',
							count: res.data.toBePaid,
							id: 0
						}]
						this.tabs = arr
					},
				};
				this.$http.request(params);
			},

			/*取消订单*/
			cancelDd(item) {
				this.order = item
				this.$refs['canOrderVue'].init()
			},
			qrcancel() {
				let params = {
					url: "app/order/cancel",
					method: "POST",
					data: {
						orderId: this.order.id,
						cancelReason: this.cancelReason == '其他原因' ? this.cancelReason2 : this.cancelReason
					},
					callBack: (res) => {
						if (res.code == 200) {
							uni.showToast({
								title: "取消订单成功",
								icon: "none",
							});
							this.mescroll.resetUpScroll()
						}
					},
				};
				uni.showLoading({
					title: "取消订单中",
					mask: true,
				});
				this.$http.request(params);
			},

			/*加小费*/
			usertip(item) {
				this.showAmount = true
				this.order = item
			},
			confirm_tip(data) {
				let params = {
					url: "app/order/tips",
					method: "POST",
					data: {
						orderId: this.order.id,
						cancelReason: data.amount
					},
					callBack: (res) => {
						if (res.code == 200) {
							uni.showToast({
								title: "加小费成功",
								icon: "none",
							});
							this.handletouchstart()
							this.reset_updata()
						}
					},
				};
				uni.showLoading({
					title: "加小费中",
					mask: true,
				});
				this.$http.request(params);
			}
		},
		onLoad() {
			this.init()
		},
		onShow() {
			this.isLogin = uni.getStorageSync('token') ? true : false
		},
		// 组件列表
		components: {
			MescrollUni,
			canOrderVue,
			orderCell,
			addTipVue
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #F6F7F9;
		height: 100%;
	}

	#list {
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
	}

	.right-icon {
		width: 20px;
		height: 20px;
	}

	.slot-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		padding-right: 15px;
		padding-left: 15px;
	}

	.title {
		font-size: 42upx;
		font-weight: 600;
		color: #0D1C40;
	}

	.tab-bar {
		position: fixed;
		top: 64px;
		left: 0px;
		right: 0px;
		height: 30px;
		z-index: 999;
		background-color: white;
		background-color: red;
	}

	.order-list {
		padding: 20upx;
	}

	.txtarea {
		background-color: #F5F5F7;
		height: 90px;
		margin: 0 30px;
		font-size: 13px;
		padding: 12px;
	}

	.no-login {
		position: relative;
		margin-top: 60%;
		color: #606266;
		font-size: 14px;
		text-align: center;

		.login-text {
			color: '#E95008';
			margin-left: 8px;
		}
	}

	#list /deep/ {}
</style>
