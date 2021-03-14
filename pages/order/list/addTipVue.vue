<template>
	<view>
		<u-popup mode="bottom" v-model="showAmount" border-radius="26">
			<view class="content">
				<view class="pop-nav">
					<image src="@/static/image/delete.png" @click.stop="cancelxf"></image>
					<view class="pop-tlt">加小费</view>
					<view class="confirm" @click.stop="confirm_tip">确定</view>
				</view>
				<view class="minute-list">
					<u-row gutter="16">
						<u-col span="4" v-for="(item, index) in amounts" :key="index">
							<view :class="['minute', { active: item.value == selectAmount }]"
								@click.stop="minute_Click(item)">
								{{ item.label }}
							</view>
						</u-col>
					</u-row>
				</view>
				<input v-model="selectAmount2" v-if="showAmountInput" type="digit" class="pop-input"
					placeholder="其他金额" />
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showAmount:false,
				showAmount: false,
				selectAmount2: '',
				showAmountInput: false,
				selectAmount: '',
				amounts: [{
						label: '1元',
						value: 1
					},
					{
						label: '2元',
						value: 2
					},
					{
						label: '5元',
						value: 5
					},
					{
						label: '10元',
						value: 10
					},
					{
						label: '15元',
						value: 15
					},
					{
						label: '20元',
						value: 20
					},
					{
						label: '30元',
						value: 30
					},
					{
						label: '50元',
						value: 50
					},
					{
						label: '其他金额',
						value: '其他'
					}
				]
			}
		},
		methods:{
			init(){
				this.showAmount=true
			},
			minute_Click(item) {
				this.selectAmount = item.value
				if (item.value == '其他') {
					this.showAmountInput = true
				} else {
					this.showAmountInput = false
				}
			},
			cancelxf() {
				this.showAmount = false
				this.showAmountInput = false
				this.selectAmount = ''
				this.selectAmount2 = ''
			},
			confirm_tip(){
				this.selectAmount == '其他' ? this.selectAmount2 : this.selectAmount
				this.$emit('confirm_tip',{'amount':this.selectAmount})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-nav {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 12px 32px;
	
	  image {
	    width: 12px;
	    height: 12px;
	  }
	}
	
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
</style>
