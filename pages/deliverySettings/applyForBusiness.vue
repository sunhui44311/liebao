<template>
	<view>
		<view class="box">
			<view class="section">
				<view class="nav">
					<image src="../../static/image/add_shop@2x.png"></image>
					<text>门店信息</text>
				</view>
				<view class="item">
					<text>商家名称</text>
					<input v-model="dataForm.merchantName" placeholder="请填写" />
				</view>
				<view class="item">
					<text>商户类型</text>
					<u-radio-group v-model="dataForm.licenseType">
						<u-radio name="1" active-color="#FC7200">个体户</u-radio>
						<u-radio name="3" active-color="#FC7200">企业</u-radio>
					</u-radio-group>
				</view>
				<view class="item">
					<text>门店类型</text>
					<u-radio-group v-model="dataForm.merchantType">
						<u-radio name="1" icon-size="28" label-size="28rpx" active-color="#FC7200">单门店</u-radio>
						<u-radio name="2" icon-size="28" label-size="28rpx" active-color="#FC7200">多门店</u-radio>
					</u-radio-group>
				</view>
				<view class="item" @click.stop="showMainPop">
					<text>主营业务</text>
					<text v-if="selectGood?true:false" class="active-input" style="color:#13203C;">{{selectGood.name}}</text>
					<text v-else class="inactive-txt">点击选择</text>
					<image class="item-arrow" src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="item" @click.stop="choiceAddress">
					<text>门店地址</text>
					<text class="active-input"  v-if="dataForm.address?true:false" style="color:#13203C;">{{dataForm.address}}</text>
					<text class="inactive-txt" v-else>点击选择</text>
					<image class="item-arrow" src="../../static/image/enter@2x.png"></image>
				</view>
				<view class="item">
					<text>详细地址</text>
					<input v-model="dataForm.street" placeholder="请填写" />
				</view>
			</view>
			<view class="section">
				<view class="nav">
					<image src="../../static/image/contact@2x.png"></image>
					<text>联系人</text>
				</view>
				<view class="item">
					<text>联系人姓名</text>
					<input v-model="dataForm.contactName" placeholder="请填写" />
				</view>
				<view class="item">
					<text>联系人电话</text>
					<input v-model="dataForm.mobile" placeholder="请填写手机号" />
				</view>
			</view>
			<view class="section upload-info">
				<view class="tip">上传证照信息可获得更多优质运力</view>
				<view class="nav id-num">
					<image src="../../static/image/id-info@2x.png"></image>
					<text>证件信息</text>
					<text class="nav-tip">（身份证姓名需与联系人姓名一致）</text>
				</view>
				<view class="id-imgs">
					<view class="id-left">
						<image class="id-back" :src="dataForm.idcardFront?dataForm.idcardFront:'../../static/image/id-font@2x.png'" @click.stop="upload(1)"></image>
						<image class="id-back" :src="dataForm.idcardBack?dataForm.idcardBack:'../../static/image/id-back@2x.png'" @click.stop="upload(2)"></image>
					</view>
					<image class="id-right" :src="dataForm.bizLicense?dataForm.bizLicense:'../../static/image/business@2x.png'" @click.stop="upload(3)"></image>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save" @click.stop="save">保存</view>
		<main-bussiness-input ref="mainBussinessInput" @selectGood="onSelectGood"></main-bussiness-input>
		<u-action-sheet :list="actionSheetList" v-model="showActionSheet" @click="click" :cancel-btn="true"></u-action-sheet>
	</view>
</template>

