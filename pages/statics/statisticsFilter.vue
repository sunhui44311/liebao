<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="show=false"></image>
					<view class="pop-tlt">统计筛选</view>
					<view class="nav-confirm" @click.stop="confirm">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 500upx;padding: 24upx 70upx;">
					<view class="cell">
						<view class="cell-tlt">门店</view>
						<view class="shop-list">
							<view :class="item.id==selectShop.id?'select':'noselect'" v-for="(item,index) in shopList" :key="index" @click.stop="selectShop=item">{{item.name}}</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-tlt">时间</view>
						<view class="shop-list">
							<view :class="['month',timeType==1?'select':'noselect']" :style="{width:itemW+'px'}" @click.stop="timeType=1" style="border-radius: 28upx;">今日</view>
							<view :class="['month',timeType==2?'select':'noselect']" :style="{width:itemW+'px'}" @click.stop="timeType=2" style="border-radius: 28upx;">昨日</view>
							<view :class="['month',timeType==3?'select':'noselect']" :style="{width:itemW+'px'}" @click.stop="timeType=3" style="border-radius: 28upx;"> 本月</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-tlt">自定义时间</view>
						<view class="date-list">
							<view class="date-item" @click.stop="selectDate(1)">
								<view :style="{'color':startTime?'#101E3E':'#A1A7B4'}">{{startTime?startTime:'选择开始时间'}}</view>
								<image src="../../static/image/dibiao2.png"></image>
							</view>
							<view class="date-line"></view>
							<view class="date-item" @click.stop="selectDate(2)">
								<view :style="{'color':endTime?'#101E3E':'#A1A7B4'}">{{endTime?endTime:'选择结束时间'}}</view>
								<image src="../../static/image/dibiao2.png"></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-picker v-model="showDate" mode="time" :params="params" @confirm="timeConfirm"></u-picker>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	import{ fun_date,dateMinus } from '../../utils/util.js'
	export default{
		mame:'showSetting',
		data(){
			return{
				show:false,
				showDate:false,
				showDateType:1,
				itemW:0,
				startTime:'',
				endTime:'',
				shopList:[],
				selectShop:'',
				timeType:1,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				}
			}
		},
		onLoad() {
			
		},
		methods:{
			init(){
				this.show=true
				this.itemW=(globalData.windowWidth-105)/3.0
				this.getShopList()
			},
			selectDate(type){
				this.showDateType=type
				this.showDate=true
			},
			
			timeConfirm(e){
				if(this.showDateType==1){
					let startTime=`${e.year}-${e.month}-${e.day}`
					let days=dateMinus(startTime,this.endTime)
					if(days<=-1){
						uni.showToast({
							title:'开始时间必须小于结束时间',
							icon:'none'
						})
						return
					}
					this.startTime=startTime
				}
				else{
					let endTime=`${e.year}-${e.month}-${e.day}`
					let days=dateMinus(this.startTime,endTime)
					if(days<=0){
						uni.showToast({
							title:'结束时间必须大于开始时间',
							icon:'none'
						})
						return
					}
					this.endTime=endTime
				}
			},
			getShopList(){
				var params={
					url:'app/shop/list',
					method:'GET',
					data:{},
					callBack:(res)=>{
						console.log(res)
						this.shopList=res.data
					}
				}
				this.$http.request(params)
			},
			confirm(){
				this.show=false
				this.$emit('statistics',{
					shopId:this.selectShop?this.selectShop.id:0,
					shopName:this.selectShop.name,
					timeType:this.timeType,
					timeName:this.timeType==1?'今日':(this.timeType==2?'昨日':'本月'),
					startTime:this.startTime,
					endTime:this.endTime
				})
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
	
	/*日期*/
	.date-list{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		width: calc(100% - 70px);
	}
	
	.date-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 130px;
		height: 24px;
		padding: 0px 12px;
		border: solid 1px #DDDDDD;
		border-radius: 12px;
		view{
			flex: 1;
			text-align: center;
			color: #333333;
			font-size: 12px;
		}
		image{
			width: 15upx;
			height: 8upx;
		}
	}
	.date-line{
		width: 23px;
		height: 1px;
		background-color: #DDDDDD;
		margin: 0px 10px;
	}
</style>
