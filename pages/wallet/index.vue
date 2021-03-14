<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#FFFFFF"
			title-color="#FFFFFF" title="账户充值" :background="{background:'#FC720000'}">
		</u-navbar>
		<view class="header" :style="{'margin-top':-navHeight+'px','height':146+statusHeight+'px'}">
			<view class="account" :style="{'top':40+statusHeight+'px'}">
				<view>充值账号</view>
				<view class="tel">{{userInfo.mobile}}</view>
			</view>
		</view>
		<view class="list">
			<view class="tlt">充值金额</view>
			<view class="options">
				<view :class="['item',(selectItem&&selectItem.id==item.id)?'chargeActive':'']"
					v-for="(item,index) in dataList" :key="index" @click.stop="item_Click(item)">
					<view>{{item.value}}元</view>
					<image v-if="item.couponIds?true:false" class="flag" src="../../static/image/cz.png"></image>
					<image v-if="(selectItem&&selectItem.id==item.id)?true:false" class="select-flag"
						src="../../static/image/voice-select-yes@2x.png"></image>
				</view>
				<view :class="['item',(selectItem&&selectItem.value=='其他')?'chargeActive':'']" @click.stop="selectItem={value:'其他'}">
					<view v-if="selectItem.value!='其他'">其他</view>
					<input v-else style="height: 100%;" v-model="inputMoney" :focus="selectItem.value=='其他'?true:false" />
				</view>
			</view>
			<view class="coupon" v-if="(selectItem&&selectItem.couponList)?true:false">
				<image src="/static/image/coupon@2x.png"></image>
				<text>赠送{{selectItem.couponList&&selectItem.couponList.length}}张折优惠券</text>
			</view>
		</view>
		<view class="pay">
			<view class="tlt">支付方式</view>
			<view class="menu border" @click.stop="payWay=1">
				<image class="logo" src="/static/image/alipay@2x.png"></image>
				<text style="flex: 1;margin-left: 18px;">支付宝支付</text>
				<image class="" :src="payWay==1?'/static/image/select_yes@2x.png':'/static/image/select_normal@2x.png'">
				</image>
			</view>
			<view class="menu" @click.stop="payWay=2">
				<image class="logo" src="/static/image/wxpay@2x.png"></image>
				<text style="flex: 1;margin-left: 18px;">微信支付</text>
				<image class="" :src="payWay==2?'/static/image/select_yes@2x.png':'/static/image/select_normal@2x.png'">
				</image>
			</view>
		</view>
		<view class="btn" @click.stop="recharge">去充值</view>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	export default {
		data() {
			return {
				navHeight:64,
				statusHeight:20,
				dataList: [],
				userInfo: {},
				selectItem: {},
				inputMoney:'',
				payWay: ''
			}
		},
		onLoad() {
			this.navHeight=globalData.titleHeight
			this.statusHeight=globalData.statusBarHeight
			this.getRechargeList()
			this.getUserInfo()
		},
		methods: {
			item_Click(item){
				this.selectItem=item
				this.inputMoney=''
			},
			getRechargeList() {
				var params = {
					url: 'app/recharge/list',
					method: 'GET',
					data: {},
					callBack: (res) => {
						uni.hideLoading()
						console.log(res)
						this.dataList = res.data
					}
				}
				uni.showLoading({
					title: '正在加载',
					mask: true
				})
				this.$http.request(params)
			},
			getUserInfo() {
				let params = {
					url: 'app/member/detail',
					method: 'get',
					data: {},
					callBack: (res) => {
						console.log(res)
						this.userInfo = res.data
					}
				}
				this.$http.request(params)
			},
			recharge() {
				if (!this.selectItem) {
					uni.showToast({
						title: '请选择充值金额',
						icon: 'none'
					})
					return
				}
				if(this.selectItem.value=='其他'&&(!this.inputMoney||parseFloat(this.inputMoney)<=0)){
					uni.showToast({
						title:'请输入金额',
						icon:'none'
					})
					return
				}
				if (!this.payWay) {
					uni.showToast({
						title: '请选择支付方式',
						icon: 'none'
					})
					return
				}
				var params = {
					url: 'app/pay/order',
					method: 'POST',
					data: {
						money: this.selectItem.value=='其他'?this.inputMoney:this.selectItem.value,
						paymentType: this.payWay,
						id: this.selectItem.id?this.selectItem.id:''
					},
					callBack: (res) => {
						uni.hideLoading()
						if(res.code==200){
							uni.requestPayment({
								provider: this.payWay==2?'wxpay':'alipay',
								orderInfo: res.data, //微信、支付宝订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.showToast({
										title:'支付成功',
										icon:'none'
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.showToast({
										title:'支付失败',
										icon:'none'
									})
								}
							})
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
					title: '正在支付',
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

	.header {
		margin-top: -64px;
		height: 166px;
		background-color: #FC7200;

		.account {
			padding-left: 32px;
			position: absolute;
			top: 60px;
			color: white;
		}

		.tel {
			font-size: 24px;
			font-weight: bold;
			margin-top: 10px;
		}
	}

	.list {
		position: relative;
		margin-top: -30px;
		background: #FFFFFF;
		box-shadow: 0px 4px 8px 0px rgba(221, 221, 221, 0.1);
		border-radius: 14px;
		margin-left: 10px;
		margin-right: 10px;
		padding: 17px 4px;

		.tlt {
			color: #0D1C40;
			font-size: 15px;
			padding-left: 21px;
		}
	}

	.options {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.item {
		border: solid 1px #DDDDDD;
		height: 40px;
		width: 90px;
		text-align: center;
		line-height: 40px;
		border-radius: 2px;
		color: #0D1C40;
		font-size: 13px;
		margin-left: 20px;
		margin-top: 12px;
		position: relative;
	}

	.chargeActive {
		background-color: #FAEEE7;
		border: solid 1px #FA6F06;
	}

	.coupon {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #FAEEE7;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		margin: 15px 18px 0px 18px;
		color: #E95008;
		font-size: 12px;

		image {
			margin-left: 10px;
			width: 24px;
			height: 24px;
		}
	}

	.pay {
		background-color: white;
		height: 154px;
		padding: 17px 21px;
		margin: 10px 10px;

		.tlt {
			color: #0D1C40;
			font-size: 15px;
		}
	}

	.menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		height: 50px;

		.logo {
			width: 24px;
			height: 24px;
		}
	}

	.menu>image:last-child {
		width: 18px;
		height: 18px;
	}

	.border {
		border-bottom: solid 1px #EEEEEE;
	}

	.flag {
		position: absolute;
		top: -10px;
		right: -10px;
		width: 90upx;
		height: 33upx;
	}

	.select-flag {
		position: absolute;
		bottom: 0px;
		right: 0px;
		width: 42upx;
		height: 42upx;
	}

	.btn {
		margin-top: 40px;
		margin-left: 30px;
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
