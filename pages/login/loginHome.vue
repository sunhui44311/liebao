<template>
	<view class="box">
		<image class="logo" src="../../static/image/logo@2x.png"></image>
		<view class="tip" style="margin-top: 10px;">中国移动提供认证服务</view>
		<view class="btn" style="margin-top: 32px;" @click.stop="loginPhone">一键登录</view>
		<view class="btn other" @click.stop="login">使用其他手机号</view>
		<view class="footer">
			<image src="../../static/image/weixuanzhong@2x.png"></image>
			<view class="tip">登录注册即同意用户协议与隐私政策</view>
		</view>
		<view class="third-login">
			<view class="bar">
				<view class="line"></view>
				<view class="bar-tlt">微信账号快捷登录</view>
				<view class="line"></view>
			</view>
			<image class="weixin" @click.stop="toWechatLogin" src="../../static/image/weixin@2x.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				access_token: '',
				openid: '',
				phoneNumber: ''
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			appLogin: function() {
				console.log(1111)
				let that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider);
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('-------获取openid(unionid)-----');
									console.log(JSON.stringify(loginRes));
									var params = {
										url: 'app/login/wechat',
										method: 'POST',
										data: {
											code: loginRes.code,
											type: 3
										},
										callBack: (res) => {
											console.log(res)
										}
									}
									that.$http.request(params)

									// 获取用户信息
									// uni.getUserInfo({
									// 	provider: 'weixin',
									// 	success: function(infoRes) {
									// 		console.log('-------获取微信用户所有-----');
									// 		console.log(JSON.stringify(infoRes
									// 			.userInfo));
									// 	}
									// });
								}
							});
						}
					}
				});
			},

			toWechatLogin: function() {
				var it = this;
				let _this = this;
				var getAppid = 'wx962c307ce15af77c';
				var weixinService = null;
				// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.getServices
				plus.oauth.getServices(function(services) {
					if (services && services.length) {
						for (var i = 0, len = services.length; i < len; i) {
							if (services[i].id === 'weixin') {
								weixinService = services[i];
								break;
							}
						}
						if (!weixinService) {
							return;
						}
						weixinService.authorize(function(event) { //此处获取code的关键
							var params = {
								url: 'app/login/wechat',
								method: 'POST',
								data: {
									code: event.code,
									type: 3
								},
								callBack: (res) => {
									console.log(res)
									if(res.code==200){
										if(res.data.hasMobile==0){
											setTimeout(()=>{
												uni.navigateTo({
													url:'/pages/login/bindPhone?token='+res.data.token
												},2000)
											})
										}
										else{
											uni.setStorageSync("token", res.data.token);
											uni.navigateBack({
											  delta: 1,
											});
										}
									}
								}
							}
							_this.$http.request(params)
						}, function(error) {
							uni.showToast({
								title: '登录失败',
								icon: "none"
							})
						}, {
							appid: getAppid,
						});
					} else {
					}
				}, function(error) {
					console.error('getServices fail:' + JSON.stringify(error));
				});
			},

			/*一键登录*/
			loginPhone() {
				let that = this
				uni.login({
					provider: 'univerify',
					univerifyStyle: {
						"backgroundColor": "#ffffff",
						"icon": {
							"path": "/static/image/logo@2x.png"
						},
						"phoneNum": {
							"color": "#0D1C40",
							"fontSize": "22"
						},
						"slogan": {
							"color": "#8a8b90",
							"fontSize": "12"
						},
						"authButton": {
							"normalColor": "#3479f5",
							"highlightColor": "#2861c5",
							"disabledColor": "#73aaf5",
							"textColor": "#ffffff",
							"title": "本机号码一键登录"
						},
						"otherLoginButton": {
							"visible": "false", // 是否显示其他登录按钮，默认值：true  
							"normalColor": "#f8f8f8", // 其他登录按钮正常状态背景颜色 默认值：#f8f8f8  
							"highlightColor": "#dedede", // 其他登录按钮按下状态背景颜色 默认值：#dedede  
							"textColor": "#000000", // 其他登录按钮文字颜色 默认值：#000000  
							"title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”  
							"borderWidth": "1px", // 边框宽度 默认值：1px（仅ios支持）  
							"borderColor": "#c5c5c5" //边框颜色 默认值： #c5c5c5（仅ios支持）  
						},
						"privacyTerms": {
							"defaultCheckBoxState": "true",
							"textColor": "#8a8b90",
							"termsColor": "#1d4788",
							"prefix": "我已阅读并同意",
							"suffix": "并使用本机号码登录",
							"fontSize": "12",
							privacyItems: [{
								"url": "https://",
								"title": "用户服务协议"
							}]
						}
					},
					success(res) {
						uni.closeAuthView()
						that.openid = res.authResult.openid;
						that.access_token = res.authResult.access_token;
						var params = {
							url: 'app/login/phone/onekey',
							method: 'POST',
							data: {
								accessToken: that.access_token,
								platform: 3
							},
							callBack: (res) => {
								console.log(res)
							}
						}
						that.$http.request(params)
						// uniCloud.callFunction({
						// 	name: 'login',
						// 	data: {
						// 		access_token: this.access_token, // 客户端一键登录接口返回的access_token
						// 		openid: this.openid, // 客户端一键登录接口返回的openid
						// 	}
						// }).then(res => {
						// 	console.log(res)
						// 	uni.closeAuthView()
						// 	this.phoneNumber = res.result.data.phoneNumber;
						// }).catch(err => {
						// 	uni.closeAuthView()
						// 	console.log(err)
						// })
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo {
		height: 112upx;
		width: 283upx;
		margin-top: 20px;
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: -30px;
		margin-top: 10px;

		image {
			width: 12px;
			height: 12px;
			margin-right: 10px;
		}
	}

	.phone {
		color: #0D1C40;
		font-size: 22px;
		margin-top: 34px;
	}

	.tip {
		color: #9EA7B7;
		font-size: 12px;
	}

	.btn {
		background-color: #E95008;
		height: 45px;
		line-height: 45px;
		text-align: center;
		border-radius: 45px;
		width: 580upx;
		color: white;
	}

	.other {
		background-color: white;
		color: #0D1C40;
		font-size: 16px;
		border: solid 1px #9EA7B7;
		margin-top: 17px;
	}

	.bar {
		margin-top: 120px;
		display: flex;
		justify-content: center;
		align-items: center;

		.line {
			height: 1px;
			background-color: #CCCCCC;
			width: 80px;
			margin: 0px 20px;
		}

		.bar-tlt {
			color: #9EA7B7;
			font-size: 12px;
		}
	}

	.weixin {
		width: 80upx;
		height: 80upx;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 45upx;
	}

	.third-login {
		position: absolute;
		bottom: 30px;
		left: 0px;
		right: 0px;
	}
</style>
