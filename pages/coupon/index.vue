<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#333333" title-color="#333333" title="我的钱包" :background="{background:'#FFFFFF'}">
			<view class="slot-wrap" @click.stop="showCouponDes">
				<image class="right-icon" src="../../static/image/des@2x.png"></image>
			</view>
		</u-navbar>
		<view class="content">
			<view class="cell" v-for="(item,index) in dataList" :key="index">
				<view class="left">
					<view v-if="item.type==1">
						<text class="unit">¥</text>
						<text>{{item.money}}</text>
					</view>
					<view v-else>
						<text>{{item.discount}}</text>
						<text class="unit">折</text>
					</view>
				</view>
				<view class="right">
					<view class="name">{{item.type==1?'满减券':'立减券'}}</view>
					<view class="sub-tlt">有效期至：{{item.validStartTime}}</view>
					<view class="sub-tlt">{{item.desc}}</view>
				</view>
			</view>
			<view style="display: flex;justify-content: center;flex-direction: row;">
				<u-loading mode="flower" size="48" :show="showLoading"></u-loading>
			</view>
			<view class="empty" v-if="!hasMore">没有更多数据</view>
		</view>
		<coupon-des ref="couponDes"></coupon-des>
	</view>
</template>

<script>
	var _self
	var timer
	import couponDes from './couponDes.vue'
	export default{
		components:{
			couponDes
		},
		data(){
			return{
				hasMore:true,
				showLoading:true,
				currentPage:1,
				dataList:[]
			}
		},
		onLoad() {
			_self=this
			this.getCouponList()
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.currentPage = 1;
			this.getMessageList();
		},
		
		onReachBottom: function() {
			let _this=this
			if (!this.hasMore) return;
			this.showLoading = true;
			//触底的时候请求数据，即为上拉加载更多
			if (timer != null) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_self.getCouponList();
			}, 1000);
		},
		methods:{
			getCouponList(){
				let params={
					url:'app/coupon/list',
					method:'get',
					data:{
						status:0,
						pageSize:10,
						pageNum:this.currentPage
					},
					callBack:function(res){
						console.log(res)
						uni.stopPullDownRefresh();
						_self.showLoading=false
						let list=null;
						if(_self.currentPage==1){
							list=[];
						}
						else{
							list=_self.dataList;
						}
						_self.currentPage++;
						_self.hasMore = parseInt(res.data.totalPages) > parseInt(res.data.pageNum) ? true : false;
						_self.dataList =list.concat(res.data.data);
					}
				}
				this.$http.request(params)
			},
			showCouponDes(){
				this.$refs['couponDes'].init()
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F6F7F9;
	}
	.content{
		margin: 10px 25px;
	}
	.right-icon{
		width: 20px;
		height: 20px;
	}
	.cell{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 80px;
		background-color: white;
		margin-bottom: 10px;
		border-radius: 5px;
	}
	.slot-wrap{
		display: flex;
		justify-content: flex-end;
		flex: 1;
		padding-right: 15px;
	}
	.left{
		width: 85px;
		text-align: center;
		background-color: #FAEEE7;
		height: 100%;
		color: #E95008;
		font-size: 22px;
		padding-top: 20px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		.unit{
			font-size: 13px;
			margin-right: 8px;
		}
	}
	.right{
		background-color: white;
		height: 100%;
		padding-left: 15px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.name{
		color: #0D1C40;
		font-size: 15px;
		margin-top: 12px;
	}
	.sub-tlt{
		color: #9EA7B7;
		font-size: 11px;
	}
	.empty {
		margin-top: 10px;
		text-align: center;
		color: #999;
	}
</style>
