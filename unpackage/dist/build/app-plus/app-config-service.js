
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/city/choice/index","pages/order/list/index","pages/personal/core/index","pages/wallet/account","pages/wallet/index","pages/coupon/index","pages/wallet/transactionDetail","pages/personal/messageList","pages/shop/shopList","pages/shop/addShop","pages/shop/shopInfo","pages/delivery/guaranteedDelivery","pages/delivery/bindPlatform","pages/delivery/bindPlatformList","pages/city/choice/index","pages/deliverySettings/takeoutSetting","pages/deliverySettings/accountManager","pages/deliverySettings/addAccount","pages/visit/index","pages/login/login","pages/login/loginHome","pages/login/forgetPwd","pages/myTool/loudspeakerList","pages/myTool/addLoudspeaker","pages/myTool/printList","pages/myTool/addPrint","pages/myTool/addressList","pages/myTool/addAddress","pages/myTool/customerCenter","pages/myTool/feedback","pages/myTool/joinPartner","pages/myTool/setting","pages/myTool/modifyPwd","pages/myTool/aboutUs","pages/myTool/privatePolicy","pages/statics/shopStatistics","pages/statics/deliveryStatistics","pages/statics/takeoutStatistics","pages/statics/payStatistics","pages/order/deliveryOrderDetail","pages/bill/addBill","pages/bill/choiceAddress","pages/bill/choiceMapAddress","pages/bill/receiptBill","pages/bill/billRemark","pages/deliverySettings/applyForBusiness","pages/deliverySettings/setGuaranteedDelivery","pages/bill/choiceContact","pages/order/orderSearch","pages/login/bindPhone"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8"},"tabBar":{"color":"rgba(153, 153, 153, 1)","selectedColor":"rgba(252, 114, 0, 1)","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"static/image/home.png","selectedIconPath":"static/image/home_HL.png","text":"首页"},{"pagePath":"pages/order/list/index","iconPath":"static/image/order.png","selectedIconPath":"static/image/order_HL.png","text":"订单"},{"pagePath":"pages/personal/core/index","iconPath":"static/image/personal.png","selectedIconPath":"static/image/personal_HL.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"猎豹AI","compilerVersion":"3.1.4","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/city/choice/index","meta":{},"window":{"navigationBarTitleText":"城市选择"}},{"path":"/pages/order/list/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/personal/core/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/wallet/account","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/wallet/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/coupon/index","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/wallet/transactionDetail","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/personal/messageList","meta":{},"window":{"navigationBarTitleText":"消息中心"}},{"path":"/pages/shop/shopList","meta":{},"window":{"navigationBarTitleText":"门店管理"}},{"path":"/pages/shop/addShop","meta":{},"window":{"navigationBarTitleText":"新增门店"}},{"path":"/pages/shop/shopInfo","meta":{},"window":{"navigationBarTitleText":"门店详情","titleNView":{"buttons":[{"color":"#E95008","fontSize":"28upx","text":"编辑"}]}}},{"path":"/pages/delivery/guaranteedDelivery","meta":{},"window":{"navigationBarTitleText":"保底配送"}},{"path":"/pages/delivery/bindPlatform","meta":{},"window":{"navigationBarTitleText":"自运力绑定"}},{"path":"/pages/delivery/bindPlatformList","meta":{},"window":{"navigationBarTitleText":"绑定外卖平台"}},{"path":"/pages/deliverySettings/takeoutSetting","meta":{},"window":{"navigationBarTitleText":"发单设置"}},{"path":"/pages/deliverySettings/accountManager","meta":{},"window":{"navigationBarTitleText":"账号管理"}},{"path":"/pages/deliverySettings/addAccount","meta":{},"window":{"navigationBarTitleText":"新增账号"}},{"path":"/pages/visit/index","meta":{},"window":{"navigationBarTitleText":"邀请好友赚现金"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationStyle":"custom"}},{"path":"/pages/login/loginHome","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/forgetPwd","meta":{},"window":{"navigationBarTitleText":"重置密码"}},{"path":"/pages/myTool/loudspeakerList","meta":{},"window":{"navigationBarTitleText":"语音播报"}},{"path":"/pages/myTool/addLoudspeaker","meta":{},"window":{"navigationBarTitleText":"添加云音响"}},{"path":"/pages/myTool/printList","meta":{},"window":{"navigationBarTitleText":"小票打印"}},{"path":"/pages/myTool/addPrint","meta":{},"window":{"navigationBarTitleText":"新增打印机"}},{"path":"/pages/myTool/addressList","meta":{},"window":{"navigationBarTitleText":"常用地址"}},{"path":"/pages/myTool/addAddress","meta":{},"window":{"navigationBarTitleText":"新增地址"}},{"path":"/pages/myTool/customerCenter","meta":{},"window":{"navigationBarTitleText":"客服中心"}},{"path":"/pages/myTool/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/myTool/joinPartner","meta":{},"window":{"navigationBarTitleText":"加盟合作"}},{"path":"/pages/myTool/setting","meta":{},"window":{"navigationBarTitleText":"系统设置"}},{"path":"/pages/myTool/modifyPwd","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/myTool/aboutUs","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/myTool/privatePolicy","meta":{},"window":{"navigationBarTitleText":"用户协议与隐私政策"}},{"path":"/pages/statics/shopStatistics","meta":{},"window":{"navigationBarTitleText":"门店统计"}},{"path":"/pages/statics/deliveryStatistics","meta":{},"window":{"navigationBarTitleText":"配送统计"}},{"path":"/pages/statics/takeoutStatistics","meta":{},"window":{"navigationBarTitleText":"外卖统计"}},{"path":"/pages/statics/payStatistics","meta":{},"window":{"navigationBarTitleText":"支付统计"}},{"path":"/pages/order/deliveryOrderDetail","meta":{"isNVue":true},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/bill/addBill","meta":{},"window":{"navigationBarTitleText":"发单信息"}},{"path":"/pages/bill/choiceAddress","meta":{},"window":{"navigationBarTitleText":"位置选择"}},{"path":"/pages/bill/choiceMapAddress","meta":{"isNVue":true},"window":{"navigationBarTitleText":"选择发件地址"}},{"path":"/pages/bill/receiptBill","meta":{},"window":{"navigationBarTitleText":"发单"}},{"path":"/pages/bill/billRemark","meta":{},"window":{"navigationBarTitleText":"订单备注"}},{"path":"/pages/deliverySettings/applyForBusiness","meta":{},"window":{"navigationBarTitleText":"申请为商家"}},{"path":"/pages/deliverySettings/setGuaranteedDelivery","meta":{},"window":{"navigationBarTitleText":"自动配送"}},{"path":"/pages/bill/choiceContact","meta":{},"window":{"navigationBarTitleText":"通讯录"}},{"path":"/pages/order/orderSearch","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/login/bindPhone","meta":{},"window":{"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
