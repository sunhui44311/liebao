<template>
	<view>
		<image class="bg" src="../../static/image/visit-bg@2x.png" mode="aspectFill"></image>
		<view class="content">
			<view class="title">
				<image class="logo" src="../../static/image/visit-bg-title@2x.png"></image>
				<view class="title-txt">#赚钱攻略#</view>
			</view>
			<scroll-view :scroll-x="true" scroll-with-animation class="scroll-bar">
				<view class="card" v-for="(item,index) in dataList" :key="index">
					<image class="card-bg" src="../../static/image/card@2x.png"></image>
					<view class="card-info">
						<view>
							<text style="font-size: 18px;">¥</text>
							<text>{{item.money}}</text>
						</view>
					</view>
					<view class="card-act">{{item.name}}</view>
				</view>
			</scroll-view>
			<view class="visit">立即邀请</view>
			<view class="tip">被邀请新人得大礼包</view>
		</view>
		<view class="content rule">
			<view class="title">
				<image class="logo" src="../../static/image/visit-bg-title@2x.png"></image>
				<view class="title-txt">#赚钱攻略#</view>
			</view>
			<view class="item" style="margin-top: 30px;">
				1、优惠券仅限在平台订单使用；
			</view>
			<view class="item">
				2、推荐每5位好友领取大礼包，推荐人即得一张满15元 减5优惠券，上不封顶；
			</view>
			<view class="item">
				3、每位好友完成注册，推荐人即得一张2元直减券,全国 通用；
			</view>
			<view class="item">
				4、优惠券有效期1个月；
			</view>
			<view class="item">
			5、本活动解释权归本公司所有；
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dataList:[]
			}
		},
		onLoad() {
			this.getInvistion()
		},
		methods:{
			getInvistion(){
				var params={
					url:'app/member/invitation',
					method:'GET',
					data:{},
					callBack:(res)=>{
						console.log(res)
						uni.hideLoading()
						this.dataList=res.data
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			}
		}
	}
</script>

<style lang="scss">
	.bg{
		position: absolute;
		width: 100%;
		height: 700px;
		display: block;
	}
	.content{
		position: absolute;
		background-color: white;
		height: 509upx;
		margin: 150px 12px;
		width: calc(100% - 24px);
		border-radius: 4px;
	}
	.title{
		width: 250upx;
		height: 65upx;
		position: absolute;
		transform: translateX(-50%);
		left: 50%;
		margin-top: -15px;
		.logo{
			width: 250upx;
			height: 65upx;
		}
		.title-txt{
			color: white;
			font-size: 15px;
			position: absolute;
			margin-top: -32px;
			margin-left: 25px;
		}
	}
	.scroll-bar{
		white-space: nowrap;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 41px;
		margin-left: 18px;
		width: calc(100% - 35px);
		.card{
			width: 200upx;
			height: 160upx;
			position: relative;
			display: inline-block;
			margin-right: 6px;
		}
		.card-bg{
			width: 200upx;
			height: 160upx;
		}
	}
	.card-list{
		
		
	}
	.card-info{
		position: absolute;
		top: 10px;
		text-align: center;
		color: #E95008;
		font-size: 36px;
		width: 100%;
	}
	.card-act{
		position: absolute;
		top: 62px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: white;
	}
	.visit{
		color: white;
		background-color: #CB480A;
		font-size: 18px;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		text-align: center;
		margin-left: 12px;
		width: calc(100% - 24px);
		margin-top: 25px;
	}
	.tip{
		color: #EA7631;
		font-size: 14px;
		margin-top: 25px;
		text-align: center;
	}
	.rule{
		margin-top: 450px;
		height: 380upx;
	}
	.item{
		color: #EA7631;
		font-size: 12px;
		line-height: 24px;
		margin-left: 16px;
		display: inline-block;
	}
</style>
