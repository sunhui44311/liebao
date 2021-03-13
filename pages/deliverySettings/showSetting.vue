<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<view class="pop-tlt">{{setModel.title}}</view>
					<image src="../../static/image/delete.png" @click.stop="show=false"></image>
				</view>
				<scroll-view scroll-y="true" :style="{'height': setModel.height+'rpx',padding: '12px'}">
					<view class="cell" v-for="(item,index) in setModel.options" :key="index">
						<view>
							<view class="tlt">{{item.title}}</view>
							<view class="sub-tlt">{{item.subTitle}}</view>
						</view>
						<u-switch active-color="#E95008" inactive-color="#F8F8F8" @change="modifyConfigRequest" v-model="item.status"></u-switch>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	var _self
	export default{
		mame:'showSetting',
		data(){
			return{
				show:false,
				setModel:{},
				userInfo:{},
				set1:{
					title:'显示设置',
					height:543,
					options:[{
						title:'是否开启',
						subTitle:'显示第三方订单号',
						key:'showThirdOrdersn',
						status:false
					},{
						title:'是否开启',
						subTitle:'显示第三方配送品牌',
						key:'showThirdBrand',
						status:false
					},{
						title:'是否开启',
						subTitle:'显示第三方配送骑手',
						key:'showThirdRider',
						status:false
					}]
				},
				set2:{
					title:'自动接单',
					height:180,
					options:[{
						title:'是否开启',
						subTitle:'饿了么/美团外卖自动接单',
						key:'openAutoorder',
						status:false
					}]
				},
				set3:{
					title:'自动打印',
					height:180,
					options:[{
						title:'是否开启',
						subTitle:'开启后所有配置的打印方案都设置为自动打印',
						key:'openPrintSwitch',
						status:false
					}]
				},
				set4:{
					title:'自动同步',
					height:543,
					options:[{
						title:'同步配送状态',
						subTitle:'实时同步外卖订单的配送状态',
						key:'openAutodelivery',
						status:false
					},{
						title:'同步骑手位置',
						subTitle:'开启后美团、饿了么的顾客可以看到骑手',
						key:'openSyncRiderlocation',
						status:false
					},{
						title:'同步取消配送',
						subTitle:'外卖订单取消后同步取消配送',
						key:' openSyncCanceldelivery',
						status:false
					}]
				},
			}
		},
		methods:{
			init(type){
				_self=this
				this.show=true
				if(type==1){
					this.setModel=this.set1
				}
				else if(type==2){
					this.setModel=this.set2
				}
				else if(type==3){
					this.setModel=this.set3
				}
				else if(type==4){
					this.setModel=this.set4
				}
				this.getUserInfo()
			},
			changeStatus(){
				
			},
			/*获取用户信息*/
			getUserInfo(){
				let params={
					url:'app/member/detail',
					method:'get',
					data:{},
					callBack:function(res){
						console.log(res)
						_self.userInfo=res.data
						for(var i=0;i<_self.setModel.options.length;i++){
							var option=_self.setModel.options[i]
							option.status=res.data[option.key]?true:false
						}
					}
				}
				this.$http.request(params)
			},
			modifyConfigRequest(){
				var requestData={}
				for(var i=0;i<_self.setModel.options.length;i++){
					var option=_self.setModel.options[i]
					requestData[option.key]=option.status?1:0
				}
				var params={
					url:'app/member/config',
					method:'POST',
					data:requestData,
					callBack:function(res){
						if(res.code!=200){
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					}
				}
				this.$http.request(params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 32px;
		image{
			width: 12px;
			height:12px;
		}
	}
	
	.pop-tlt{
		color: #0D1C40;
		font-size: 15px;
		font-weight: bold;
		flex: 1;
		text-align: center;
	}
	.cell{
		background-color: #F6F5FA;
		padding: 21px 16px;
		display: flex;
		width: calc(100% - 24px);
		justify-content: space-between;
		margin-bottom: 10px;
		border-radius: 5px;
	}
	.tlt{
		color: #101E3E;
		font-size: 15px;
	}
	.sub-tlt{
		color: #9FA7B6;
		font-size: 13px;
	}
</style>
