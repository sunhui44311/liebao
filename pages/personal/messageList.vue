<template>
	<view>
		<view class="nav">
			<view class="tab">
				<view>官方公告</view>
				<image v-if="current==0" src="../../static/image/tab-icon.png"></image>
			</view>
			<view class="tab">
				<view class="tab">系统通知</view>
				<image v-if="current==1" src="../../static/image/tab-icon.png"></image>
			</view>
		</view>
		<view class="content" v-if="current==1">
			<view class="cell">
				<view class="header">
					<image src="../../static/image/notice@2x.png"></image>
					<view>
						<view class="notice-type">系统通知</view>
						<view class="time">2020-10-12 12:00</view>
					</view>
				</view>
				<view class="notice-content">尊敬的用户，感谢您注册猎豹AI 聚合配送平台</view>
			</view>
		</view>
		<view class="content" v-else>
			<view class="cell">
				<image class="logo" src="../../static/image/select_yes@2x.png"></image>
				<view>
					<view class="tlt">喜迎新春，牛年大街</view>
					<view class="time">2020-12—12 12:00</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:0
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F6F7F9;
	}
	.nav{
		display: flex;
		justify-content: space-around;
		background-color: white;
		padding-bottom: 10px;
	}
	.tab{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 23px;
			height: 3px;
			margin-top: 4px;
		}
	}
	.content{
		margin: 10px;
	}
	.cell{
		background-color: white;
		padding: 14px 10px;
		border-radius: 7px;
	}
	.header{
		display: flex;
		justify-content: flex-start;
		image{
			width: 30px;
			height: 30px;
			margin-right: 12px;
		}
		.notice-type{
			color: #0D1C40;
			font-size: 15px;
		}
		.time{
			color: #9EA7B7;
			font-size: 12px;
		}
	}
	.notice-content{
		color: #0D1C40;
		font-size: 14px;
	}
	
	/*系统通知*/
	.logo{
		height: 130px;
		width: 100%;
	}
	.tlt{
		color: #0D1C40;
		font-size: 15px;
	}
	.time{
		color: #9EA7B7;
		font-size: 12px;
	}
</style>
