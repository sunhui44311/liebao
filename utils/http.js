var config = require("./config.js");
import userInfo from '../common/js/user.js'
//统一的网络请求方法
function request(params, isGetTonken) {
	var baseInfo = JSON.parse(JSON.stringify(userInfo.user));
	var param = Object.assign(baseInfo, params.data)
	uni.request({
		url: config.domain + params.url, //接口请求地址
		data: param,
		header: {
			'token':isGetTonken?param['token']:uni.getStorageSync('token'),
			// 'content-type': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
			'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		method: params.method == undefined ? "POST" : params.method,
		dataType: 'json',
		responseType: params.responseType == undefined ? 'text' : params.responseType,
		success: function (res) {
			if (res.statusCode == 200) {
				//如果有定义了params.callBack，则调用 params.callBack(res.data)
				if (params.callBack) {
					params.callBack(res.data);
				}

			} else if (res.statusCode == 500) {
				uni.showToast({
					title: "服务器出了点小差",
					icon: "none"
				});
			} else if (res.statusCode == 401) {

			} else if (res.statusCode == 400) {
				uni.showToast({
					title: res.data,
					icon: "none"
				})

			} else {
				//如果有定义了params.errCallBack，则调用 params.errCallBack(res.data)
				if (params.errCallBack) {
					params.errCallBack(res);
				}
			}
		},
		fail: function (err) {
			uni.hideLoading();
			uni.showToast({
				title: "服务器出了点小差",
				icon: "none"
			});
		}
	})
}

function jsonRequest(params, isGetTonken) {
	var baseInfo = JSON.parse(JSON.stringify(userInfo.user));
	var param = Object.assign(baseInfo, params.data)
	uni.request({
		url: config.domain + params.url, //接口请求地址
		data: param,
		header: {
			'token': uni.getStorageSync('token'),
			// 'content-type': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
			'Content-type': 'application/json',
		},
		method: params.method == undefined ? "POST" : params.method,
		dataType: 'json',
		responseType: params.responseType == undefined ? 'text' : params.responseType,
		success: function (res) {
			if (res.statusCode == 200) {
				//如果有定义了params.callBack，则调用 params.callBack(res.data)
				if (params.callBack) {
					params.callBack(res.data);
				}

			} else if (res.statusCode == 500) {
				uni.showToast({
					title: "服务器出了点小差",
					icon: "none"
				});
			} else if (res.statusCode == 401) {

			} else if (res.statusCode == 400) {
				uni.showToast({
					title: res.data,
					icon: "none"
				})

			} else {
				//如果有定义了params.errCallBack，则调用 params.errCallBack(res.data)
				if (params.errCallBack) {
					params.errCallBack(res);
				}
			}
		},
		fail: function (err) {
			uni.hideLoading();
			uni.showToast({
				title: "服务器出了点小差",
				icon: "none"
			});
		}
	})
}

function uploadImage(params) {
	uni.uploadFile({
		url: config.picDomain + params.url,
		filePath: params.data.imageUrl,
		name: params.data.name,
		header: {
			"content-type": "multipart/form-data",
			'token': uni.getStorageSync('session'),
		},
		success: function (res) {
			if (res.statusCode == 200) {
				//如果有定义了params.callBack，则调用 params.callBack(res.data)
				if (params.callBack) {
					params.callBack(res.data);
				}
			} else if (res.statusCode == 500) {
				uni.showToast({
					title: "服务器出了点小差",
					icon: "none"
				});
			} else if (res.statusCode == 401) {

			} else if (res.statusCode == 400) {
				uni.showToast({
					title: res.data,
					icon: "none"
				})

			} else {
				//如果有定义了params.errCallBack，则调用 params.errCallBack(res.data)
				if (params.errCallBack) {
					params.errCallBack(res);
				}
			}
		},
		fail: function (err) {
			uni.hideLoading();
			uni.showToast({
				title: "服务器出了点小差",
				icon: "none"
			});
		}
	})
}

function upload(params) {
	// const FormData = require('form-data');
	let formData = new FormData();
	formData.append('file', params.data.file);
	uni.request({
		url: config.picDomain + params.url,
		data: formData,
		method: 'POST',
		dataType: 'json',
		header: {
			'token': uni.getStorageSync('session'),
			// 'content-type': params.method == "GET" ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8',
			'Content-type': 'multipart/form-data',
		},
		success: function (res) {
			console.log(res)
		},
		fail(err) {
			console.log(err)
		}
	})
}

// 更新用户头像昵称
function updateUserInfo(successBack) {
	uni.getUserInfo({
		success: (res) => {
			var userInfo = JSON.parse(res.rawData)
			request({
				url: "/p/user/setUserInfo",
				method: "PUT",
				data: {
					avatarUrl: userInfo.avatarUrl,
					nickName: userInfo.nickName
				},
				callBack: res => {
					typeof successBack == 'function' && successBack();
				}
			});
		}
	})
}



exports.request = request;
exports.jsonRequest=jsonRequest;
exports.updateUserInfo = updateUserInfo;
exports.uploadImage = uploadImage;
exports.upload = upload
