<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="tip">
					聚合推单 全网比价 多种模式 自由选择
				</view>
				<view class="box">
					<view :class="deliveryType==1?'select-juhe-box':'juhe-box'" @click.stop="deliveryType_Click">
						<image class="juhe-logo" :src="model.logo"></image>
						<view class="platform-info">
							<view class="platform-tlt">{{model.name}}</view>
							<view class="platform-tip">{{model.desc}}</view>
						</view>
						<view class="price-box">
							<view :class="couponPrice>0?'juhe-price':''">
								<text class="price-unit">预估</text>
								<text class="price">{{computePrice(model.deliveryAmount,tipAmount,couponPrice)}}</text>
								<text class="price-unit">元</text>
							</view>
							<view class="couponPrice" v-if="couponPrice>0?true:false">已优惠<text style="font-size: 14px;margin-left: 4px;margin-right: 4px;">{{couponPrice}}</text>元</view>
						</view>
						<image class="flag" :src="deliveryType==1?'../../static/image/voice-select-yes@2x.png':'../../static/image/no-select@2x.png'"></image>
					</view>
					<view class="nav-bar">
						<view class="nav-left">
							<image src="../../static/image/vertical-line@2x.png"></image>
							<text>自选运力</text>
						</view>
						<view class="nav-right" v-if="deliveryType==2" @click.stop="needGuaranteed=!needGuaranteed">
							<image :src="needGuaranteed?'../../static/image/bill-selected@2x.png':'../../static/image/bill-no-selected@2x.png'"></image>
							<text>需要保底</text>
						</view>
					</view>
					<view class="cell" v-for="(item,index) in model.optionals" :key="index" @click.stop="autoDeliveryClick(item)">
						<image class="logo" :src="item.logo"></image>
						<view class="thirty">
							<view class="thirty-tlt">{{item.name}}</view>
							<view class="thirty-tip">{{item.desc}}</view>
						</view>
						<view class="price-box">
							<text class="price-unit">预估</text>
							<text class="price">{{computePrice(item.deliveryAmount,tipAmount,couponPrice)}}</text>
							<text class="price-unit">元</text>
						</view>
						<image class="thirty-flag" :src="item.select?'../../static/image/bill-selected@2x.png':'../../static/image/bill-no-selected@2x.png'"></image>
					</view>
					<view class="nav-bar">
						<view class="nav-left">
							<image src="../../static/image/vertical-line@2x.png"></image>
							<text>余额不足导致以下运力不可用</text>
						</view>
						<view class="recharge" @click.stop="recharge_Click">
							<image src="../../static/image/submit-order@2x.png"></image>
							<view class="recharge-tlt">立即充值</view>
						</view>
					</view>
					<view class="cell">
						<image class="logo" src="../../static/image/juhe@2x.png"></image>
						<view class="thirty">
							<view class="thirty-tlt">美团</view>
							<view class="thirty-tip">预估500米</view>
						</view>
						<view class="price-box">
							<text class="price-unit">预估</text>
							<text class="price">15.0</text>
							<text class="price-unit">元</text>
						</view>
						<image class="thirty-flag" src="../../static/image/bill-no-selected@2x.png"></image>
						<view class="cell-mask"></view>
					</view>
				</view>
				<view class="footer">
					<view class="menu-list">
						<view class="xiaofei" @click.stop="showAmount=true">
							<view class="xiaofei-tlt">加小费</view>
							<view class="xiaofei-right">
								<text class="xiaofei-unit">¥</text>
								<text class="xiaofei-price">{{tipAmount}}</text>
								<image style="margin-left: 15px;margin-right: 50px;" src="../../static/image/enter@2x.png"></image>
							</view>
						</view>
						<view class="xiaofei" :style="{width:screenWidth+'px'}" @click.stop="showCoupon">
							<view class="xiaofei-tlt" style="margin-right: 6px;">优惠券</view>
							<view class="xiaofei-right">
								<text class="xiaofei-unit">已抵扣 ¥</text>
								<text class="xiaofei-price">{{couponPrice}}</text>
								<image src="../../static/image/enter@2x.png"></image>
							</view>
						</view>
					</view>
					<view class="btns">
						<view class="btn-cancel" @click.stop="show=false">取消</view>
						<view class="btn-submit" @click.stop="save">提交下单</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup mode="bottom" v-model="showAmount" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="showAmount=false"></image>
					<view class="pop-tlt">加小费</view>
					<view class="confirm" @click.stop="confirm_tip">确定</view>
				</view>
				<scroll-view scroll-y="true" :style="{'height': showAmountHeight+'rpx'}">
					<view class="minute-list">
						<view :class="['minute',index%3==2?'item-right':'',item.value==selectAmount.value?'active':'']" @click.stop="minute_Click(item)" :style="{'width':itemWidth+'px'}" v-for="(item,index) in amounts" :key="index">
							{{item.label}}
						</view>
					</view>
					<input v-if="showAmountInput" v-model="tipAmount" type="digit" class="pop-input" placeholder="其他金额" />
				</scroll-view>
			</view>
		</u-popup>
		<select-coupon-pop ref="selectCouponPop" @selectCoupon="selectCouponChange"></select-coupon-pop>
	</view>
