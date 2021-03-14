<template>
	<view>
		<u-popup v-model="show" mode="bottom" border-radius="14" :mask-close-able="true" :closeable="false">
			<view class="pop-nav">
				<view class="pop-tlt">取消订单</view>
				<text class="cancel" @click.stop="handletouchstart">取消</text>
			</view>
			<view class="menu-list">
				<u-row gutter="30">
					<u-col span="6">
						<view :class="['cell', { 'select-cell': cancelReason == '无骑手接单' }]"
							@click="cancelReason = '无骑手接单'">无骑手接单</view>
					</u-col>
					<u-col span="6">
						<view :class="[
		        'cell',
		        { 'select-cell': cancelReason == '骑手接单后不取货' },
		      ]" @click="cancelReason = '骑手接单后不取货'">骑手接单后不取货</view>
					</u-col>
					<u-col span="6">
						<view :class="[
		        'cell',
		        { 'select-cell': cancelReason == '骑手电车装载不下' },
		      ]" @click="cancelReason = '骑手电车装载不下'">骑手电车装载不下</view>
					</u-col>
					<u-col span="6">
						<view :class="[
		        'cell',
		        { 'select-cell': cancelReason == '骑手服务态度恶劣' },
		      ]" @click="cancelReason = '骑手服务态度恶劣'">骑手服务态度恶劣</view>
					</u-col>
					<u-col span="6">
						<view :class="[
		        'cell',
		        { 'select-cell': cancelReason == '骑手要求取消订单' },
		      ]" @click="cancelReason = '骑手要求取消订单'">骑手要求取消订单</view>
					</u-col>
					<u-col span="6">
						<view :class="[
		        'cell',
		        { 'select-cell': cancelReason == '信息填写错误' },
		      ]" @click="cancelReason = '信息填写错误'">信息填写错误</view>
					</u-col>
					<u-col span="6">
						<view :class="[
		        'cell',
		        { 'select-cell': cancelReason == '计划有变,不需要配送' },
		      ]" @click="cancelReason = '计划有变,不需要配送'">计划有变,不需要配送</view>
					</u-col>
					<u-col span="6">
						<view :class="['cell', { 'select-cell': cancelReason == '其他原因' }]"
							@click="cancelReason = '其他原因'">其他原因</view>
					</u-col>
				</u-row>
			</view>
			<textarea class="txtarea" v-model="cancelReason2" placeholder="请输入其他原因"></textarea>
			<view class="submit" @click="qrcancel">提交</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				cancelReason: '',
				cancelReason2: ''
			}
		},
		methods:{
			handletouchstart(){
				this.cancelReason = ''
				this.cancelReason2 = ''
				this.show=false
			},
			init(){
				this.show=true
			},
			qrcancel(){
				this.show=false
				let reason=this.cancelReason=='其他原因'?this.cancelReason2:this.cancelReason
				this.$emit('cancel',{reason:reason})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-nav {
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  padding: 12px 32px;
	  position: relative;
	
	  .pop-tlt {
	    color: #0D1C40;
	    font-size: 15px;
	    text-align: center;
	    font-weight: bold;
	  }
	
	  .cancel {
	    position: absolute;
	    left: 23px;
	    color: #4E565F;
	    font-size: 14px;
	    top: 25upx;
	  }
	}
	
	// .pop-nav {
	//   display: flex;
	//   justify-content: space-between;
	//   align-items: center;
	//   padding: 12px 32px;
	
	//   image {
	//     width: 12px;
	//     height: 12px;
	//   }
	// }
	
	.minute-list {
	  display: flex;
	  justify-content: flex-start;
	  flex-wrap: wrap;
	  padding: 0px 37px;
	
	  .minute {
	    line-height: 30px;
	    border-radius: 15px;
	    color: #0D1C40;
	    font-size: 13px;
	    border: solid 1px #9EA7B7;
	    text-align: center;
	    margin-bottom: 17upx;
	  }
	
	  .item-right {
	    margin-right: 0px;
	  }
	
	  .active {
	    border: solid 1px #E95008;
	    color: #E95008;
	    background-color: #FDEEE7;
	  }
	}
	
	.pop-input {
	  text-align: center;
	  margin: 0 38px 10px 30px;
	  border: solid 1px #9EA7B7;
	  height: 35px;
	  line-height: 35px;
	  border-radius: 35px;
	}
	
	.submit {
	  background-color: #E95008;
	  height: 45px;
	  line-height: 45px;
	  text-align: center;
	  color: white;
	  font-size: 16px;
	  border-radius: 45px;
	  margin: 12px 30px;
	}
	
</style>
