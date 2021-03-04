<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="show=false"></image>
					<view class="pop-tlt">物品信息</view>
					<view class="confirm" @click.stop="confirm">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 400rpx;">
					<view class="minute-list">
						<view :class="['minute',selectProduct.id==item.id?'active':'', index%3==2?'item-right':'']" @click.stop="selectChange(item)" :style="{'width':itemWidth+'px'}" v-for="(item,index) in goods" :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="footer">
						<view class="footer-tlt">重量：{{weight/2.0}}KG</view>
						<view class="slider">
							<view style="margin-right: 5px;">1KG</view>
							<u-slider style="flex: 1;" v-model="weight" step="2" min="2" max="100" active-color="#E95008" inactive-color="#FDEEE7"></u-slider>
							<view style="margin-left: 5px;">50KG</view>
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
				goods:[],
				selectProduct:{}
			}
		},
		methods:{
			init(){
				this.show=true
				this.itemWidth=(globalData.windowWidth-105)/3.0
				this.getProductList()
			},
			getProductList(){
				let that=this
				var params={
					url:'app/product/list',
					method:'get',
					data:{},
					callBack:function(res){
						console.log(res)
						that.goods=res.data
					}
				}
				this.$http.request(params)
			},
			selectChange(item){
				this.selectProduct=item
			},
			confirm(){
				if(!this.selectProduct){
					uni.showToast({
						title:'请选择物品信息',
						icon:'none'
					})
					return
				}
				this.show=false
				this.$emit('selectProduct',{product:this.selectProduct,weight:this.weight})
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
		font-weight: bold;
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
	.active{
		border: solid 1px #E95008;
		background-color: #FDEEE7;
		color: #E95008;
	}
</style>
