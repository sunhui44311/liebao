<template>
	<view class="box">
		<view class="cell" v-for="(item,index) in dataList" :key="index">
			<view class="item">
				<view class="flag" v-if="item.isDefault==1?true:false">默认</view>
				<view class="address">{{item.address}}{{item.street}}</view>
			</view>
			<view class="item info"> 
				<text>{{item.contact}}</text>
				<text style="margin-left: 8px;">{{item.phone}}</text>
			</view>
			<image class="edit" src="../../static/image/edit@2x.png" @click.stop="edit(item)"></image>
		</view>
		<view class="btn" @click.stop="add">添加地址</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dataList:[]
			}
		},
		onLoad() {
			this.getDataList()
		},
		methods:{
			add(){
				uni.navigateTo({
					url:'/pages/myTool/addAddress?isEdit=0'
				})
			},
			edit(item){
				uni.navigateTo({
					url:'/pages/myTool/addAddress?isEdit=1&id='+item.id
				})
			},
			getDataList(){
				let that=this
				var params={
					url:'app/address/detail',
					method:'GET',
					data:{
						type:1
					},
					callBack:function(res){
						uni.hideLoading()
						that.dataList=res.data
					}
				}
				uni.showLoading({
					title:'正在加载'
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
	.cell{
		background-color: white;
		padding: 28upx 42upx;
		border-radius: 12upx;
		position: relative;
		margin-bottom: 10px;
	}
	.flag{
		background-color: #FAEEE7;
		color: #E95008;
		font-size: 12px;
		width: 70upx;
		height: 32upx;
		line-height: 32upx;
		border-radius: 4upx;
		text-align: center;
		margin-right: 8px;
	}
	.item{
		display: flex;
		justify-content: flex-start;
	}
	.address{
		color: #0D1C40;
		font-size: 14px;
		margin-top: -2px;
	}
	.info{
		color: #9FA7B6;
		font-size: 12px;
		margin-top: 8px;
	}
	.edit{
		position: absolute;
		right: 42upx;
		bottom: 15px;
		width: 24upx;
		height: 24upx;
		padding: 10upx;
	}
	
	.btn{
		position: fixed;
		bottom: 0upx;
		width: calc(100% - 60px);
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		margin: 30px 20px
	}
</style>