</template>

<script>
	import selectCouponPop from './selectCouponPop.vue'
	import globalData from '@/common/js/globalData.js'
	export default{
		components:{
			selectCouponPop
		},
		data(){
			return{
				show:false,
				deliveryType:'',
				selectDelivery:null,
				needGuaranteed:false,
				selectAutoDeliveryList:[],
				showAmount:false,
				showAmountHeight:300,
				showAmountInput:false,
				tipAmount:0,
				selectAmount:{},
				couponId:'',
				takeRemark:'',
				couponPrice:0,
				coupon:{},
				itemWidth:0,
				order:{},
				screenWidth:0,
				model:{
					optionals:[]
				},
				amounts:[
					{
						label:'1元',
						value:1
					},
					{
						label:'2元',
						value:2
					},
					{
						label:'5元',
						value:5
					},
					{
						label:'10元',
						value:10
					},
					{
						label:'15元',
						value:15
					},
					{
						label:'20元',
						value:20
					},
					{
						label:'30元',
						value:30
					},
					{
						label:'50元',
						value:50
					},
					{
						label:'其他金额',
						value:''
					}
				]
			}
		},
		methods:{
			init(data,order,takeRemark){
				this.show=true
				this.model=data
				this.order=order
				this.takeRemark=takeRemark
				console.log(data)
				if(this.model.optionals){
					for(var i=0;i<this.model.optionals.length;i++){
						var item=this.model.optionals[i]
						this.$set(item,'select',false)
					}
				}
				this.itemWidth=(globalData.windowWidth-115)/3.0
				this.screenWidth=globalData.windowWidth/2.0+80
			},
			showCoupon(){
				this.$refs['selectCouponPop'].init()
			},
			minute_Click(item){
				this.selectAmount=item
				this.showAmountInput=item.value?false:true
				this.showAmountHeight=item.value?300:400
			},
			confirm_tip(){
				if(this.selectAmount.value){
					this.tipAmount=this.selectAmount.value
				}
				this.showAmount=false
			},
			autoDeliveryClick(item){
				this.deliveryType=2
				for(var i=0;i<this.model.optionals.length;i++){
					var tempItem=this.model.optionals[i]
					if(tempItem.id==item.id){
						if(tempItem.select){
							this.$set(tempItem,'select',false)
						}
						else{
							this.$set(tempItem,'select',true)
						}
					}
					else{
						this.$set(tempItem,'select',false)
					}
				}
				
			},
			deliveryType_Click(){
				this.deliveryType=1
				this.needGuaranteed=false
				for(var i=0;i<this.model.optionals.length;i++){
					var item=this.model.optionals[i]
					this.$set(item,'select',false)
				}
			},
			selectCouponChange(coupon){
				this.coupon=coupon
				this.couponPrice=coupon.money
			},
			save(){
				if(this.deliveryType==''){
					uni.showToast({
						title:'请选择运力',
						icon:'none'
					})
					return
				}
				var preDeliveryIds=[]
				if(this.deliveryType==2){
					for(var i=0;i<this.model.optionals.length;i++){
						var item=this.model.optionals[i]
						if(item.select){
							preDeliveryIds=item.deliveryId
							break
						}
					}
					if(!preDeliveryIds||preDeliveryIds.length==0){
						uni.showToast({
							title:'请选择运力',
							icon:'none'
						})
						return
					}
				}
				console.log(3333)
				let orderParams=Object.assign(this.order,{
					deliveryType:this.deliveryType,
					tipAmount:this.tipAmount,
					takeRemark:this.takeRemark,
					preDeliveryIds:preDeliveryIds,
					couponId:this.coupon.id
				})
				let that=this
				var requestParams={
					url:'app/order/create',
					method:'POST',
					data:orderParams,
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							that.show=false,
							uni.showToast({
								title:'下单成功'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:10
								})
							},1000)
						}
					}
				}
				uni.showLoading({
					title:'正在提交',
					mask:true
				})
				this.$http.jsonRequest(requestParams)
			},
			recharge_Click(){
				uni.navigateTo({
					url:'/pages/wallet/index'
				})
			},
			computePrice(cost,tipPrice,couponPrice){
				let price=cost+parseFloat(tipPrice)-couponPrice
				console.log(tipPrice)
				return price<0?0:price
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tip{
		background-color: #FFFFEA;
		color: #E95008;
		font-size: 12px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}
	.box{
		padding: 32upx 43upx;
		background-color: white;
	}
	.content{
		background-color: #F6F7F960;
	}
	.juhe-box{
		position: relative;
		height: 106upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: solid 1px #DDDDDD;
		border-radius: 8upx;
		.juhe-logo{
			width: 64upx;
			height: 64upx;
			margin-left: 30upx;
		}
	}
	
	.select-juhe-box{
		position: relative;
		height: 106upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: solid 1px #E95008;
		background-color: #FDEEE7;
		border-radius: 8upx;
		.juhe-logo{
			width: 64upx;
			height: 64upx;
			margin-left: 30upx;
		}
	}
	
	
	.platform-info{
		margin-left: 20upx;
		margin-top: 4px;
		flex: 1;
		.platform-tlt{
			color: #0D1C40;
			font-size: 15px;
		}
		.platform-tip{
			background-color: #FDEEE7;
			color: #E95008;
			height: 32upx;
			line-height: 32upx;
			width: 160upx;
			text-align: center;
			border-radius: 4upx;
			font-size: 11px;
		}
	}
	.price-box{
		margin-right: 60px;
		flex: 1;
		text-align: right;
		position: absolute;
		right: 0px;
		top: 10px;
		width: 120px;
	}
	.price-unit{
		color: #0D1C40;
		font-size: 11px;
	}
	.price{
		color: #0D1C40;
		font-size: 18px;
		font-weight: bold;
		margin-left: 3px;
		margin-right: 3px;
	}
	.flag{
		position: absolute;
		right: 0px;
		bottom: 0px;
		width: 42upx;
		height: 42upx;
	}
	.nav-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		position: relative;
	}
	.nav-left{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		image{
			width: 6upx;
			height: 30upx;
			margin-right: 6px;
		}
		text{
			color: #0D1C40;
			font-size: 15px;
		}
	}
	.nav-right{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		image{
			width: 30upx;
			height: 30upx;
			margin-right: 6px;
		}
		text{
			color: #0D1C40;
			font-size: 14px;
		}
	}
	.cell{
		position: relative;
		height: 106upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo{
			width: 64upx;
			height: 64upx;
			margin-left: -16upx;
		}
	}
	.thirty{
		margin-left: 20upx;
		margin-top: 4px;
		flex: 1;
		.thirty-tlt{
			color: #0D1C40;
			font-size: 15px;
		}
		.thirty-tip{
			color: #0D1C40;
			font-size: 11px;
		}
	}
	.thirty-flag{
		width: 36upx;
		height: 36upx;
		
	}
	.recharge{
		image{
			width: 210upx;
			height: 21upx;
		}
		.recharge-tlt{
			position: absolute;
			top: 15px;
			right: 25px;
			color: #E95008;
			font-size: 14px;
		}
	}
	.cell-mask{
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		background-color: #FFFFFF90;
	}
	
	.footer{
		margin-top: 6px;
		height: 245upx;
		background: #FFFFFF;
		box-shadow: 0px 6px 10px 0px rgba(238, 238, 238, 0.4);
		padding: 42upx 48upx;
	}
	.menu-list{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.xiaofei{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		.xiaofei-tlt{
			color: #0D1C40;
			font-size: 14px;
		}
		.xiaofei-right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			image{
				width: 20upx;
				height: 20upx;
				margin-left: 30upx;
			}
		}
		.xiaofei-unit{
			color: #E95008;
			font-size: 12px;
		}
		.xiaofei-price{
			color: #E95008;
			font-size: 16px;
		}
	}
	.btns{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 25px;
	}
	.btn-cancel{
		height: 45px;
		line-height: 45px;
		width: 270upx;
		background-color: white;
		border-radius: 45px;
		color: #0D1C40;
		font-size: 16px;
		text-align: center;
		border: solid 1px #9EA7B7;
	}
	.btn-submit{
		height: 45px;
		width: 340upx;
		line-height: 45px;
		background-color: #E95008;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		text-align: center;
		margin-left: 48upx;
	}
	
	.pop-nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 32px;
		image{
			width: 12px;
			height:12px;
		}
	}
	
	.pop-tlt{
		color: #0D1C40;
		font-size: 15px;
		font-weight: bold;
	}
	
	.confirm{
		color: #FA6F06;
		font-size: 14px;
	}
	
	.minute-list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0px 37px;
	}
	.minute{
		width: 90px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		color: #0D1C40;
		font-size: 13px;
		border: solid 1px #9EA7B7;
		text-align: center;
		margin-right: 15px;
		margin-bottom: 17px;
	}
	.pop-input{
		text-align: center;
		margin: 5px 38px;
		border: solid 1px #9EA7B7;
		height: 35px;
		line-height: 35px;
		border-radius: 35px;
	}
	.item-right{
		margin-right: 0px;
	}
	.active{
		border: solid 1px #E95008;
		color: #E95008;
		background-color: #FDEEE7;
	}
	.juhe-price{
		margin-top: -8px;
	}
	.couponPrice{
		color: #E95008;
		font-size: 11px;
	}
</style>
