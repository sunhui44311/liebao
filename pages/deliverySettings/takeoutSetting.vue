<template>
	<view class="box">
		<view class="section">
			<view class="nav">
				<text class="tlt">保底运力</text>
			</view>
			<view class="tip">用户选择非聚合配送发单时，优先将选中的运力置顶显示， 提高您的下单效率</view>
			<view class="list">
				<view :class="['item',index%4==3?'off-right':'',item.select?'item-active':'']" v-for="(item,index) in billDeliverylist" @click.stop="selecItemChange(item)" :key="index">{{item.name}}</view>
			</view>
		</view>
		<view class="section">
			<view class="nav">
				<text class="tlt">屏蔽运力</text>
			</view>
			<view class="tip">用户选择非聚合配送发单时，屏蔽的运力将不再估价，提 高计价速度</view>
			<view class="list">
				<view :class="['item',index%4==3?'off-right':'',item.select?'item-active':'']" v-for="(item,index) in shieldDeliverylist" @click.stop="selecItemChange(item)" :key="index">{{item.name}}</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="save" @click.stop="modifyConfigRequest">保存</view>
	</view>
</template>

<script>
	import globalData from '@/common/js/globalData.js'
	var _self
	export default{
		data(){
			return{
				itemWidth:0,
				billDeliverylist:[],
				shieldDeliverylist:[],
				billDeliveryIds:[],
				shieldDeliveryIds:[]
			}
		},
		onLoad() {
			_self=this
			this.itemWidth=(globalData.windowWidth-90)/4.0
			this.getUserInfo()
		},
		methods:{
			http_delivery() {
			  let params = {
			    url: "app/delivery/floor/list",
			    method: "GET",
			    data: {},
			    callBack: (res) => {
					console.log(res)
			      this.billDeliverylist = JSON.parse(JSON.stringify(res.data));
				  this.shieldDeliverylist = JSON.parse(JSON.stringify(res.data));
				  this.setData(this.billDeliverylist,this.billDeliveryIds)
				  this.setData(this.shieldDeliverylist,this.shieldDeliveryIds)
			    },
			  };
			  this.$http.request(params);
			},
			/*获取用户信息*/
			getUserInfo(){
				let params={
					url:'app/member/detail',
					method:'get',
					data:{},
					callBack:function(res){
						_self.billDeliveryIds=res.data.billDeliveryIds.split(',')
						_self.shieldDeliveryIds=res.data.shieldDeliveryIds.split(',')
						_self.http_delivery()
					}
				}
				this.$http.request(params)
			},
			
			selecItemChange(item){
				item.select=!item.select
			},
			
			setData(dataList,list){
				for(var i=0;i<dataList.length;i++){
					var item=dataList[i]
					let arr=[]
					if(list&&list.length>0){
						arr=list.find((id)=>{
							return id==item.id
						})
					}
					if(arr&&arr.length>0){
						this.$set(item,'select',true)
					}
					else{
						this.$set(item,'select',false)
					}
				}
			},
			modifyConfigRequest(){
				let billDeliveryID=[]
				let shieldDeliveryID=[]
				for(var i=0;i<this.billDeliverylist.length;i++){
					var item=this.billDeliverylist[i]
					billDeliveryID.push(item.id)
				}
				for(var i=0;i<this.shieldDeliverylist.length;i++){
					var item=this.shieldDeliverylist[i]
					shieldDeliveryID.push(item.id)
				}
				var params={
					url:'app/member/config',
					method:'POST',
					data:{
						billDeliveryIds:billDeliveryID.join(','),
						shieldDeliveryIds:shieldDeliveryID.join(',')
					},
					callBack:function(res){
						uni.hideLoading()
						if(res.code==200){
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
					title:'正在保存',
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
			color: #0D1C40;
			font-size: 17px;
		}
	}
	.tip{
		color: #9FA7B6;
		font-size: 12px;
	}
	.list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	
	.item {
		height: 28px;
		line-height: 28px;
		padding: 0px 15px;
		border: solid 1px #9EA7B7;
		border-radius: 14px;
		margin-right: 15px;
		margin-top: 12px;
		color: #0D1C40;
		font-size: 13px;
	}
	
	.off-right{
		margin-right: 0px;
	}
	
	.item-active{
		border: solid 1px #DB5F29;
		background-color: #FDEEE7;
		color: #DB5F29;
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
</style>
