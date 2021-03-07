<template>
	<view>
		<u-popup v-model="show" mode="center" border-radius="12" width="590">
			<view class="box">
				<view class="nav">
					<view class="nav-tlt">优惠券使用说明</view>
					<image @click.stop="show=false" class="close" src="../../static/image/delete.png"></image>
				</view>
				<view class="content">
					<web-view :src="data"></web-view>
					<!-- <view class="item">
						2、优惠券不能转让，不能折现，不能退换；
					</view>
					<view class="item">
						3、优惠券不能与其他官方优惠活动同时使用， 官方活动期间以官方活动为准；
					</view>
					<view class="item">
						4、优惠券只折扣订单里程费，不包括溢价与 用户加价的折扣；
					</view>
					<view class="item">
						6、优惠券在特殊节假日期间不可使用，包括 : 春节、214情人节、母亲节、农历七夕、 圣诞节、春节、情人节；
					</view> -->
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
				data:''
			}
		},
		methods:{
			init(){
				this.show=true
				this.getCouponDes()
			},
			
			getCouponDes(){
				let that=this
				var params={
					url:'app/coupon/explain',
					method:'GET',
					data:{},
					callBack:function(res){
						console.log(res)
						that.data=res.data
					}
				}
				this.$http.request(params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		padding: 15px 12px;
		background-color: white;
	}
	.nav{
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.nav-tlt{
		color: #0D1C40;
		font-size: 15px;
		font-weight: bold;
	}
	.close{
		position: absolute;
		right: 0px;
		padding: 12px;
		width: 12px;
		height: 12px;
	}
	.content{
		margin-top: 20px;
	}
	.item{
		font-size: 13px;
		color: #0D1C40;
		margin-bottom: 10px;
		line-height: 20px;
	}
</style>
