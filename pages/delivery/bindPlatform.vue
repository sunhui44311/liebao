<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" active-color="#FA6F06" inactive-color="#4D5660" :current="current" @change="change"></u-tabs>
		<view class="content">
			<view class="owner-cell">
				<view class="owner-header">
					<image class="owner-logo" src="../../static/image/dada@2x.png"></image>
					<view class="owner-info">
						<view class="owner-tlt">达达</view>
						<view>商户编号</view>
						<view>配送门店</view>
					</view>
					<view class="bind">解绑</view>
				</view>
				<view>
					<text>开启后商家下单时首选该账号平台为配送平台</text>
					<u-switch></u-switch>
				</view>
			</view>
			<view class="cell">
				<image class="logo" src="../../static/image/meituan-logo@2x.png"></image>
				<text class="name">美团</text>
				<view class="bind">去绑定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list: [{
					name: '门店1'
				}, {
					name: '门店2'
				}, {
					name: '门店3'
				}],
				current: 0
			}
		},
		methods:{
			change(index){
				this.current=index
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.content{
		margin: 10px;
	}
	
	/*自由*/
	.owner-cell{
		padding: 12px 6px;
		background-color: white;
		margin-bottom: 10px;
		.owner-logo{
			width: 60px;
			height: 60px;
		}
		.owner-header{
			display: flex;
			justify-content: space-between;
		}
		.owner-info{
			flex: 1;
			margin-left: 9px;
		}
		.owner-tlt{
			color: #0D1C40;
			font-size: 17px;
		}
	}
	
	.cell{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		padding: 14px 24px;
		border-radius: 7px;
		.logo{
			width: 32px;
			height: 32px;
		}
		.name{
			flex: 1;
			color: #0D1C40;
			font-size: 17px;
			margin-left: 18px;
		}
	}
	
	.bind{
		width: 60px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		color: #E95008;
		font-size: 13px;
		border: solid 1px #E95008;
		border-radius: 12px;
	}
</style>
