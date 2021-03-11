<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#333333"
			title-color="#333333" title="我的钱包" :background="{background:'#FFFFFF'}">
		</u-navbar>
		<view class="tab-bar">
			<u-tabs :list="list" :is-scroll="false" active-color="#FA6F06" inactive-color="#4D5660" :current="current"
				@change="change"></u-tabs>
		</view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="listTop" :bottom="10" @down="downCallback"
			:up="upOption" @up="upCallback" @emptyclick="emptyClick">
			<view class="content">
				<view class="cell">
					<view class="left">
						<view class="type">余额充值</view>
						<view class="time">2021-12-09 12:00:00</view>
					</view>
					<view class="right">
						<view>+166.0</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	var _self
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js"
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollUni
		},
		data() {
			return {
				list: [{
					name: '全部'
				}, {
					name: '充值'
				}, {
					name: '消费'
				}, {
					name: '退款'
				}],
				current: 0,
				currentPage: 1,
				dataList: [],
				listTop:120,
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
						icon:'../'
					}
				}
			}
		},
		onLoad() {
			_self = this
		},
		methods: {
			change(index) {
				this.current = index
			},
			getDataList() {
				var params = {
					url: 'app/member/balance/logs',
					method: 'get',
					data: {
						pageNum: this.currentPage,
						pageSize: 10
					},
					callBack: function(res) {
						console.log(res)
						uni.stopPullDownRefresh();
						let list = null;
						_self.mescroll.endSuccess(res.data.data.length);
						if (_self.currentPage == 1) {
							list = [];
						} else {
							list = _self.dataList;
						}
						_self.currentPage++;
						_self.dataList = list.concat(res.data.data);
					}
				}
				this.$http.request(params)
			},
			upCallback(page) {
				//联网加载数据
				this.currentPage = page.num
				this.getDataList()
			},
			// 主动触发下拉刷新
			triggerDownScroll() {
				this.mescroll.scrollTo(0, 0)
				this.mescroll.triggerDownScroll()
			},
			
			emptyClick() {
			
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F7F9;
	}

	.tab-bar {
		position: fixed;
		left: 0px;
		right: 0px;
		height: 30px;
	}

	.content {
		margin: 10px;
		margin-top: 50px;
	}

	.cell {
		background-color: white;
		padding: 15px 25px;
		display: flex;
		justify-content: space-between;
	}

	.type {
		color: #0D1C40;
		font-size: 15px;
	}

	.time {
		color: #9EA7B7;
		font-size: 12px;
	}

	.right {
		margin-top: 10px;
	}
</style>
