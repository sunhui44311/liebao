const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const formatHtml = content => {
	content = content.replace(/\<img/gi,
		'<img style="width:100% !important;height:auto !important;margin:0;display:flex;" ');
	content = content.replace(/\<td/gi,
		'<td  cellspacing="0" cellpadding="0" border="0" style="display:block;vertical-align:top;margin: 0px; padding: 0px; border: 0px;outline-width:0px;" '
	);
	content = content.replace(/width=/gi, 'sss=');
	content = content.replace(/height=/gi, 'sss=');
	content = content.replace(/ \/\>/gi,
		' style="max-width:100% !important;height:auto !important;margin:0;display:block;" \/\>');
	return content;
}

let getQueryString = function(url, name) {
	console.log("url = " + url)
	console.log("name = " + name)
	var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
	var r = url.substr(1).match(reg)
	if (r != null) {
		console.log("r = " + r)
		console.log("r[2] = " + r[2])
		return r[2]
	}
	return null;
}

let clearNoNum = function(price) {
	let value = price.replace(/[^\d.]/g, ""); //清除除了“数字”和“.”以外的字符
	value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
	value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入2个小数
	if (value.indexOf(".") < 0 && value != "") {
		//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
		value = parseFloat(value);
	}
	return value
}

function formatDecimal(num, decimal) {
	num = num.toString()
	let index = num.indexOf('.')
	if (index !== -1) {
		num = num.substring(0, decimal + index + 1)
	} else {
		num = num.substring(0)
	}
	return parseFloat(num).toFixed(decimal)
}

module.exports = {
	formatTime: formatTime,
	formatHtml: formatHtml,
	getQueryString: getQueryString,
	clearNoNum: clearNoNum,
	formatDecimal:formatDecimal
}
