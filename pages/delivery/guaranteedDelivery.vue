<template>
	<view class="box">
		<view class="section">
			<view class="nav">
				<text class="tlt">保底配送</text>
				<u-switch active-color="#E95008" inactive-color="#F8F8F8" v-model="info.openGuarantee"></u-switch>
			</view>
			<view class="sub">开启后按费用由低到高发单，直到骑手接单为止</view>
		</view>
		<view class="section">
			<view class="nav">
				<text class="tlt">保底运力</text>
			</view>
			<view class="list">
				<view :class="['item',{ xuzhon: isSelect(item)}]"
				 v-for="(item, index) in deliverylist" :key="index" @click="tjpt(item.deliveryId)">{{ item.name }}</view>
			</view>
		</view>
		<view class="section">
			<view class="nav">
				<text class="tlt">触发时长</text>
			</view>
			<view class="sub">配送下单<text class="num">{{info.guaranteeOrderTime}}</text>分钟后，如未接单则发起保底配送</view>
			<view class="delivery-menu" @click.stop="showMinute = true">
				<view class="delivery-tlt">下单时长</view>
				<view class="delivery-value">{{ info.guaranteeOrderTime }}分钟</view>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
		</view>
		<view class="section">
			<view class="nav">
				<text class="tlt">触发时长</text>
			</view>
			<view class="sub">配送下单<text class="num">{{info.addPriceTime}}</text>分钟后，如未接单则自动加<text class="num">{{info.tipAmount}}</text>元小费</view>
			<view class="delivery-menu" @click.stop="showAmount = true">
				<view class="delivery-tlt">小费金额</view>
				<view class="delivery-value">{{ info.tipAmount }}元</view>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
			<view class="delivery-menu" @click.stop="showMinute2 = true">
				<view class="delivery-tlt">自动加价时长</view>
				<view class="delivery-value">{{ info.addPriceTime }}分钟</view>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save" @click.stop="save">保存</view>

		<u-popup mode="bottom" v-model="showMinute" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="showMinute = false"></image>
					<view class="pop-tlt">触发时长</view>
					<view class="confirm" @click="qdminutes">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 300rpx">
					<view class="minute-list">
						<view :class="['minute',{'item-right':index%3==2},{ xuzhon: times == item.value }]" v-for="(item, index) in minutes"
						 :key="index" :style="{'width':itemWidth+'px'}" @click="setminute(item)">
							{{ item.label }}
						</view>
					</view>
					<input class="pop-input" v-model="times" placeholder="其他时长" />
				</scroll-view>
			</view>
		</u-popup>
		<u-popup mode="bottom" v-model="showMinute2" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="showMinute = false"></image>
					<view class="pop-tlt">触发时长</view>
					<view class="confirm" @click="qdminutes2">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 300rpx">
					<view class="minute-list">
						<view :class="['minute',index%3==2?'item-right':'',{ xuzhon: times2 == item.value }]" :style="{'width':itemWidth+'px'}"
						 v-for="(item, index) in minutes" :key="index" @click="setminute2(item)">
							{{ item.label }}
						</view>
					</view>
					<input class="pop-input" v-model="times2" placeholder="其他时长" />
				</scroll-view>
			</view>
		</u-popup>

		<u-popup mode="bottom" v-model="showAmount" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png" @click.stop="showAmount = false"></image>
					<view class="pop-tlt">设置加费</view>
					<view class="confirm" @click="qdprice">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 300rpx">
					<view class="minute-list">
						<view :class="['minute',{'item-right':index%3==2},{ xuzhon: price == item.value }]" v-for="(item, index) in amounts"
						 :style="{'width':itemWidth+'px'}" :key="index" @click="setprice(item)">
							{{ item.label }}
						</view>
					</view>
					<input class="pop-input" placeholder="其他金额" />
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	export default {
		data() {
			return {
				showMinute: false,
				showAmount: false,
				showMinute2: false,
				itemWidth: 0,
				minutes: [{
						label: "1分钟",
						value: 1,
					},
					{
						label: "5分钟",
						value: 5,
					},
					{
						label: "10分钟",
						value: 10,
					},
					{
						label: "30分钟",
						value: 30,
					},
					{
						label: "45分钟",
						value: 45,
					},
					{
						label: "60分钟",
						value: 60,
					},
				],
				amounts: [{
						label: "1元",
						value: 1,
					},
					{
						label: "2元",
						value: 2,
					},
					{
						label: "3元",
						value: 3,
					},
					{
						label: "5元",
						value: 5,
					},
					{
						label: "8元",
						value: 8,
					},
					{
						label: "10元",
						value: 10,
					},
				],
				deliverylist: [],
				times: null,
				times2: null,
				price: null,
				info: {
					openGuarantee: false,
					guaranteeDeliveryIds: [],
					guaranteeOrderTime: 0,
					tipAmount: 0,
					addPriceTime: 0,
				},
				type: 1
			};
		},
		onLoad(options) {
			this.type = options.type
			this.http_delivery();
			this.updata();
			this.itemWidth = (globalData.windowWidth - 110) / 3.0
		},
		methods: {
			http_delivery() {
				let params = {
					url: "app/delivery/floor/list",
					method: "GET",
					data: {},
					callBack: (res) => {
						this.deliverylist = res.data;
					},
				};
				this.$http.request(params);
			},
			updata() {
				let params = {
					url: "app/delivery/floor/detail",
					method: "GET",
					data: {},
					callBack: (res) => {
						console.log(res)
						if (res.data) {
							this.info = res.data;
							this.info.guaranteeDeliveryIds=res.data.guaranteeDeliveryIds?res.data.guaranteeDeliveryIds.split(','):[],
							this.info.openGuarantee=res.data.openGuarantee==1?true:false
							this.info.guaranteeOrderTime=res.data.guaranteeOrderTime?(res.data.guaranteeOrderTime/60):0
							this.info.addPriceTime=res.data.addPriceTime?(res.data.addPriceTime/60):0
						}
					},
				};
				this.$http.request(params);
			},
			tjpt(id) {
				try {
					if (this.info.guaranteeDeliveryIds.indexOf(id+'')>=0) {
						let arr = this.info.guaranteeDeliveryIds;
						this.info.guaranteeDeliveryIds = arr.filter((e) => {
							return e != id
						});
					} else {
						this.info.guaranteeDeliveryIds.push(id+'');
					}
				} catch (error) {
				}
			},
			isSelect(item){
				let flag=this.info.guaranteeDeliveryIds.indexOf(item.deliveryId+'')
				return flag==-1?false:true
			},
			setminute(item) {
				this.times = item.value;
			},
			qdminutes() {
				this.info.guaranteeOrderTime = this.times;
				this.showMinute = false;
			},
			setminute2(item) {
				this.times2 = item.value;
			},
			qdminutes2() {
				this.info.addPriceTime = this.times2;
				this.showMinute2 = false;
			},
			setprice(item) {
				this.price = item.value;
			},
			qdprice() {
				this.info.tipAmount = this.price;
				this.showAmount = false;
			},
			
			save(){
				var params={
					url:'app/delivery/floor/add',
					method:'POST',
					data:{
						guaranteeDeliveryIds:this.info.guaranteeDeliveryIds.join(','),
						openGuarantee:this.info.openGuarantee?1:0,
						tipAmount:this.info.tipAmount,
						guaranteeOrderTime:this.info.guaranteeOrderTime*60,
						addPriceTime:this.info.addPriceTime*60
					},
					callBack:(res)=>{
						uni.hideLoading()
						if(res.code==200){
							uni.showToast({
								title:'保存成功',
								icon:'none'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			}
		},
	};
</script>

<style lang="scss">
	page {
		background-color: #f6f7f9;
	}

	.box {
		padding: 10px;
	}

	.section {
		background-color: white;
		padding: 16px 9px;
		border-radius: 7px;
		margin-bottom: 10px;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.tlt {
			color: #0d1c40;
			font-size: 17px;
		}
	}

	.sub {
		color: #9fa7b6;
		font-size: 12px;
		margin-top: 6px;
	}

	.list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.item {
			height: 28px;
			line-height: 28px;
			padding: 0px 15px;
			border: solid 1px #9ea7b7;
			border-radius: 14px;
			margin-right: 15px;
			margin-top: 12px;
			color: #0d1c40;
			font-size: 13px;

			&.xuzhon {
				background-color: rgba(253, 238, 231, 1);
				color: rgba(219, 95, 41, 1);
				border-color: rgba(219, 95, 41, 1);
			}
		}
	}

	.delivery-menu {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 8px;

		.delivery-tlt {
			color: #101e3e;
			font-size: 14px;
		}

		.delivery-value {
			color: #db5f29;
			font-size: 14px;
			flex: 1;
			text-align: right;
			padding-right: 5px;
		}

		.arrow {
			width: 5px;
			height: 11px;
		}
	}

	.bottom {
		height: 70px;
	}

	.save {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20px;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		color: white;
		width: calc(100% - 60px);
		text-align: center;
		font-size: 16px;
		background-color: #e95008;
	}

	.pop-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 32px;

		image {
			width: 12px;
			height: 12px;
		}
	}

	.pop-tlt {
		color: #0d1c40;
		font-size: 15px;
		font-weight: bold;
	}

	.confirm {
		color: #fa6f06;
		font-size: 14px;
	}

	.minute-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0px 37px;
	}

	.minute {
		width: 90px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		color: #0d1c40;
		font-size: 13px;
		border: solid 1px #9ea7b7;
		text-align: center;
		margin-right: 15px;
		margin-bottom: 17px;

		&.xuzhon {
			background-color: rgba(253, 238, 231, 1);
			color: rgba(219, 95, 41, 1);
			border-color: rgba(219, 95, 41, 1);
		}
	}

	.pop-input {
		text-align: center;
		margin: 5px 38px;
		border: solid 1px #9ea7b7;
		height: 35px;
		line-height: 35px;
		border-radius: 35px;
	}

	.item-right {
		margin-right: 0px;
	}
	.num{
		color: #E97730;
		font-size: 14px;
		font-weight: bold;
		margin-left: 4px;
		margin-right: 4px;
	}
</style>

