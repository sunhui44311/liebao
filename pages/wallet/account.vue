<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#FFFFFF" title-color="#FFFFFF" title="我的钱包" :background="{background:navBarbgColor}">
		</u-navbar>
		<view class="header" :style="{'margin-top':-navHeight+''}">
			<view class="money">
				<view class="header-tlt">账户余额</view>
				<view class="total">{{userInfo.totalAmount}}</view>
			</view>
		</view>
		<view class="menu">
			<view class="menu-item" @click.stop="recharge_Click">
				<image class="logo" src="../../static/image/recharge@2x.png"></image>
				<text class="menu-tlt">账户充值</text>
				<view>
					<image class="flag" src="../../static/image/cz.png"></image>
					<image class="arrow" src="../../static/image/fj2.png"></image>
				</view>
			</view>
			<view class="menu-item" @click.stop="coupon_Click">
				<image class="logo" src="../../static/image/account-coupon@2x.png"></image>
				<text class="menu-tlt">优惠券</text>
				<view>
					<image class="arrow" src="../../static/image/fj2.png"></image>
				</view>
			</view>
			<view class="menu-item" @click.stop="tran_Click">
				<image class="logo" src="../../static/image/account-detail@2x.png"></image>
				<text class="menu-tlt">交易明细</text>
				<view>
					<image class="arrow" src="../../static/image/fj2.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	var _self
	export default{
		data(){
			return{
				currentPage:1,
				navBarbgColor:'#FC720000',
				navHeight:64,
				userInfo:{}
			}
		},
		onLoad() {
			_self=this
			this.getUserInfo()
			this.navHeight=globalData.naviBarHeight
		},
		methods:{
			onPageScroll: function(Object) {
			  let alpha=Object.scrollTop/globalData.naviBarHeight
			  if(alpha>=1){
				  this.navBarbgColor='#FC7200FF'
			  }
			  else{
				  this.navBarbgColor='#FC720000'
			  }
			},
			
			/*获取用户信息*/
			getUserInfo(){
				let params={
					url:'app/member/detail',
					method:'get',
					data:{},
					callBack:function(res){
						console.log(res)
						_self.userInfo=res.data
					}
				}
				this.$http.request(params)
			},
			
			recharge_Click(){
				uni.navigateTo({
					url:'/pages/wallet/index'
				})
			},
			coupon_Click(){
				uni.navigateTo({
					url:'/pages/coupon/index'
				})
			},
			tran_Click(){
				uni.navigateTo({
					url:'/pages/wallet/transactionDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.header{
		margin-top: -64px;
		height: 166px;
		background-color: #FC7200;
	}
	.header-tlt{
		opacity: 0.4;
	}
	.money{
		position: absolute;
		width: 100%;
		top: 60px;
		color: white;
		text-align: center;
		.total{
			font-size: 26px;
			font-weight: bold;
		}
	}
	.menu{
		position: relative;
		margin-top: -30px;
		background: #FFFFFF;
		box-shadow: 0px 4px 8px 0px rgba(221, 221, 221, 0.1);
		border-radius: 14px;
		margin-left: 10px;
		margin-right: 10px;
		padding: 17px 4px;
		.tlt{
			color: #0D1C40;
			font-size: 15px;
			padding-left: 21px;
		}
	}
	.menu-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		line-height: 40px;
		padding: 0px 15px;
		.logo{
			width: 24px;
			height: 24px;
		}
	}
	.menu-tlt{
		flex: 1;
		margin-left: 12px;
		font-size: 14px;
		color: #0D1C40;
	}
	.flag{
		height: 15px;
		width: 45px;
		margin-right: 12px;
	}
	.arrow{
		width: 6px;
		height: 11px;
	}
</style>
