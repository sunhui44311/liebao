<template>
	<view class="box">
		<view class="section">
			<view class="start">
				<text class="start-tlt">发</text>
				<text class="start-address">{{sendAddress.address}}</text>
			</view>
			<view class="start contact">
				<text class="name">{{sendAddress.contact}}</text>
				<text class="tel">{{sendAddress.phone}}</text>
			</view>

			<view class="start" style="margin-top: 20px;">
				<text class="start-tlt" style="background-color: #1087FE;">收</text>
				<text class="start-address">{{receiptAddress.address}}</text>
			</view>
			<view class="start contact">
				<text class="name">{{receiptAddress.contact}}</text>
				<text class="tel">{{receiptAddress.phone}}</text>
			</view>
			<image class="exchange" src="../../static/image/exchange@2x.png" @click.stop="exchange"></image>
		</view>
		<view class="section1">
			<view class="cell" @click.stop="menu(1)">
				<view class="cell-left">
					<image class="icon" src="../../static/image/goods@2x.png"></image>
					<text>物品信息</text>
				</view>
				<view class="cell-right">
					<text class="active-txt" v-if="selectProduct?true:false">{{selectProduct.name}}/{{weight}}KG</text>
					<text class="bank" v-else>必填</text>
					<image src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="line"></view>
			</view>
			<view class="cell" @click.stop="menu(2)">
				<view class="cell-left">
					<image class="icon" src="../../static/image/time@2x.png"></image>
					<text>取件时间</text>
				</view>
				<view class="cell-right">
					<text class="active-txt" v-if="formatter_time?true:false">{{formatter_time}}</text>
					<text class="bank" v-else>必填</text>
					<image src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="line"></view>
			</view>
			<view class="cell" @click.stop="menu(3)">
				<view class="cell-left">
					<image class="icon" src="../../static/image/remark@2x.png"></image>
					<text>备注</text>
				</view>
				<view class="cell-right">
					<text :class="remark?'active-txt':'bank'">{{remark?remark:'选填'}}</text>
					<image src="../../static/image/enter@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="btn" @click.stop="eveluatePrice">立即计价</view>
		<good-info-input ref="goodInfoInput" @selectProduct="onSelectProdcut"></good-info-input>
		<submit-bill ref="submitBill"></submit-bill>
		<u-select v-model="show" mode="mutil-column-auto" :list="dateList" @confirm="confirm"></u-select>
	</view>
</template>

