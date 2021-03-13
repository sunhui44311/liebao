<script>
	import globalData from "./common/js/globalData.js";
	var http = require("utils/http.js");
	export default {
		globalData: {
			http: http,
			receiptAddress: {
				id: '',
				city: '',
				province: '',
				cityCode:'',
				address: '',
				lat: 0,
				lng: 0,
				contact: '',
				floor: '',
				phone: '',
				district: ''
			},
			sendAddress: {
				id: '',
				city: '',
				province: '',
				cityCode:'',
				address: '',
				lat: 0,
				lng: 0,
				contact: '',
				floor: '',
				phone: '',
				district: ''
			}
		},
		onLaunch: function() {
			console.log("App Launch");
			let titleHeight = 64;
			let statusBarHeight = 22;
			let naviBarHeight = 44;
			const res = uni.getSystemInfoSync();
			const system = res.platform;
			statusBarHeight = res.statusBarHeight;
			if (system === "android") {
				titleHeight = 48 + statusBarHeight;
			} else if (system === "ios") {
				titleHeight = 44 + statusBarHeight;
			} else if (system === "devtools") {
				titleHeight = 44 + statusBarHeight;
			}
			naviBarHeight = titleHeight - statusBarHeight;
			globalData.statusBarHeight = statusBarHeight;
			globalData.naviBarHeight = naviBarHeight;
			globalData.titleHeight = titleHeight;
			globalData.windowHeight = res.windowHeight;
			globalData.windowWidth = res.windowWidth;
			globalData.iphoneX = res.screenHeight >= 812 ? true : false;
			globalData.platform = res.platform;

			// #ifdef APP-PLUS
			const _self = this;
			const _handlePush = function(message) {
				console.log(message);
				//跳转到某个指定的页面
			};
			//点击通知消息时执行的事件
			plus.push.addEventListener('click', _handlePush);
			//收到透传消息时执行的事件
			plus.push.addEventListener('receive', _handlePush);
			// 一键登录预登陆，可以显著提高登录速度
			uni.preLogin({
				provider: 'univerify',
				success: (res) => {
					console.log("preLogin success: ", res);
				},
				fail: (err) => {
					console.log("preLogin fail: ", err);
				}
			})
			// #endif
		},
		onShow: function() {
			console.log("App Show");
		},
		onHide: function() {
			console.log("App Hide");
		},
	};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	/* 解决小程序和app滚动条的问题 */
	/* #ifdef MP-WEIXIN || APP-PLUS||APP-PLUS-NVUE */
	::-webkit-scrollbar {
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	/* #endif */
	/* 解决H5 的问题 */
	/* #ifdef H5 */
	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	/* #endif */
</style>
