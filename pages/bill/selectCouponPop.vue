<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view>
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="show=false"></image>
					<view class="pop-tlt">优惠券</view>
					<view class="confirm" @click.stop="confirm">确定</view>
				</view>
				<view class="box">
					<view :class="selectCoupon.id==item.id?'cell-select-coupon':'cell-coupon'" @click.stop="selectCouponChange(item)" v-for="(item,index) in dataList" :key="index">
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
						<view :class="['right',selectCoupon.id==item.id?'select-right':'']">
							<view class="name">{{item.type==1?'满减券':'立减券'}}</view>
							<view class="sub-tlt">有效期至：{{item.validStartTime}}</view>
							<view class="sub-tlt">{{item.remark}}</view>
						</view>
						<image class="flag" :src="selectCoupon.id==item.id?'../../static/image/voice-select-yes@2x.png':'../../static/image/no-select@2x.png'"></image>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				selectCoupon:{},
				dataList:[]
			}
		},
		methods:{
			init(deliveryAmount,deliveryId){
				this.show=true
				this.getCouponList()
			},
			getCouponList(){
				let that=this
				var params={
					url:'app/coupon/list',
					method:'GET',
					data:{
						status:0,
					},
					callBack:function(res){
						console.log(res)
						that.dataList=res.data.data
					}
				}
				this.$http.request(params)
			},
			selectCouponChange(item){
				this.selectCoupon=item
			},
			confirm(){
				this.show=false
				this.$emit('selectCoupon',this.selectCoupon)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.box{
		padding: 28upx 50upx;
	}
	.cell-coupon{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 80px;
		background-color: white;
		margin-bottom: 10px;
		border-radius: 5px;
		border: solid 1px #DDDDDD;
		position: relative;
	}
	
	.cell-select-coupon{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 80px;
		background-color: white;
		margin-bottom: 10px;
		border-radius: 5px;
		border: solid 1px #E95008;
		background-color: #FDEEE7;
		position: relative;
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
		flex: 1;
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
	.flag{
		position: absolute;
		right: 0px;
		bottom: 0px;
		width: 42upx;
		height: 42upx;
	}
	.select-right{
		background-color: #FDEEE7;
	}
</style>
