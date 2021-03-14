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
		<view>
			<mescroll-uni ref="mescrollRef" :top="listTop" :bottom="0" @down="downCallback" :up="upOption"
				@init="mescrollInit" @up="upCallback">
				<view class="order-list">
					<view v-for="(item,index) in list" :key="index">
						<order-cell :model="item" @click.native="order_Click(item.id)" @cancel="cancelDd" @usertip="usertip"></order-cell>
					</view>
				</view>
			</mescroll-uni>
			<can-order-vue ref="canOrderVue" @cancel="qrcancel"></can-order-vue>
			<add-tip-vue ref="addTipVue" @confirm_tip="confirm_tip"></add-tip-vue>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js"
	import MescrollUni from "../../components/mescroll-uni/mescroll-uni.vue"
	import canOrderVue from './list/canOrderVue.vue'
	import orderCell from './list/orderCell.vue'
	import addTipVue from './list/addTipVue.vue'
	export default{
		mixins: [MescrollMixin],
		components:{
			MescrollUni,
			canOrderVue,
			orderCell,
			addTipVue
		},
		data(){
			return{
				upOption: {
					page: {
						num: 0,
						size: 10 // 每页数据的数量
					},
					isBounce: true,
					textNoMore: '没有更多数据',
					noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: true,
						tip: "暂无相关数据~",
						icon: '../'
					}
				},
				list: [],
			}
		},
		methods:{
			
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
