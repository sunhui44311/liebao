<template>
	<view>
		<view class="box">
			<view class="section">
				<view class="item select-item" @click.stop="choiceAddress">
					<text>位置</text>
					<text v-if="dataForm.address" style="color:#13203C;" class="item-content">{{dataForm.address}}</text>
					<text v-else class="item-no-content">点击选择位置</text>
					<image class="arrow" src="../../static/image/fj2.png"></image>
				</view>
				<view class="item">
					<text>门牌号</text>
					<input v-model="dataForm.street" placeholder="请填写楼层、单元、门牌号" />
				</view>
				<view class="item">
					<text>联系人姓名</text>
					<input v-model="dataForm.contact" placeholder="请填写姓名" />
				</view>
				<view class="item">
					<text>联系人电话</text>
					<input v-model="dataForm.phone" type="number" maxlength="11" placeholder="请填写手机号电话" />
				</view>
			</view>
			<view class="section section-default">
				<text>设为默认地址</text>
				<u-switch @change="setDefaultAddress()" active-color="#E95008" inactive-color="#F8F8F8" v-model="dataForm.isDefault"></u-switch>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save" :style="{'bottom':(this.id?80:20)+'px'}" @click.stop="save">保存</view>
		<view class="delete" v-if="this.id?true:false" @click.stop="deleteAddress">删除</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				isAdd:true,
				id:'',
				dataForm:{
					address:'',
					cityName:'',
					districtName:'',
					provinceName:'',
					phone:'',
					contact:'',
					lat:'',
					lng:'',
					isDefault:false,
					street:'',
					type:1
				}
			}
		},
		onLoad(options) {
			_self=this
			this.id=options.id
			if(this.id){
				uni.setNavigationBarTitle({
					title:'编辑地址'
				})
				this.getAddressDetail()
			}
			uni.$on('selectAddress',(data)=>{
				console.log(data)
				_self.dataForm.address=data.address
				_self.dataForm.lng=data.lng
				_self.dataForm.lat=data.lat
				_self.dataForm.provinceName=data.province
				_self.dataForm.cityName=data.city
				_self.dataForm.districtName=data.district
			})
		},
		methods: {
			choiceAddress() {
				uni.navigateTo({
					url: `/pages/bill/choiceAddress`
				})
			},
			
			getAddressDetail(){
				let that=this
				var params={
					url:'app/address/info',
					method:'GET',
					data:{
						addressId:this.id
					},
					callBack:function(res){
						uni.hideLoading()
						that.dataForm=res.data
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			},
			
			deleteAddress(){
				uni.showModal({
					title:'提示',
					content:'确定要删除？',
					success(res) {
						if(res.confirm){
							_self.deleteByAddressId()
						}
					}
				})
			},
			
			setDefaultAddress(){
				var params={
					url:'app/address/default',
					method:'POST',
					data:{
						addressId:this.id
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							let pages=getCurrentPages()
							let curPage=pages[pages.length-2]
							curPage.$vm.getDataList()
							uni.showToast({
								title:'设置成功'
							})
						}
					}
				}
				uni.showLoading({
					title:'正在请求'
				})
				this.$http.request(params)
			},
			
			deleteByAddressId(){
				var params={
					url:'app/address/delete',
					method:'POST',
					data:{
						addressId:this.id
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							let pages=getCurrentPages()
							let curPage=pages[pages.length-2]
							curPage.$vm.getDataList()
							uni.showToast({
								title:'删除成功'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								},1000)
							})
						}
					}
				}
				uni.showLoading({
					title:'正在请求'
				})
				this.$http.request(params)
			},
			
			save(){
				if(!this.dataForm.address){
					uni.showToast({
						title:'请选择地址',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.contact){
					uni.showToast({
						title:'请填写联系人姓名',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.phone){
					uni.showToast({
						title:'请填写联系人电话',
						icon:'none'
					})
					return
				}
				var params={
					url: this.id?'app/address/update':'app/address/add',
					method:'POST',
					data:Object.assign(this.dataForm,{
						isDefault:this.dataForm.isDefault?1:0
					}),
					callBack:function(res){
						uni.hideLoading()
						console.log(res)
						if(res.code==200){
							let pages=getCurrentPages()
							let curPage=pages[pages.length-2]
							curPage.$vm.getDataList()
							uni.showToast({
								title:'保存成功'
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
					title:'正在提交',
					mask:true
				})
				this.$http.request(params)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F7F9;
	}

	.box {
		margin: 12px 10px 12px 10px;
	}

	.section {
		background-color: white;
		padding: 0px 12px 0px 12px;
		border-radius: 6px;
		margin-bottom: 10px;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		line-height: 40px;
		border-bottom: solid 1px #EEEEEE60;

		text {
			color: #9EA7B7;
			font-size: 14px;
		}

		input {
			flex: 1;
			text-align: right;
			font-size: 14px;
		}
	}
	.select-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.item-content{
		flex: 1;
		text-align: right;
		margin-right: 34upx;
		color: #13203C;
	}
	
	.item-no-content{
		flex: 1;
		text-align: right;
		margin-right: 34upx;
		color: #9FA7B6;
	}
	
	.arrow{
		width: 10upx;
		height: 22upx;
	}

	.item:last-child {
		border-bottom: none;
	}

	.bottom{
		height: 70px;
	}
	
	.section-default{
		height: 107upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #101E3E;
		font-size: 14px;
	}

	.save {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 80px;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		color: white;
		width: calc(100% - 60px);
		text-align: center;
		font-size: 16px;
		background-color: #E95008;
	}
	.delete{
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
		border: solid 1px #E95008;
		color: #E95008;
	}
</style>
