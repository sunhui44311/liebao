<script>
	import globalData from './common/js/globalData.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let titleHeight=64
			let statusBarHeight=22
			let naviBarHeight=44
			const res = uni.getSystemInfoSync()
			const system = res.platform
			statusBarHeight = res.statusBarHeight
			if (system === 'android') {
			titleHeight = (48 + statusBarHeight)
			} else if (system === 'ios') {
			titleHeight = (44 + statusBarHeight)
			}
			else if(system==='devtools'){
				titleHeight = (44 + statusBarHeight)
			}
			naviBarHeight=titleHeight-statusBarHeight
			globalData.statusBarHeight=statusBarHeight
			globalData.naviBarHeight=naviBarHeight
			globalData.titleHeight=titleHeight
			globalData.windowHeight=res.windowHeight
			globalData.windowWidth=res.windowWidth
			globalData.iphoneX=res.screenHeight>=812?true:false
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
