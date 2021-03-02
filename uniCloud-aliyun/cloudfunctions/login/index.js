'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const res = await uniCloud.getPhoneNumber({
			appid: '__UNI__1DE707A', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
			provider: 'univerify',
			apiKey: '4ad5432c168b80a24ee58f88fca2e1fb', // 在开发者中心开通服务并获取apiKey
			apiSecret: '7f473eaae16bced7d46fba1975362ec3', // 在开发者中心开通服务并获取apiSecret
			access_token: event.access_token,
			openid: event.openid
		})
	//返回数据给客户端
	return {
			code: 0,
			message: '获取手机号成功',
			data:res
		}
};
