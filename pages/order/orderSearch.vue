<template>
	<view>
		<u-navbar :is-back="true" :is-fixed="true">
			<view class="slot-wrap">
				<view style="flex: 1;">
					<u-search shape="square" :show-action="false"></u-search>
				</view>
				<view class="cancel">取消</view>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	.slot-wrap{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		.cancel{
			color: #0D1C40;
			font-size: 12px;
			width: 60px;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
	}
</style>
