<template>
  <view id="core">
    <view class="head-back"> </view>
    <view class="user-core">
      <view class="nav">
        <view class="title">我的</view>
        <image
          src="~static/image/nl.png"
          @click.stop="message_Click"
          class="icon"
        ></image>
      </view>
      <view class="user-box">
        <view class="user-info">
		  <view class="head" v-if="isLogin">
		    <image
		      :src="userInfo.avatar?userInfo.avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F07%2F20200607222012_lwusd.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616221777&t=7ee684e6ab371150ee6573252602e74a'"
		      class="img"
		    ></image>
		  </view>
		  <view class="info" v-if="isLogin">
		    <view class="name">{{userInfo.nickname}}<view class="label">{{userInfo.memberType==1?'个人':'商家'}}</view></view>
		    <view class="qm">欢迎你，来到猎豹Ai{{userInfo.memberType==1?'个人':'商家'}}版</view>
		  </view>
          <view v-if="!isLogin" class="no-sign" @click="go('/pages/login/loginHome')"
            >请登录</view
          >
          <view class="icon">
            <image src="~static/image/fj2.png" class="img"></image>
          </view>
        </view>
        <view class="wallet">
          <view class="total" @click.stop="wallet">
            <view class="title"> 钱包余额 </view>
            <view class="num">{{userInfo.totalAmount}}</view>
          </view>
          <view class="recharge">
            <div class="btn">
              去充值
              <image src="~static/image/cz.png" class="icon"></image>
            </div>
          </view>
        </view>
      </view>
    </view>
	<view class="menu-list">
		<view class="menu-item" @click.stop="menu_Click(1)">
			<image src="../../../static/image/mendian@2x.png"></image>
			<view>门店管理</view>
		</view>
		<view class="menu-item" @click.stop="menu_Click(2)">
			<image src="../../../static/image/waimai@2x.png"></image>
			<view>绑定外卖平台</view>
		</view>
		<view class="menu-item" @click.stop="menu_Click(3)">
			<image src="../../../static/image/peisong@2x.png"></image>
			<view>绑定配送平台</view>
		</view>
		<view class="menu-item" @click.stop="menu_Click(4)">
			<image src="../../../static/image/shezhi@2x.png"></image>
			<view>保底设置</view>
		</view>
	</view>
	<view class="seting">
		<view>
			<view class="seting-tlt">外卖设置</view>
			<view></view>
		</view>
		<view class="seting-list">
			<view class="seting-item" @click.stop="setting(0)" v-if="userInfo.memberType==1">
				<image src="../../../static/image/yijianfadan@2x.png"></image>
				<view>申请为商家</view>
			</view>
			<view class="seting-item" @click.stop="setting(1)" v-if="userInfo.memberType==2">
				<image src="../../../static/image/yijianfadan@2x.png"></image>
				<view>一键发单</view>
			</view>
			<view class="seting-item" @click.stop="setting(2)">
				<image src="../../../static/image/xiadanshezhi@2x.png"></image>
				<view>下单设置</view>
			</view>
			<view class="seting-item" @click.stop="setting(3)">
				<image src="../../../static/image/xianshishezhi@2x.png"></image>
				<view>显示设置</view>
			</view>
			<view class="seting-item" @click.stop="setting(4)">
				<image src="../../../static/image/zhanghaoshezhi@2x.png"></image>
				<view>账号设置</view>
			</view>
			<view class="seting-item">
				<image src="../../../static/image/zidongjiedan@2x.png"></image>
				<view>自动接单</view>
			</view>
			<view class="seting-item">
				<image src="../../../static/image/zidongdayin@2x.png"></image>
				<view>自动打印</view>
			</view>
			<view class="seting-item">
				<image src="../../../static/image/zidongpeisong@2x.png"></image>
				<view>自动配送</view>
			</view>
			<view class="seting-item">
				<image src="../../../static/image/zidongtongbu@2x.png"></image>
				<view>自动同步</view>
			</view>
		</view>
	</view>
	<view class="visit" @click="visit">
		<image class="visit-logo" src="../../../static/image/visit@2x.png"></image>
		<view class="visit-title">邀请好友赚钱</view>
		<view class="right">
			<text class="tip">多邀多得，上不封顶</text>
			<image class="arrow" src="../../../static/image/fj2.png"></image>
		</view>
	</view>
	<view class="seting">
		<view>
			<view class="seting-tlt">常用工具</view>
			<view></view>
		</view>
		<view class="seting-list">
			<view class="seting-item" @click.stop="tool(1)">
				<image src="../../../static/image/yuyinbobao@2x.png"></image>
				<view>语音播报</view>
			</view>
			<view class="seting-item" @click.stop="tool(2)">
				<image src="../../../static/image/xiaopiaodayin@2x.png"></image>
				<view>小票打印</view>
			</view>
			<view class="seting-item" @click.stop="tool(3)">
				<image src="../../../static/image/changyongdizhi@2x.png"></image>
				<view>常用地址</view>
			</view>
			<view class="seting-item" @click.stop="tool(4)">
				<image src="../../../static/image/yaoqinghaoyou@2x.png"></image>
				<view>邀请好友</view>
			</view>
			<view class="seting-item" @click.stop="tool(5)">
				<image src="../../../static/image/kefu@2x.png"></image>
				<view>联系客服</view>
			</view>
			<view class="seting-item" @click.stop="tool(6)">
				<image src="../../../static/image/yijianfankui@2x.png"></image>
				<view>意见反馈</view>
			</view>
			<view class="seting-item" @click.stop="tool(7)">
				<image src="../../../static/image/zhaoshangjiameng@2x.png"></image>
				<view>招商加盟</view>
			</view>
			<view class="seting-item" @click.stop="tool(8)">
				<image src="../../../static/image/xitongshezhi@2x.png"></image>
				<view>系统设置</view>
			</view>
		</view>
	</view>
	<view class="seting" style="margin-bottom: 10px;">
		<view>
			<view class="seting-tlt">常用工具</view>
			<view></view>
		</view>
		<view class="seting-list">
			<view class="seting-item" @click.stop="statics(1)">
				<image src="../../../static/image/mendiantongji@2x.png"></image>
				<view>门店统计</view>
			</view>
			<view class="seting-item" @click.stop="statics(2)">
				<image src="../../../static/image/waimaitongji@2x.png"></image>
				<view>外卖统计</view>
			</view>
			<view class="seting-item" @click.stop="statics(3)">
				<image src="../../../static/image/peisongtongji@2x.png"></image>
				<view>配送统计</view>
			</view>
			<view class="seting-item" @click.stop="statics(4)">
				<image src="../../../static/image/zhifutongji@2x.png"></image>
				<view>支付统计</view>
			</view>
		</view>
	</view>
	<show-setting ref='showSetting'></show-setting>
  </view>