<script>
	import goodInfoInput from './goodInfoInput.vue'
	import submitBill from './submitBill.vue'
	export default {
		components: {
			goodInfoInput,
			submitBill
		},
		data() {
			return {
				dateList:[],
				show:false,
				sendAddress:{},
				receiptAddress:{},
				selectProduct:null,
				weight:1,
				remark:'',
				formatter_time:'',
				selectTime:''
			}
		},
		onLoad() {
			this.receiptAddress=getApp({allowDefault: true}).globalData.receiptAddress,
			this.sendAddress=getApp({allowDefault: true}).globalData.sendAddress
			Date.prototype.Format = function(fmt) {
				var o = {
					"M+": this.getMonth() + 1, //月份
					"d+": this.getDate(), //日
					"h+": this.getHours(), //小时
					"m+": this.getMinutes(), //分
					"s+": this.getSeconds(), //秒
					"q+": Math.floor((this.getMonth() + 3) / 3), //季度
					"S": this.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
						o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
			var endTime;
			for(var i=0;i<15;i++){
				var date = new Date();
				if(i==0){
					let nowDate=date.Format("yyyy-MM-dd")
					let time=date.Format("hh:mm:ss")
					let dic={
						label:'今天',
						value:nowDate,
						children:[{
							label:'立即取件',
							value:time
						}].concat(this.getHoursList(date.getHours()+1))
					}
					this.dateList.push(dic)
				}
				else if(i==1){
					date.setDate(date.getDate()+1)
					let today=date.Format("yyyy-MM-dd")
					let dic={
						label:'明天',
						value:today,
						children:this.getHoursList(1)
					}
					this.dateList.push(dic)
					
				}
				else{
					date.setDate(date.getDate()+i)
					endTime = date.Format("yyyy-MM-dd");
					let dic={
						label:endTime,
						value:endTime,
						children:this.getHoursList(1)
					}
					this.dateList.push(dic)
				}
			}
		},
		
		methods: {
			menu(index) {
				if (index == 1) {
					this.$refs['goodInfoInput'].init()
				} else if (index == 2) {
					this.show=true
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pages/bill/billRemark'
					})
				}
			},
			
			exchange(){
				let tempObj=JSON.stringify(this.receiptAddress)
				this.receiptAddress=JSON.parse(JSON.stringify(this.sendAddress))
				this.sendAddress=JSON.parse(tempObj)
			},
			
			onSelectProdcut(data){
				console.log(data)
				this.selectProduct=data.product
				this.weight=data.weight
			},
			
			remarkInput(remark){
				this.remark=remark
			},
			
			getHoursList(index){
				var list=[]
				for(var i=index;i<=24;i++){
					let value=i<10?('0'+i):i
					var dic={
						label:i+'时',
						value:value+':00:00'
					}
					list.push(dic)
				}
				return list
			},
			confirm(e){
				console.log(e)
				let time=e[1].label
				this.selectTime=`${e[0].value} ${e[1].value}`
				this.formatter_time=time=='立即取件'?time:this.selectTime
			},
			eveluatePrice(){
				if(!this.selectProduct){
					uni.showToast({
						title:'请选择商品信息',
						icon:'none'
					})
					return
				}
				if(!this.selectTime){
					uni.showToast({
						title:'请选择取件时间',
						icon:'none'
					})
					return
				}
				let sendAddressList=[]
				let receiptAddressList=[]
				if(uni.getStorageSync('sendAddressList')){
					sendAddressList=JSON.parse(uni.getStorageSync('sendAddressList'))
					console.log(1111)
					console.log(sendAddressList)
				}
				sendAddressList.push(this.sendAddress)
				
				if(uni.getStorageSync('receiptAddressList')){
					receiptAddressList=JSON.parse(uni.getStorageSync('receiptAddressList'))
				}
				receiptAddressList.push(this.receiptAddressStr)
				
				uni.setStorageSync('sendAddressList',JSON.stringify(sendAddressList))
				uni.setStorageSync('receiptAddressList',JSON.stringify(receiptAddressList))
				var params={
					url:'app/order/valuation',
					method:'POST',
					data:{
						productId:this.selectProduct.id,
						sendAddress:this.sendAddress,
						receiptAddress:this.receiptAddress,
						takeTime:this.selectTime,
						weight:this.weight
					},
					callBack:function(res){
						uni.hideLoading()
						console.log(res)
						let sendAddressStr=JSON.stringify(this.sendAddress)
						let receiptAddressStr=JSON.stringify(this.receiptAddress)
						uni.setStorageSync('sendAddress',sendAddressStr)
						uni.setStorageSync('receiptAddress',receiptAddressStr)
					}
				}
				uni.showLoading({
					title:'正在计算'
				})
				this.$http.request(params)
				this.$refs['submitBill'].init()
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
		position: relative;
		background-color: white;
		padding: 40upx 20upx;
		border-radius: 6px;
	}

	.start {
		flex-direction: row;
		justify-content: flex-start;
	}

	.start-tlt {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: #FA6F06;
		border-radius: 10px;
		color: white;
		line-height: 20px;
		text-align: center;
		margin-right: 10px;
		font-size: 11px;
	}

	.contact {
		margin-left: 30px;
		margin-top: 8px;
	}

	.start-address {
		color: #0D1C40;
		font-size: 13px;
	}

	.name {
		color: #0D1C40;
		font-size: 12px;
	}

	.tel {
		color: #0D1C40;
		font-size: 12px;
		margin-left: 16px;
	}

	.exchange {
		position: absolute;
		width: 36upx;
		height: 36upx;
		right: 36upx;
		top: 50%;
		transform: translateY(-50%);
	}

	.section1 {
		margin-top: 10px;
		background-color: white;
		border-radius: 6px;
	}

	.cell {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 40upx 0px 10px;
		height: 49px;
		position: relative;

		.cell-left {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #9EA7B7;
			font-size: 14px;

			.icon {
				width: 36upx;
				height: 36upx;
				margin-right: 12px;
			}
		}

		.cell-right {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			image {
				width: 24upx;
				height: 24upx;
			}
		}
	}

	.line {
		position: absolute;
		bottom: 0px;
		left: 40px;
		right: 24px;
		background-color: #EEEEEE;
		height: 1px;
	}

	.btn {
		position: fixed;
		bottom: 22px;
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		text-align: center;
		color: white;
		width: calc(100% - 85px);
		left: 50%;
		transform: translateX(-50%);
		font-size: 16px;
	}
	.bank{
		color: #9EA7B7;
		font-size: 14px;
	}
	.active-txt{
		color: #0D1C40;
		font-size: 14px;
	}
</style>
