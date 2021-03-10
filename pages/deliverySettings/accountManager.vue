<template>
	<view>
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :top="listTop" :bottom="80" @down="downCallback" :up="upOption"
		 @up="upCallback" @emptyclick="emptyClick">
			<view class="box">
				<view class="cell" @click.stop="cell_Click(item)" v-for="(item,index) in dataList" :key="index">
					<view>{{item.mobile}}</view>
					<view class="item" style="margin-top: 10px;margin-bottom: 5px;">
						<image src="../../static/image/add_shop@2x.png"></image>
						<text>{{item.shopName}}</text>
					</view>
					<view class="item">
						<image src="../../static/image/user@2x.png"></image>
						<text style="flex: 1;">{{item.name}}</text>
						<view class="menu-list">
							<view @click.stop="updateUserStatus(item)" :class="['menu',item.status==0?'stop':'on']">{{item.status==1?'禁用':'启用'}}</view>
							<view class="menu reset" @click.stop="resetPwd(item)">重置密码</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		<view class="bottom"></view>
		<view class="save" @click.stop="add">新增门店账号</view>
	</view>
</template>

<script>
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js"
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	var _self
	export default {
		mixins: [MescrollMixin],
		components: {
			MescrollUni
		},
		data() {
			return {
				currentPage: 1,
				listTop:0,
				dataList: [],
				upOption: {
					page: {
						num: 0,
						size: 10 // 每页数据的数量
					},
					isBounce: true,
					textNoMore: '没有更多数据',
					noMoreSize: 10, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: true,
						icon: '../'
					}
				}
			}
		},
		onLoad() {
			_self=this
		},
		methods: {
			add() {
				uni.navigateTo({
					url: '/pages/deliverySettings/addAccount'
				})
			},
			cell_Click(item){
				uni.navigateTo({
					url: '/pages/deliverySettings/addAccount?id='+item.id
				})
			},
			
			refreshDataList(){
				this.mescroll.resetUpScroll()
			},
			
			getAccountList() {
				let params = {
					url: 'app/shop/user/list',
					method: 'get',
					data: {
						status: 0,
						pageSize: 10,
						pageNum: this.currentPage
					},
					callBack: function(res) {
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
			
			updateUserStatus(item){
				var params={
					url:'app/shop/user/status',
					method:'POST',
					data:{
						id:item.id,
						status:item.status==1?0:1
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							uni.showToast({
								title:'更改成功'
							})
							item.status=item.status==1?0:1
						}
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			},
			
			resetPwdRequest(item){
				var params={
					url:'app/shop/user/psw',
					method:'POST',
					data:{
						id:item.id,
						password:'123456'
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							uni.showToast({
								title:'重置成功'
							})
							item.status=item.status==1?0:1
						}
						else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			},
			
			resetPwd(item){
				let that=this
				uni.showModal({
					title:'提示',
					content:'确定要重置密码',
					success(res){
						if(res.confirm){
							that.resetPwdRequest(item)
						}
					}
				})
			},
			
			upCallback(page) {
				//联网加载数据
				this.currentPage = page.num
				this.getAccountList()
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

	.box {
		padding: 10px;
	}

	.cell {
		background-color: white;
		padding: 16px 10px;
		border-radius: 4px;
		margin-bottom: 10px;
	}

	.item {
		display: flex;
		justify-content: flex-start;
		color: #0D1C40;
		font-size: 13px;

		image {
			width: 16px;
			height: 16px;
		}
	}

	.menu-list {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.menu {
			height: 24px;
			width: 60px;
			line-height: 24px;
			text-align: center;
			border-radius: 12px;
		}

		.stop {
			border: solid 1px #3987F6;
			color: #3987F6;
			font-size: 13px;
			margin-right: 10px;
		}
		.on{
			border: solid 1px #E3474F;
			color: #E3474F;
			font-size: 13px;
			margin-right: 10px;
		}

		.reset {
			width: 80px;
			background-color: #E95008;
			color: white;
			font-size: 13px;
		}
	}

	.bottom {
		height: 70px;
	}

	.save {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20px;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		color: white;
		width: calc(100% - 60px);
		text-align: center;
		font-size: 16px;
		background-color: #E95008;
	}
</style>
