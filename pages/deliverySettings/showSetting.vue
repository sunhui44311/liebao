<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<view class="pop-tlt">显示设置</view>
					<image src="../../static/image/delete.png"></image>
				</view>
				<scroll-view scroll-y="true" style="height: 543rpx;padding: 12px;">
					<view class="cell">
						<view>
							<view class="tlt">是否开启</view>
							<view class="sub-tlt">显示第三方订单</view>
						</view>
						<u-switch></u-switch>
					</view>
					<view class="cell">
						<view>
							<view class="tlt">是否开启</view>
							<view class="sub-tlt">显示第三方配送品牌</view>
						</view>
						<u-switch></u-switch>
					</view>
					<view class="cell">
						<view>
							<view class="tlt">是否开启</view>
							<view class="sub-tlt">显示第三方配送骑手</view>
						</view>
						<u-switch></u-switch>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		mame:'showSetting',
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
		flex: 1;
		text-align: center;
	}
	.cell{
		background-color: #F6F5FA;
		padding: 21px 16px;
		display: flex;
		width: calc(100% - 24px);
		justify-content: space-between;
		margin-bottom: 10px;
		border-radius: 5px;
	}
	.tlt{
		color: #101E3E;
		font-size: 15px;
	}
	.sub-tlt{
		color: #9FA7B6;
		font-size: 13px;
	}
</style>
