<template>
	<view>
		<view class="nav">
			<view class="tab" @click.stop="tabChange(1)">
				<view>官方公告</view>
				<image v-show="current==1" src="../../static/image/tab-icon.png"></image>
			</view>
			<view class="tab" @click.stop="tabChange(2)">
				<view class="tab">系统通知</view>
				<image v-show="current==2" src="../../static/image/tab-icon.png"></image>
			</view>
		</view>
		<view v-if="current==2">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="listTop" :bottom="10" @down="downCallback" :up="upOption"
			 @up="upCallback" @emptyclick="emptyClick">
				<view class="content">
					<view class="cell" style="padding: 14px 10px;" v-for="(item,index) in dataList" :key="index">
						<view class="header">
							<image src="../../static/image/notice@2x.png"></image>
							<view>
								<view class="notice-type">系统通知</view>
								<view class="time">{{item.createTime}}</view>
							</view>
						</view>
						<view class="notice-content">{{item.content}}</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view v-else>
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="listTop" :bottom="10" @down="downCallback" :up="upOption"
			 @up="upCallback" @emptyclick="emptyClick">
				<view class="content">
					<view class="cell" v-for="(item,index) in dataList" :key="index">
						<image class="logo" :src="item.image"></image>
						<view style="padding: 12px 18px;">
							<view class="tlt">{{item.content}}</view>
							<view class="time">{{item.createTime}}</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
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
				current: 1,
				currentPage: 1,
				dataList: [],
				listTop: 70,
				mescroll: null,
				upOption: {
					page: {
						num: 0,
						size: 10 // 每页数据的数量
					},
					isBounce: true,
					textNoMore: '没有更多数据',
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: true,
						icon:'../'
					}
				}
			}
		},
		onLoad() {

		},

		methods: {
			getMessageList() {
				let that = this
				var params = {
					url: 'app/message/list',
					method: 'GET',
					data: {
						type: this.current,
						pageSize: 10,
						pageNum: this.currentPage
					},
					callBack: function(res) {
						let list = null;
						that.mescroll.endSuccess(res.data.data.length);
						if (that.currentPage == 1) {
							list = [];
						} else {
							list = that.dataList;
						}
						that.currentPage++;
						that.dataList = list.concat(res.data.data);
					},
					errCallBack:function(error){
						that.mescroll.endErr();
					}
				}
				this.$http.request(params)
			},

			tabChange(index) {
				this.current = index
				this.currentPage = 1
				this.dataList = []
				this.mescroll.resetUpScroll()
			},

			upCallback(page) {
				//联网加载数据
				this.currentPage = page.num
				this.getMessageList()
			},
			// 主动触发下拉刷新
			triggerDownScroll() {
				this.mescroll.scrollTo(0, 0)
				this.mescroll.triggerDownScroll()
			},

			emptyClick() {

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
		justify-content: space-around;
		background-color: white;
		padding-bottom: 10px;
		position: fixed;
		left: 0px;
		top: 0px;
		right: 0px;
		z-index: 999;
	}

	.tab {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 23px;
			height: 3px;
			margin-top: 4px;
		}
	}

	.content {
		padding: 10px;
	}

	.cell {
		background-color: white;
		border-radius: 7px;
	}

	.header {
		display: flex;
		justify-content: flex-start;

		image {
			width: 30px;
			height: 30px;
			margin-right: 12px;
		}

		.notice-type {
			color: #0D1C40;
			font-size: 15px;
		}

		.time {
			color: #9EA7B7;
			font-size: 12px;
		}
	}

	.notice-content {
		color: #0D1C40;
		font-size: 14px;
	}

	/*系统通知*/
	.logo {
		height: 130px;
		width: 100%;
	}

	.tlt {
		color: #0D1C40;
		font-size: 15px;
	}

	.time {
		color: #9EA7B7;
		font-size: 12px;
	}
</style>
