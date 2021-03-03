<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png"></image>
					<view class="pop-tlt">优惠券</view>
					<view class="confirm">确定</view>
				</view>
				<view class="box">
					<view class="cell">
						<view class="left">
							<view>
								<text class="unit">¥</text>
								<text>1</text>
							</view>
							<view v-if="false">
								<text>1</text>
								<text class="unit">折</text>
							</view>
						</view>
						<view class="right">
							<view class="name">立减券</view>
							<view class="sub-tlt">有效期至：2020-12-12 10:10</view>
							<view class="sub-tlt">仅限猎豹平台使用，全国通用</view>
						</view>
						<image class="flag" src="../../static/image/no-select@2x.png"></image>
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
	.cell{
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
	.flag{
		position: absolute;
		right: 0px;
		bottom: 0px;
		width: 42upx;
		height: 42upx;
	}
</style>
