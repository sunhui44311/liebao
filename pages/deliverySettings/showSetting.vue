<template>
	<view>
		<u-popup mode="bottom" v-model="show" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="../../static/image/delete.png"></image>
					<view class="pop-tlt">设置加费</view>
					<view class="confirm">确定</view>
				</view>
				<scroll-view scroll-y="true" style="height: 300rpx;">
					<view class="minute-list">
						<view class="minute" v-for="(item,index) in amounts" :key="index">
							{{item.label}}
						</view>
					</view>
					<input class="pop-input" placeholder="其他金额" />
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false
			}
		},
		methods:{
			init(){
				this.show=true
			}
		}
	}
</script>

<style>
</style>
