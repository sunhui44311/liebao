<template>
	<view class="box">
		<view class="section">
			<view class="cell" @click.stop="show=true">
				<text class="tlt">所属门店</text>
				<text :class="['content',dataForm.shopName?'shop-name':'shop-select-name']">{{dataForm.shopName?dataForm.shopName:'请选择'}}</text>
				<image class="arrow" src="../../static/image/fj2.png"></image>
			</view>
			<view class="cell">
				<text class="tlt">登录账号</text>
				<input v-model="dataForm.mobile" class="content"  placeholder="请输入"/>
			</view>
			<view class="cell" v-if="id?false:true">
				<text class="tlt">登录密码</text>
				<input v-if="id" v-model="dataForm.password" :password="showPwd?false:true" style="flex: 1;" class="content"  placeholder="请输入"/>
				<text v-else class="content pwd">初始密码：123456</text>
				<image v-if="id?true:false" class="show-pwd" @click.stop="showPwd=!showPwd" :src="showPwd?'../../static/image/hiden@2x.png':'../../static/image/look@2x.png'"></image>
			</view>
			<view class="cell">
				<text class="tlt">员工姓名</text>
				<input v-model="dataForm.name" class="content"  placeholder="请输入"/>
			</view>
			<view class="cell">
				<text class="tlt">当前状态</text>
				<u-switch active-color="#E95008" inactive-color="#F8F8F8" @change="changeStatus" v-model="status"></u-switch>
			</view>
		</view>
		<u-picker mode="selector" v-model="show"  :default-selector="[0]" range-key="name" @confirm="shopConfirm" :range="shopList"></u-picker>
		<view class="save" @click.stop="save">保存</view>
		<view v-if="id?true:false" class="delete-btn" style="margin-top: 10px;" @click.stop="delete_Click">删除</view>
	</view>
</template>

<script>
	var _self
	export default{
		data(){
			return{
				id:'',
				show:false,
				status:true,
				showPwd:false,
				dataForm:{
					shopId:'',
					name:'',
					mobile:'',
					password:'123456',
					shopName:''
				},
				shopList:[]
			}
		},
		onLoad(options) {
			_self=this
			this.id=options.id
			this.getShopList()
			if(this.id){
				uni.setNavigationBarTitle({
					title:'编辑账号'
				})
				this.getAccoutDetail()
			}
		},
		methods:{
			getShopList(){
				let that=this
				var params={
					url:'app/shop/list',
					method:'GET',
					data:{},
					callBack:function(res){
						uni.hideLoading()
						that.shopList=res.data
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			},
			shopConfirm(e){
				let shop=this.shopList[e[0]]
				this.dataForm.shopId=shop.id
				this.dataForm.shopName=shop.name
			},
			
			getAccoutDetail(){
				let that=this
				var params={
					url:'app/shop/user/detail',
					method:'GET',
					data:{
						id:this.id
					},
					callBack:function(res){
						uni.hideLoading()
						that.dataForm=res.data
						that.status=res.data.status==1?true:false
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			},
			
			changeStatus(){
				let that=this
				var params={
					url:'app/shop/user/status',
					method:'POST',
					data:{
						id:this.id,
						status:this.status?1:0
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							_self.refreshPage()
							uni.showToast({
								title:'修改成功'
							})
						}
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			},
			
			save(){
				if(!this.dataForm.shopId){
					uni.showToast({
						title:'请选择所属门店',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.mobile){
					uni.showToast({
						title:'请输入登录账号',
						icon:'none'
					})
					return
				}
				if(!this.dataForm.name){
					uni.showToast({
						title:'请输入员工姓名',
						icon:'none'
					})
					return
				}
				var params={
					url:this.id?'app/shop/user/modify':'app/shop/user/add',
					method:'POST',
					data:Object.assign(this.dataForm,{
						status:this.status?1:0,
						password:'123456'
					}),
					callBack:function(res){
						uni.hideLoading()
						console.log(res)
						if(res.code==200){
							_self.refreshPage()
							uni.showToast({
								title:'保存成功',
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
						else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					}
				}
				uni.showLoading({
					title:'正在提交'
				})
				this.$http.request(params)
			},
			
			refreshPage(){
				let pages=getCurrentPages()
				let curPage=pages[pages.length-2]
				curPage.$vm.refreshDataList()
			},
			delete_Click(){
				uni.showModal({
					title:'提示',
					content:'确定要删除',
					success:(res)=>{
						if(res.confirm){
							_self.deleteAccount()
						}
					}
				})
			},
			deleteAccount(){
				var params={
					url:'app/shop/user/delete',
					method:'POST',
					data:{
						id:this.id
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							_self.refreshPage()
							uni.showToast({
								title:'删除成功',
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
					title:'正在删除',
					mask:true
				})
				this.$http.request(params)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.box{
		padding: 10px;
	}
	.section{
		padding: 0px 17px;
		background-color: white;
		border-radius: 6px;
	}
	.cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 35px;
		line-height: 35px;
		border-bottom: solid 1px #EEEEEE60;
		.tlt{
			font-size: 14px;
			color: #9EA7B7;
		}
		.arrow{
			width: 5px;
			height: 11px;
		}
	}
	.content{
		display: 1;
		text-align: right;
		font-size: 14px;
	}
	
	.shop-name{
		flex: 1;
		text-align: right;
		margin-right: 12px;
	}
	.shop-select-name{
		flex: 1;
		text-align: right;
		margin-right: 12px;
		color: #9FA7B6;
	}
	.pwd{
		color: #E95008;
	}
	.save{
		margin: 25px 20px;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		color: white;
		width: calc(100% - 40px);
		text-align: center;
		font-size: 16px;
		background-color: #E95008;
	}
	
	.delete-btn{
		margin-left: 20px;
		margin-right: 20px;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		color: white;
		width: calc(100% - 40px);
		text-align: center;
		font-size: 16px;
		color: #E95008;
		margin-top: 0px;
		border: solid 1px #E95008;
	}
	
	.show-pwd{
		width: 14px;
		height: 14px;
		margin-left: 8px;
	}
</style>
