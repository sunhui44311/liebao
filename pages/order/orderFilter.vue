<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="show=false"></image>
					<view class="pop-tlt">订单筛选</view>
					<view class="nav-confirm" @click.stop="confirm">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 400upx;padding: 24upx 70upx;">
					<view class="cell">
						<view class="cell-tlt">平台</view>
						<view class="shop-list">
							<view :class="['month',selectPlatform.id==item.id?'select':'noselect']" v-for="(item,index) in platformList" :key="index" @click.stop="selectPlatform=item" style="border-radius: 28upx;">今日</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-tlt">门店</view>
						<view class="shop-list">
							<view :class="item.id==selectShop.id?'select':'noselect'" v-for="(item,index) in shopList" :key="index" @click.stop="selectShop=item">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	export default{
		data(){
			return{
				platformList:[{
					name:'饿了吗',
					id:1
				},{
					name:'达达',
					id:2
				}],
				shopList:[{
					name:'门店1',
					id:1
				},{
					name:'门店2',
					id:2
				}],
				selectShop:{},
				selectPlatform:{},
				show:false
			}
		},
		methods:{
			init(){
				this.show=true
			},
			confirm(){
				
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
	.nav-confirm{
		color: #FA6F06;
		font-size: 14px;
	}
	.cell{
		margin-bottom: 40upx;
	}
	.cell-tlt{
		color: #0D1C40;
		font-size: 15px;
	}
	.shop-list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-top: 15px;
		view{
			font-size: 13px;
			height: 56upx;
			padding: 0px 26upx;
			border-radius: 4upx;
			line-height: 56upx;
			margin-right: 35upx;
		}
	}
	
	
	.select{
		color: #E95008;
		font-size: 13px;
		background-color: #FDEEE7;
		border: solid 1px #E95008;
	}
	
	.noselect{
		color: #0D1C40;
		font-size: 13px;
		border: solid 1px #9EA7B7;
	}
	.month{
		text-align: center;
		border-radius: 28px;
	}
</style>