</template>
<script>
	import showSetting from '../../deliverySettings/showSetting.vue'
	var _self
	export default{
		name: 'core',
		components:{
			showSetting
		},
		data() {
		    return {
				isLogin:false,
				userInfo:{}
			};
		},
		onLoad() {
			_self=this
			this.isLogin=uni.getStorageSync('session')?true:false
			this.getUserInfo()
		},
		methods: {
		    // 用于初始化一些数据
		    init() {
		        this.update();
		    },
		    // 用于更新一些数据
		    async update() {

		    },
			wallet(){
				this.login(()=>{
					uni.navigateTo({
						url:'/pages/wallet/account'
					})
				})
			},
			message_Click(){
				uni.navigateTo({
					url:"/pages/personal/messageList"
				})
			},
			
			/*获取用户信息*/
			getUserInfo(){
				let params={
					url:'app/member/detail',
					method:'get',
					data:{},
					callBack:function(res){
						console.log(res)
						_self.userInfo=res.data
					}
				}
				this.$http.request(params)
			},
			
			login(callback){
				if(!this.isLogin){
					uni.navigateTo({
						url:'/pages/login/loginHome'
					})
				}
				else{
					callback()
				}
			},
			menu_Click(type){
				if(type==1){
					uni.navigateTo({
						url:'/pages/shop/shopList'
					})
				}
				else if(type==2){
					uni.navigateTo({
						url:'/pages/delivery/bindPlatformList'
					})
				}
				else if(type==3){
					uni.navigateTo({
						url:'/pages/delivery/bindPlatform'
					})
				}
				else if(type==4){
					uni.navigateTo({
						url:'/pages/delivery/guaranteedDelivery'
					})
				}
			},
			setting(type){
				if(type==0){
					uni.navigateTo({
						url:'/pages/deliverySettings/applyForBusiness'
					})
				}
				else if(type==2){
					uni.navigateTo({
						url:'/pages/deliverySettings/takeoutSetting'
					})
				}
				else if(type==3){
					this.$refs['showSetting'].init()
				}
				else if(type==4){
					uni.navigateTo({
						url:'/pages/deliverySettings/accountManager'
					})
				}
			},
			visit(){
				uni.navigateTo({
					url:'/pages/visit/index'
				})
			},
			tool(type){
				if(type==1){
					uni.navigateTo({
						url:'/pages/myTool/loudspeakerList'
					})
				}
				else if(type==2){
					uni.navigateTo({
						url:'/pages/myTool/printList'
					})
				}
				else if(type==3){
					uni.navigateTo({
						url:'/pages/myTool/addressList'
					})
				}
				else if(type==4){
					uni.navigateTo({
						url:'/pages/visit/index'
					})
				}
				else if(type==5){
					uni.navigateTo({
						url:'/pages/myTool/customerCenter'
					})
				}
				else if(type==6){
					uni.navigateTo({
						url:'/pages/myTool/feedback'
					})
				}
				else if(type==7){
					uni.navigateTo({
						url:'/pages/myTool/joinPartner'
					})
				}
				else if(type==8){
					uni.navigateTo({
						url:'/pages/myTool/setting'
					})
				}
			},
			statics(type){
				if(type==1){
					uni.navigateTo({
						url:'/pages/statics/shopStatistics'
					})
				}
				else if(type==3){
					uni.navigateTo({
						url:'/pages/statics/deliveryStatistics'
					})
				}
				else if(type==2){
					uni.navigateTo({
						url:'/pages/statics/takeoutStatistics'
					})
				}
				else if(type==4){
					uni.navigateTo({
						url:'/pages/statics/payStatistics'
					})
				}
			},
			    go(url) {
			      uni.navigateTo({
			        url: url,
			      });
			    },
		}
	}
</script>
<style lang="scss">
@import "index.scss";
</style>