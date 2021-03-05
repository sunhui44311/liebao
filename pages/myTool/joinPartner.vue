<template>
	<view class="box">
		<view class="section">
			<view class="tlt">商家合作：</view>
			<view class="content">充值或合作咨询，请发送“城市、公司、
			主营业务、 联系手机号”到“info@kaishisong.com”会
			有专人 与您联系，可能会有更适合您的价格和服务；希望 
			有开始送的助力，让您的生意更红火！</view>
		</view>
		<view class="section">
			<view class="tlt">加盟或者代理：</view>
			<view class="content">目前开始送加盟代理模式已全国启动，
			正火热招商 中，可以加盟代理城市为省会城市、地
			级市、县级 市及县，需要加盟，请在开始送公众号中提交城市 
			加盟申请或加微信号：baidu1500（备注：城市加 盟），
			感谢您对开始送的支持与关注！</view>
		</view>
		<view class="section">
			<view class="tlt">广告、提供技术支持、媒体采访：</view>
			<view class="content">新闻采访、跨界合作或其他方面的商务合作
			，请将 相关信息及联系人发到 info@k
			aishisong.com， 我们会与您联系，期待与您的合作！</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad() {
			this.getExplain()
		},
		methods:{
			getExplain(){
				var params={
					url:'app/common/explain',
					method:'GET',
					data:{type:3},
					callBack:function(res){
						console.log(res)
					}
				}
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
		margin: 10px;
		background-color: white;
		border-radius: 7px;
		padding: 56upx 32upx;
	}
	.tlt{
		color: #101E3E;
		font-size: 15px;
		margin-bottom: 32upx;
	}
	.section{
		margin-bottom: 66upx;
	}
	.content{
		color: #101E3E;
		font-size: 14px;
	}
</style>
