<template>
	<view class="box">
		<rich-text :nodes="html"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				html:''
			}
		},
		onLoad() {
			this.getExplain()
		},
		methods:{
			getExplain(){
				var params={
					url:'app/common/explain',
					method:'GET',
					data:{type:4},
					callBack:(res)=>{
						console.log(res)
						uni.hideLoading()
						this.html=res.data[0].content
					}
				}
				uni.showLoading({
					title:'正在加载'
				})
				this.$http.request(params)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F7F9;
	}
	.box{
		margin: 10px;
		background-color: white;
		border-radius: 7px;
		padding: 56upx 32upx;
	}
	.tlt{
		color: #101E3E;
		font-size: 15px;
		margin-bottom: 32upx;
	}
	.section{
		margin-bottom: 66upx;
	}
	.content{
		color: #101E3E;
		font-size: 14px;
	}
</style>
