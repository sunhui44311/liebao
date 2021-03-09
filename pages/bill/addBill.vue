<template>
	<view class="box">
		<view class="section">
			<view class="cell" @click.stop="choiceAddress">
				<image class="icon" src="../../static/image/bill-location@2x.png"></image>
				<view :class="startAddress?'cell-content':'no-address'">{{startAddress?startAddress:'收件信息(必填)'}}</view>
				<image class="arrow" src="../../static/image/fj2.png"></image>
				<view class="line"></view>
			</view>
			<view class="cell">
				<image class="icon" src="../../static/image/bill_flower@2x.png"></image>
				<input v-model="floor" class="cell-content" placeholder="楼层、单元、门牌号(选填)" />
				<view class="line"></view>
			</view>
			<view class="cell">
				<image class="icon" src="../../static/image/bill-contact@2x.png"></image>
				<input v-model="contact" class="cell-content" placeholder="姓名(必填)" />
				<view class="contact" @click.stop="getContacts">通讯录</view>
				<view class="line"></view>
			</view>
			<view class="cell">
				<image class="icon" src="../../static/image/bill-tel@2x.png"></image>
				<input v-model="phone" class="cell-content" type="number" maxlength="11" placeholder="手机号(必填)" />
				<view class="verticl-line"></view>
				<input class="cell-content" style="flex: 0.5;" placeholder="分手机号(选填)" />
			</view>
		</view>
		<view class="section">
			<view class="header">
				<view class="header-left">
					<image src="../../static/image/vertical-line@2x.png"></image>
					<view>常用地址</view>
				</view>
			</view>
			<view class="address-cell" v-for="(address,index) in addressList" :key="index" @click.stop="selectOftenAddress(address)">
				<image class="address-icon" src="../../static/image/history_addr@2x.png"></image>
				<view>
					<view>{{address.address}}</view>
					<view class="address-contact">
						<text>{{address.contact}}</text>
						<text style="margin-left: 8px;">{{address.phone}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="section">
			<view class="header">
				<view class="header-left">
					<image src="../../static/image/vertical-line@2x.png"></image>
					<view>历史地址</view>
				</view>
				<view class="header-right" @click.stop="clear">
					<text>清空</text>
					<image src="../../static/image/clear@2x.png"></image>
				</view>
			</view>
			<view class="address-cell" v-for="(address,index) in historyAddressList" :key="index" @click.stop="selectHistoryAddress(address)">
				<image class="address-icon" src="../../static/image/history_addr@2x.png"></image>
				<view>
					<view>{{address.address}}</view>
					<view class="address-contact">
						<text>{{address.contact}}</text>
						<text style="margin-left: 8px;">{{address.phone}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="btn" @click.stop="addAddress">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startAddress: '',
				contact:'',
				phone:'',
				floor:'',
				contacts:[],
				longitude:0,
				latitude:0,
				city:'',
				province:'',
				district:'',
				type:1,
				historyAddressList:[],
				addressList:[],
				addressId:''
			}
		},
		onLoad(options) {
			let that=this
			this.longitude=options.longitude
			this.latitude=options.latitude
			this.type=options.type
			this.getDetailAddress(options.longitude, options.latitude)
			uni.$on('selectAddress',(data)=>{
				that.selectHistoryAddress(data)
				console.log(that.latitude)
			})
			uni.$on('selectContact',(data)=>{
				that.contact=data.displayName
				that.phone=data.phoneNumbers[0].value
			})
			this.getAddressDataList()
		},
		onUnload() {
			uni.$off('selectAddress')
			uni.$off('selectContact')
		},
		onShow() {
			if(this.type==1){
				this.historyAddressList=JSON.parse(uni.getStorageSync('sendAddressList'))
			}
			else{
				this.historyAddressList=JSON.parse(uni.getStorageSync('receiptAddressList'))
			}
		},
		methods: {
			choiceAddress() {
				uni.navigateTo({
					url: `/pages/bill/choiceAddress?longitude=${this.longitude}&latitude=${this.latitude}&city=${this.city}`
				})
			},
			addBill() {
				uni.navigateTo({
					url: '/pages/bill/receiptBill'
				})
			},
			getDetailAddress(longitude, latitude) {
				let that = this
				let params = {
					key: '5ae8644771ef9abf9cfb3ea23b1df6ca',
					location: `${longitude},${latitude}`,
					extensions: 'all'
				}
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo',
					method: 'GET',
					data: params,
					dataType: 'json',
					success({
						data
					}) {
						let addressComponent = data.regeocode.addressComponent
						that.city=addressComponent.city.length==0?addressComponent.province:addressComponent.city
						let aois = data.regeocode.aois.length > 0 ? data.regeocode.aois[0] : ''
						let aoi = aois ? aois.name : ''
						that.startAddress = addressComponent.streetNumber.street + addressComponent.streetNumber.number + aoi
						that.startAddress=that.type==2?'':that.startAddress
						that.province=addressComponent.province
						that.city=addressComponent.city.length==0?addressComponent.province:addressComponent.city
						that.district=addressComponent.district
					}
				})
			},
			
			/*历史地址*/
			selectHistoryAddress(address){
				this.province=address.province
				this.city=address.city
				this.district=address.district
				this.startAddress=address.address
				this.longitude=address.lng
				this.latitude=address.lat
				this.floor=address.floor
				this.contact=address.contact
				this.phone=address.phone
				this.addressId=''
			},
			
			/*常用地址*/
			selectOftenAddress(address){
				this.province=address.provinceName
				this.city=address.cityName
				this.district=address.districtName
				this.startAddress=address.address
				this.longitude=address.lng
				this.latitude=address.lat
				this.floor=address.street
				this.contact=address.contact
				this.phone=address.phone
				this.addressId=address.id
			},
			
			clear(){
				if(!this.historyAddressList||this.historyAddressList.length==0)return
				let that=this
				uni.showModal({
					title:'提示',
					content:'确定要清楚历史地址',
					success(res) {
						if(res.confirm){
							uni.removeStorage({
								key:that.type==1?'sendAddressList':'receiptAddressList',
								success() {
									that.historyAddressList=[]
								}
							})
						}
					}
				})
			},
			
			/*添加收获地址*/
			addAddress(){
				if(this.startAddress.length==0){
					uni.showToast({
						title:'地址不能为空',
						icon:'none'
					})
					return
				}
				if(this.contact.length==0){
					uni.showToast({
						title:'姓名不能为空',
						icon:'none'
					})
					return
				}
				if(this.phone.length==0){
					uni.showToast({
						title:'手机号不能为空',
						icon:'none'
					})
					return
				}
				if(this.type==1){
					getApp().globalData.sendAddress.province=this.province
					getApp().globalData.sendAddress.city=this.city
					getApp().globalData.sendAddress.district=this.district
					getApp().globalData.sendAddress.address=this.startAddress
					getApp().globalData.sendAddress.lng=this.longitude
					getApp().globalData.sendAddress.lat=this.latitude
					getApp().globalData.sendAddress.floor=this.floor
					getApp().globalData.sendAddress.contact=this.contact
					getApp().globalData.sendAddress.phone=this.phone
					getApp().globalData.sendAddress.id=this.addressId
					uni.navigateBack({
						delta:1
					})
				}
				else if(this.type==2){
					getApp().globalData.receiptAddress.province=this.province
					getApp().globalData.receiptAddress.city=this.city
					getApp().globalData.receiptAddress.district=this.district
					getApp().globalData.receiptAddress.address=this.startAddress
					getApp().globalData.receiptAddress.lng=this.longitude
					getApp().globalData.receiptAddress.lat=this.latitude
					getApp().globalData.receiptAddress.floor=this.floor
					getApp().globalData.receiptAddress.contact=this.contact
					getApp().globalData.receiptAddress.phone=this.phone
					getApp().globalData.receiptAddress.id=this.addressId
					uni.navigateTo({
						url:'/pages/bill/receiptBill'
					})
					return
				}
			},
			
			getAddressDataList(){
				let that=this
				var params={
					url:'app/address/detail',
					method:'GET',
					data:{
						type:1
					},
					callBack:function(res){
						console.log(res)
						uni.hideLoading()
						that.addressList=res.data
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			},
			getContacts(){
				uni.navigateTo({
					url:'/pages/bill/choiceContact'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F7F9;
	}

	.box {
		padding: 10px;
	}

	.section {
		background-color: white;
		padding: 0px 24px 0px 10px;
		border-radius: 6px;
		margin-bottom: 10px;
	}

	.cell {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48px;
		position: relative;

		.icon {
			width: 36upx;
			height: 36upx;
			margin-right: 27upx;
		}

		.cell-content {
			flex: 1;
			color: #0D1C40;
			font-size: 14px;
		}

		.arrow {
			width: 10upx;
			height: 22upx;
		}

		.line {
			position: absolute;
			bottom: 0px;
			right: 0px;
			left: 30px;
			height: 1px;
			background-color: #EEEEEE;
		}
	}

	.verticl-line {
		width: 1px;
		height: 20px;
		background-color: #EEEEEE;
		margin-right: 20px;
	}

	.contact {
		border: solid 1px #F96E06;
		height: 22px;
		line-height: 22px;
		width: 55px;
		border-radius: 11px;
		color: #FA6F06;
		font-size: 13px;
		text-align: center;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;

		.header-left {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			image {
				width: 6upx;
				height: 29upx;
				margin-right: 5px;
			}

			view {
				color: #0D1C40;
				font-size: 15px;
			}
		}

		.header-right {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: #9EA7B7;
			font-size: 13px;

			image {
				width: 30upx;
				height: 30upx;
				margin-left: 4px;
			}
		}
	}

	.address-cell {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #0D1C40;
		font-size: 13px;
		padding-bottom: 10px;

		.address-icon {
			width: 36upx;
			height: 36upx;
			margin-right: 12px;
		}

		.address-contact {
			color: #0D1C40;
			font-size: 12px;
			margin-top: 8px;
		}
	}

	.btn {
		position: fixed;
		bottom: 22px;
		left: 45;
		width: calc(100% - 85px);
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		color: white;
		border-radius: 45px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 15px;
	}
	.no-address{
		color: #9EA7B7;
		font-size: 14px;
		flex: 1;
	}
	.bottom{
		height: 60px;
	}
</style>
