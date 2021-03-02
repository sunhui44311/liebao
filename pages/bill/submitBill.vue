<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="tip">
					聚合推单 全网比价 多种模式 自由选择
				</view>
				<view class="box">
					<view class="juhe-box">
						<image class="juhe-logo" src="../../static/image/juhe@2x.png"></image>
						<view class="platform-info">
							<view class="platform-tlt">聚合配送</view>
							<view class="platform-tip">全网运力推荐</view>
						</view>
						<view class="price-box">
							<text class="price-unit">预估</text>
							<text class="price">15.0</text>
							<text class="price-unit">元</text>
						</view>
						<image class="flag" src="../../static/image/no-select@2x.png"></image>
					</view>
					<view class="nav-bar">
						<view class="nav-left">
							<image src="../../static/image/vertical-line@2x.png"></image>
							<text>自选运力</text>
						</view>
						<view class="nav-right">
							<image src="../../static/image/bill-selected@2x.png"></image>
							<text>需要保底</text>
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
					</view>
					<view class="nav-bar">
						<view class="nav-left">
							<image src="../../static/image/vertical-line@2x.png"></image>
							<text>余额不足导致以下运力不可用</text>
						</view>
						<view class="recharge">
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
					<view class="xiaofei">
						<view class="xiaofei-tlt">加小费</view>
						<view class="xiaofei-right">
							<text class="xiaofei-unit">¥</text>
							<text class="xiaofei-price">1</text>
							<image src="../../static/image/enter@2x.png"></image>
						</view>
					</view>
					<view class="btns">
						<view class="btn-cancel">取消</view>
						<view class="btn-submit">提交下单</view>
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
				show:false
			}
		},
		methods:{
			init(){
				this.show=true
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
		background-color: #F6F7F9;
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
			margin-left: 30upx;
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
	.xiaofei{
		display: flex;
		justify-content: space-between;
		align-items: center;
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
</style>