<script>
	import mainBussinessInput from './mainBussinessInput.vue'
	var _self
	export default {
		components:{
			mainBussinessInput
		},
		data() {
			return {
				showActionSheet:false,
				selectGood:null,
				uploadIndex:1,
				dataForm:{
					categoryId:'',
					merchantName:'',
					licenseType:'1',
					merchantType:'1',
					mobile:'',
					contactName:'',
					street:'',
					address:'',
					lat:'',
					lng:'',
					bizLicense:'',
					idcardBack:'',
					idcardFront:''
				},
				actionSheetList:[
					{
						text: '拍照',
						color: '#0D1C40',
						fontSize: 30
					},
					{
						text: '从相册选取',
						color: '#0D1C40',
						fontSize: 30
					}
				]
			}
		},
		onLoad() {
			_self=this
			uni.$on('selectAddress',(data)=>{
				console.log(data)
				_self.dataForm.address=data.address+data.street
				_self.dataForm.lng=data.longitude
				_self.dataForm.lat=data.latitude
			})
		},
		onUnload() {
			uni.$off('selectAddress')
		},
		methods: {
			/*主营业务*/
			showMainPop(){
				this.$refs['mainBussinessInput'].init()
			},
			onSelectGood(data){
				this.selectGood=data
				this.categoryId=data.id
			},
			choiceAddress() {
				uni.navigateTo({
					url: `/pages/bill/choiceAddress`
				})
			},
			
			upload(index){
				console.log(111)
				this.uploadIndex=index
				this.showActionSheet=true
			},
			
			click(index){
				uni.chooseImage({
					count:1,
					sourceType:[index==0?'camera':'album'],
					success:(res)=>{
						let params={
							url:'app/common/upload',
							data:{
								imageUrl:res.tempFilePaths[0],
								name:'file'
							},
							callBack:function(response){
								let result=JSON.parse(response)
								uni.hideLoading()
								if(result.code===200){
									uni.showToast({
										title:'上传成功'
									})
									if(_self.uploadIndex==1){
										_self.dataForm.idcardFront=result.data.url
									}
									else if(_self.uploadIndex==2){
										_self.dataForm.idcardBack=result.data.url
									}
									else{
										_self.dataForm.bizLicense=result.data.url
									}
								}
							}
						}
						uni.showLoading({
							title:'正在上传',
							mask:true
						})
						_self.$http.uploadImage(params)
					}
				})
			},
			/*保存*/
			save(){
				if(!this.dataForm.merchantName){
					uni.showToast({
						title:'请输入商家名称',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.mobile){
					uni.showToast({
						title:'请输入联系人电话',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.contactName){
					uni.showToast({
						title:'请输入联系人姓名',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.address){
					uni.showToast({
						title:'请选择门店地址',
						icon:'none'
					})
					return
				}
				if(!this.selectGood){
					uni.showToast({
						title:'请选择主营业务',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.address){
					uni.showToast({
						title:'请选择门店地址',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.bizLicense){
					uni.showToast({
						title:'请上传营业执照',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.idcardFront){
					uni.showToast({
						title:'请上传身份证正面',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.idcardBack){
					uni.showToast({
						title:'请上传身份证反面',
						icon:'none'
					})
					return
				}
				var params={
					url:'app/merchant/add',
					method:'POST',
					data:this.dataForm,
					callBack:function(res){
						uni.hideLoading()
						console.log(res)
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

	.bar {
		height: 30px;
		line-height: 30px;
		background-color: #FAEEE7;
		color: #E95008;
		font-size: 12px;
		text-align: center;
		margin-bottom: 10px;
	}

	.nav {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		image {
			width: 24px;
			height: 24px;
		}
	}

	.section {
		background-color: white;
		padding: 16px 12px 0px 12px;
		border-radius: 6px;
		margin-bottom: 10px;
		overflow: hidden;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		line-height: 40px;
		border-bottom: solid 1px #EEEEEE60;
		color: #101E3E;
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

	.item:last-child {
		border-bottom: none;
	}

	.upload {
		height: 125px;
		margin-top: 12px;
	}
	.bottom{
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
		background-color: #E95008;
	}
	
	.platform-cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.platform-tlt{
		color: #222222;
		font-size: 17px;
	}
	
	.logo{
		width: 38px;
		height: 38px;
		margin-right: 14px;
	}
	.status-icon{
		width: 12px;
		height: 12px;
	}
	.status-tlt{
		color: #33BB66;
		font-size: 12px;
	}
	.delete{
		color: #E95008;
		border: solid 1px #E95008;
		width: 60px;
		height: 24px;
		line-height: 24px;
		border-radius: 12px;
		text-align: center;
		font-size: 13px;
	}
	.item-arrow{
		width: 24upx;
		height: 24upx;
	}
	.tip{
		background-color: #FFFFEA;
		font-size: 12px;
		height: 30px;
		line-height: 30px;
		color: #E95008;
		text-align: center;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		overflow: hidden;
	}
	.upload-info{
		padding: 0px;
		overflow: hidden;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
	}
	.nav-tip{
		color: #9FA7B6;
		font-size: 13px;
	}
	.id-num{
		padding: 30upx 23upx;
	}
	.id-imgs{
		display: flex;
		justify-content: space-between;
		padding: 0px 30upx 30upx 30upx;
		.id-left{
			flex: 1;
			.id-back{
				height: 193upx;
				width: 100%;
			}
		}
		.id-right{
			flex: 1;
			height: 405upx;
			margin-left: 20upx;
		}
	}
	.active-input{
		color: #13203C;
		flex: 1;
		text-align: right;
	}
	.inactive-txt{
		color: #9EA7B7;
		flex: 1;
		text-align: right;
	}
</style>
