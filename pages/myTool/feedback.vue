<template>
	<view class="box">
		<view class="section">
			<view class="section-tlt">选择时反馈类型</view>
			<view class="question-list">
				<view :class="['item',tabIndex==1?'item-select':'']" :style="{width:itemWith+'px'}" @click.stop="tabIndex=1">账号问题</view>
				<view :class="['item',tabIndex==2?'item-select':'']" :style="{width:itemWith+'px'}" @click.stop="tabIndex=2">功能问题</view>
				<view :class="['item',tabIndex==3?'item-select':'']" :style="{width:itemWith+'px'}" style="margin-right: 0px;" @click.stop="tabIndex=3">优化建议</view>
				<view :class="['item',tabIndex==4?'item-select':'']" :style="{width:itemWith+'px'}" @click.stop="tabIndex=4">其他问题</view>
			</view>
		</view>
		<view class="section">
			<view class="section-tlt">问题描述</view>
			<textarea v-model="content" @input="inputChange"  class="input-area" placeholder="请详细描述您的问题，我们会尽快解决"></textarea>
			<view class="count" :maxlength="200">{{count}}/200</view>
		</view>
		<view class="section">
			<view class="section-tlt">提交截图（最多3张）</view>
			<view class="img-list">
				<view class="img" v-for="(item,index) in pictures" :key="index">
					<image :src="item"></image>
				</view>
				<view class="add-upload" v-if="pictures.length>=3?false:true">
					<image src="../../static/image/add-upload@2x.png" @click.stop="showActionSheet=true"></image>
				</view>
			</view>
		</view>
		<view class="btn" @click.stop="submit">确定</view>
		<u-action-sheet :list="actionSheetList" v-model="showActionSheet" @click="click" :cancel-btn="true"></u-action-sheet>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	var _self
	export default{
		data(){
			return{
				itemWith:0,
				tabIndex:1,
				content:'',
				pictures:[],
				showActionSheet:false,
				count:0,
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
			this.itemWith=(globalData.windowWidth-75)/3.0
		},
		methods:{
			submit(){
				if(!this.content){
					uni.showToast({
						title:'问题描述不能为空',
						icon:'none'
					})
					return
				}
				var params={
					url:'app/common/feedback',
					method:'POST',
					data:{
						content:this.content,
						type:this.tabIndex,
						pictures:this.pictures
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
							uni.showToast({
								title:'反馈成功',
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					}
				}
				uni.showToast({
					title:'正在提交',
					mask:true
				})
				this.$http.request(params)
			},
			inputChange(){
				this.count=this.content.length
				
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
								_self.pictures.push(result.data.url)
							}
						}
						uni.showLoading({
							title:'正在上传',
							mask:true
						})
						_self.$http.uploadImage(params)
					}
				})
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
		padding: 28upx 18upx;
		background-color: white;
		border-radius: 7px;
		margin-bottom: 10px;
		position: relative;
	}
	.section-tlt{
		color: #0D1C40;
		font-size: 17px;
		margin-bottom: 32upx;
	}
	.question-list{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.item{
		border: solid 1px #9EA7B7;
		height: 56upx;
		line-height: 56upx;
		text-align: center;
		margin-bottom: 26upx;
		margin-right: 33upx;
		font-size: 13px;
		border-radius: 4upx;
	}
	.item-select{
		background-color: #FDEEE7;
		color: #E95008;
		border: 1px solid #E95008;
	}
	.input-area{
		background-color: #F5F5F7;
		width: calc(100% - 33px);
		padding: 28upx 33upx;
	}
	.img-list{
		display: flex;
		justify-content: flex-start;
	}
	.add-upload{
		background-color: #F5F5F7;
		width: 160upx;
		height: 160upx;
		border-radius: 4upx;
		padding: 47upx;
		image{
			
			width: 66upx;
			height: 66upx;
		}
	}
	.img{
		width: 160upx;
		height: 160upx;
		margin-right: 20upx;
		image{
			width: 160upx;
			height: 160upx;
		}
	}
	.btn{
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		margin: 30px 20px 0px 20px
	}
	.count{
		position: absolute;
		bottom: 20px;
		right: 20px;
		color: #0D1C40;
		font-size: 13px;
	}
</style>
