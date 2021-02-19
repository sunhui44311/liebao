<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true" :border-bottom="false" title-size="36" back-icon-color="#333333"
		 title-color="#333333" title="我的钱包" :background="{background:'#FFFFFF'}">
		</u-navbar>
		<u-tabs :list="list" :is-scroll="false" active-color="#FA6F06" inactive-color="#4D5660" :current="current" @change="change"></u-tabs>
		<view class="content">
			<view class="cell">
				<view class="left">
					<view class="type">余额充值</view>
					<view class="time">2021-12-09 12:00:00</view>
				</view>
				<view class="right">
					<view>+166.0</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '全部'
				}, {
					name: '充值'
				}, {
					name: '消费'
				},{
					name:'退款'
				}],
				current: 0
			}
		},
		methods: {
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
	.cell{
		background-color: white;
		padding: 15px 25px;
		display: flex;
		justify-content: space-between;
	}
	.type{
		color: #0D1C40;
		font-size: 15px;
	}
	.time{
		color: #9EA7B7;
		font-size: 12px;
	}
	.right{
		margin-top: 10px;
	}
</style>
