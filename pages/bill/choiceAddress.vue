<template>
	<view>
		<view class="header">
			<view class="city" @click.stop="choiceCity">
				<text>{{city}}</text>
				<image src="../../static/image/arrow@2x.png"></image>
			</view>
			<view class="search">
				<u-search shape="square" v-model="keyword" :show-action="false" @change="searchChange" placeholder="请输入收件地址，如小区、大厦、街道名"></u-search>
			</view>
		</view>
		<view class="box">
			<view class="cell" v-for="(poi,index) in poiList" :key="index" @click.stop="choiceAdress(poi)">
				<image class="location" src="../../static/image/bill-location@2x.png"></image>
				<view class="info">
					<view>{{poi.name}}</view>
					<view>{{poi.address}}</view>
				</view>
				<view class="line"></view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default{
		data(){
			return{
				longitude:0,
				latitude:0,
				poiList:[],
				city:'',
				keyword:''
			}
		},
		onLoad(options) {
			_self=this
			this.longitude=options.longitude
			this.latitude=options.latitude
			this.city=options.city
			console.log(options)
			if(this.city){
				this.getAroundPoi()
			}
			else{
				this.location()
			}
		},
		methods:{
			choiceAdress(poi){
				uni.navigateTo({
					url:'/pages/bill/choiceMapAddress?location='+poi.location
				})
			},
			
			/*选择城市*/
			choiceCity(){
				uni.navigateTo({
					url:'/pages/city/choice/index'
				})
			},
			
			searchChange(){
				this.getKeywordPoi()
			},
			
			getKeywordPoi(){
				var that=this
				var params={
					key:'5ae8644771ef9abf9cfb3ea23b1df6ca',
					city:this.city,
					keywords:this.keyword,
					offset:20
				}
				uni.request({
					url:'https://restapi.amap.com/v3/place/text',
					method:'GET',
					data:params,
					success(res) {
						console.log(res)
						that.poiList=res.data.pois
					}
				})
			},
			
			getAroundPoi(){
				var that=this
				var params={
					key:'5ae8644771ef9abf9cfb3ea23b1df6ca',
					location:`${this.longitude},${this.latitude}`,
					city:this.city,
					keywords:this.keyword,
					offset:20
				}
				uni.request({
					url:'https://restapi.amap.com/v3/place/around',
					method:'GET',
					data:params,
					success(res) {
						console.log(res)
						that.poiList=res.data.pois
					}
				})
			},
			location(){
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					geocode:true,
					success: function(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						_self.latitude=latitude
						_self.longitude=longitude
						_self.getDetailAddress(res)
					}
				})
			},
			
			getDetailAddress(location){
				let that=this
				let params={
					key:'5ae8644771ef9abf9cfb3ea23b1df6ca',
					location:`${location.longitude},${location.latitude}`,
					extensions:'all'
				}
				uni.request({
					url:'https://restapi.amap.com/v3/geocode/regeo',
					method:'GET',
					data:params,
					dataType:'json',
					success({data}) {
						let addressComponent=data.regeocode.addressComponent
						that.city=addressComponent.city.length==0?addressComponent.province:addressComponent.city
						that.getAroundPoi()
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.header{
		background-color: white;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 20px;
		z-index: 999;
	}
	.city{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 60px;
		image{
			width: 16upx;
			height: 16upx;
			margin-left: 16upx;
		}
	}
	.search{
		flex: 1;
	}
	.cell{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 15px 8px;
		position: relative;
	}
	.box{
		margin: 60px 10px 0px 10px;
		background-color: white;
		border-radius: 6px;
	}
	.location{
		width: 36upx;
		height: 36upx;
		margin-right: 12px;
	}
	.info>view:first-child{
		color: #0D1C40;
		font-size: 14px;
	}
	.info>view:last-child{
		color: #9FA7B6;
		font-size: 12px;
		margin-top: 6px;
	}
	.line{
		position: absolute;
		bottom: 0px;
		height: 1px;
		background-color: #EEEEEE;
		left: 35px;
		right: 30px;
	}
</style>
