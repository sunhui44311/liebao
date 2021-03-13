export default{
	getRect(selector){
		return new Promise((resolve) => {
			let view = uni.createSelectorQuery().select(selector);
			view.fields({
				size: true,
				rect: true,
				scrollOffset:true
			}, (res) => {
				resolve(res);
			}).exec();
		})
	},
	
	getElementRect(owener,selector,callback){
		let info = uni.createSelectorQuery().in(owener).select(selector);
		info.boundingClientRect(function(data) { 
			callback(data)		  
		}).exec(function(res){
		})
	}
}