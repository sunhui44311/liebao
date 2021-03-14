<template>
	<view class="order">
		<view class="head">
			<view class="title">订单编号：#{{ model.orderSn }}</view>
			<view class="state">{{ model.deliveryStatus | statetext }}</view>
		</view>
		<view class="order-info">
			<view class="piece-info">
				<view class="sou">
					<view class="icon-box">
						<image src="@/static/image/sou.png" class="icon" />
					</view>
					<view class="user-info">
						<view class="address">
							{{ model.receiptAddress }}
						</view>
						<view style="display: flex">
							<view class="user-name">{{ model.receiptContactName }}</view>
							<view class="phone">{{ model.receiptPhone }}</view>
						</view>
					</view>
				</view>
				<view class="fa">
					<view class="icon-box">
						<image src="@/static/image/fa.png" class="icon" />
					</view>
					<view class="user-info">
						<view class="address">
							{{ model.sendAddress }}
						</view>
						<view style="display: flex">
							<view class="user-name">{{ model.sendContactName }}</view>
							<view class="phone">{{ model.sendPhone }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="operation">
				<view class="time">{{ model.createTime }}</view>
				<view class="btn-box">
					<template v-if="model.deliveryStatus != 4 &&model.deliveryStatus != 3 &&model.deliveryStatus != -1">
						<u-button class="btn" size="mini" plain shape="circle" @click.stop="cancelDd(model)">
							取消订单</u-button>
						<u-button class="btn" size="mini" shape="circle" v-if="!model.useTip"
							@click.stop="usertip(model)">加小费</u-button>
					</template>
				</view>
			</view>
			<view class="news">
				<image :src="model.logo" class="icon" />
				<view class="text">{{model.deliveryName ? model.deliveryName : "全网推单中..."}}</view>
				<view class="price">
					<view class="label">￥</view>
					{{ model.totalAmount }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['model'],
		data(){
			return{
				
			}
		},
		filters: {
			statetext(e) {
				let arr = [{
					key: 1,
					title: '待接单'
				}, {
					key: 2,
					title: '待取货'
				}, {
					key: 3,
					title: '配送中'
				}, {
					key: 4,
					title: '已完成'
				}, {
					key: '-1',
					title: '已取消'
				}, {
					key: 0,
					title: '待支付'
				}, ]
				if (!e) return ''
				let obj = arr.find(i => i.key == e)
				return obj.title
		
			}
		},
		methods:{
			cancelDd(){
				this.$emit('cancel',this.model)
			},
			usertip(){
				this.$emit('usertip',this.model)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
	  background-color: #FFFFFF;
	  border-radius: 12upx 12upx 12upx 12upx;
	  padding: 20upx;
	  margin-bottom: 20upx;
	
	  .head {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    margin-bottom: 20upx;
	
	    .title {
	      font-size: 28upx;
	      font-weight: 400;
	      color: #4D5660;
	
	    }
	
	    .state {
	      font-size: 26upx;
	      font-weight: 400;
	      color: #FA6F06;
	
	    }
	  }
	
	  .order-info {
	    .piece-info {
	      padding: 20upx 30upx;
	      background-color: rgba(245, 245, 247, .4);
	      border-radius: 12upx;
	      margin-bottom: 20upx;
	
	      .sou {
	        margin-bottom: 40upx;
	      }
	
	      .sou,
	      .fa {
	        display: flex;
	      }
	
	      .icon-box {
	        margin-right: 20upx;
	
	        .icon {
	          width: 40upx;
	          height: 40upx;
	        }
	      }
	
	      .user-info {
	        .address {
	          font-size: 26upx;
	          font-weight: 400;
	          color: #0D1C40;
	          margin-bottom: 25upx;
	        }
	
	        .user-name {
	          margin-right: 30upx;
	        }
	
	        .user-name,
	        .phone {
	          font-size: 24upx;
	          font-weight: 400;
	          color: #0D1C40;
	        }
	      }
	
	
	    }
	
	    .operation {
	      display: flex;
	      align-items: center;
	      margin-bottom: 20upx;
	
	      .time {
	        font-size: 26upx;
	        font-weight: 400;
	        color: #4D5660;
	        flex: 1;
	      }
	
	      .btn-box {
	        .btn {
	          margin-right: 20upx;
	
	          &:last-child {
	            margin-right: 0;
	          }
	        }
	      }
	    }
	
	    .news {
	      display: flex;
	      align-items: center;
	
	      .icon {
	        width: 52upx;
	        height: 52upx;
	        margin-right: 10upx;
	      }
	
	      .text {
	        font-size: 24upx;
	        font-weight: 400;
	        color: #4D5660;
	        flex: 1;
	      }
	
	      .price {
	        font-size: 38upx;
	        font-weight: bold;
	        color: #FA6F06;
	        display: flex;
	        align-items: baseline;
	
	        .label {
	          font-size: 28upx;
	          margin-right: 6upx;
	        }
	      }
	    }
	  }
	}
	
	.slot-content {
	  padding: 30upx;
	}
</style>
