<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png"></image>
					<view class="pop-tlt">主营业务</view>
					<view class="confirm">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 300rpx;">
					<view class="minute-list">
						<view :class="['minute',index%3==2?'item-right':'']" :style="{'width':itemWidth+'px'}" v-for="(item,index) in goods" :key="index">
							{{item.name}}
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
				show:false,
				itemWidth:0,
				weight:1,
				goods:[]
			}
		},
		methods:{
			init(){
				this.show=true
				this.itemWidth=(globalData.windowWidth-105)/3.0
				this.getBusinessCategoryList()
			},
			getBusinessCategoryList(){
				var _self=this
				var params={
					url:'app/merchant/category',
					method:'get',
					data:{},
					callBack:function(res){
						console.log(res)
						if(res.code==200){
							_self.goods=res.data
						}
					}
				}
				this.$http.request(params)
			}
		}
	}
</script>

<style lang="scss">
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
	.item-right{
		margin-right: 0px;
	}
	.footer{
		padding: 20upx 70upx;
	}
	.footer-tlt{
		color: #0D1C40;
		font-size: 15px;
	}
	.slider{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10px;
		view{
			color: #9FA7B6;
			font-size: 13px;
		}
	}
</style>
