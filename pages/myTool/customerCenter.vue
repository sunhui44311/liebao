<template>
	<view class="box">
		<image class="logo" src="../../static/image/customer-header@2x.png"></image>
		<view class="cell">
			<image class="item-icon" src="../../static/image/online@2x.png"></image>
			<view class="item-content" @click.stop="tel">
				<view class="item-tlt">在线客服</view>
				<view class="item-sub">咨询时间 09:00-20:00</view>
			</view>
			<image class="arrow" src="../../static/image/fj2.png"></image>
		</view>
		<view class="cell" @click.stop="show=true">
			<image class="item-icon" src="../../static/image/tel@2x.png"></image>
			<view class="item-content">
				<view class="item-tlt">电话客服</view>
				<view class="item-sub">7*24小时为您服务</view>
			</view>
			<image class="arrow" src="../../static/image/fj2.png"></image>
		</view>
		<u-popup v-model="show" mode="center" border-radius="26">
			<view class="pop-nav">
				<view class="pop-tlt">扫码添加客服微信</view>
				<image src="../../static/image/delete.png" @click.stop="show=false"></image>
			</view>
			<view style="padding: 20px 30px;">
				<image class="wx-img" :src="wx"></image>
				<view class="btn" @click.stop="saveImage(wx)">保存图片到本机</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				wx: '',
				show: false
			}
		},
		onLoad() {
			this.getCustomerPhone()
			this.getWxCode()
		},
		methods: {
			getCustomerPhone() {
				var params = {
					url: 'app/common/explain',
					method: 'GET',
					data: {
						type: 3
					},
					callBack: (res) => {
						this.phone = res.data
					}
				}
				this.$http.request(params)
			},

			getWxCode() {
				var params = {
					url: 'app/common/explain',
					method: 'GET',
					data: {
						type: 2
					},
					callBack: (res) => {
						this.wx = res.data
					}
				}
				this.$http.request(params)
			},

			tel() {
				uni.makePhoneCall({
					phoneNumber: this.phone
				})
			},
			saveImage(url){
				let that=this
				uni.showLoading({
					title:'正在保存'
				})
				uni.downloadFile({
					url,
					success: res => {
						uni.hideLoading()
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									that.show=false
									uni.showToast({
										title:'保存成功',
										icon:'none'
									})
								},
								fail: function() {
									uni.showToast({
										title:'保存失败，请稍后重试',
										icon:'none'
									})
								}
							});
						} else {
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F7F9;
	}

	.box {
		padding: 10px;
	}

	.logo {
		display: inline-block;
		width: 100%;
		height: 260upx;
	}

	.cell {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		height: 153upx;
		padding: 0px 37upx;
		margin-top: 10px;
		border-radius: 14upx;

		.item-icon {
			width: 48upx;
			height: 48upx;
		}

		.item-content {
			flex: 1;
			margin-left: 30upx;

			.item-tlt {
				color: #0D1C40;
				font-size: 15px;
			}

			.item-sub {
				color: #A0A7B5;
				font-size: 13px;
				margin-top: 12upx;
			}
		}

		.arrow {
			width: 10upx;
			height: 22upx;
		}
	}

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

	.pop-tlt {
		color: #0D1C40;
		font-size: 15px;
		font-weight: bold;
		flex: 1;
		text-align: center;
	}

	.wx-img {
		width: 358upx;
		height: 358upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.btn {
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		color: white;
		font-size: 16px;
		margin-top: 30px;
		width: 520upx;
	}
</style>
