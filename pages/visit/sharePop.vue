<template>
	<u-popup v-model="show" mode="bottom" border-radius="26">
		<view>
			<view class="pop-nav">
				<view class="pop-tlt">优惠券</view>
				<image src="../../static/image/delete.png" @click.stop="show=false"></image>
			</view>
			<view class="share-list">
				<view class="share-item" @click.stop="menu_Click('WXSceneSession')">
					<image src="../../static/image/share_weixin@2x.png"></image>
					<view>微信</view>
				</view>
				<view class="share-item" @click.stop="menu_Click('WXSenceTimeline')">
					<image src="../../static/image/share_friend@2x.png"></image>
					<view>朋友圈</view>
				</view>
				<view class="share-item">
					<image src="../../static/image/share_qq@2x.png"></image>
					<view>QQ</view>
				</view>
			</view>
			<view class="cancel" @click.stop="show=false">取消</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		data(){
			return{
				show:false
			}
		},
		methods:{
			init(){
				this.show=true
				console.log(uni.getStorageSync('token'))
			},
			menu_Click(scene){
				this.show=false
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
				        if (~res.provider.indexOf('weixin')) {
				            uni.share({
				                provider: "weixin",
				                scene: scene,
								title:'猎豹AI',
								summary:'新用户专享',
								imageUrl:'https://ecloud-cdn.51sssd.com/20210313/72be85de34f942f8bc08b161c3206d60.png',
				                type: 0,
								href:'https://uniapp.dcloud.io/api/plugins/share',
				                success: function (res) {
				                    console.log("success:" + JSON.stringify(res));
				                },
				                fail: function (err) {
				                    console.log("fail:" + JSON.stringify(err));
				                }
				            });
				        }
				    }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 32px;
		image{
			width: 12px;
			height:12px;
		}
	}
	.pop-tlt{
		color: #0D1C40;
		font-size: 15px;
		font-weight: bold;
		flex: 1;
		text-align: center;
	}
	.share-list{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px 25px;
	}
	.share-item{
		margin-left: 10px;
		margin-right: 10px;
		&>image{
			width: 60px;
			height: 60px;
		}
		&>view{
			margin-top: 10px;
			text-align: center;
			color: #9EA7B7;
			font-size: 14px;
		}
	}
	.cancel{
		background-color: #F6F5FA;
		height: 45px;
		line-height: 45px;
		border-radius: 45px;
		text-align: center;
		color: #9FA7B6;
		font-size: 16px;
		margin: 20px 35px;
	}
</style>
