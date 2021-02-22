
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/order/list/index","pages/personal/core/index","pages/wallet/account","pages/wallet/index","pages/coupon/index","pages/wallet/transactionDetail","pages/personal/messageList","pages/shop/shopList","pages/shop/addShop","pages/shop/shopInfo","pages/delivery/guaranteedDelivery","pages/delivery/bindPlatform","pages/city/choice/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8"},"tabBar":{"color":"rgba(153, 153, 153, 1)","selectedColor":"rgba(252, 114, 0, 1)","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/index","iconPath":"static/image/home.png","selectedIconPath":"static/image/home_HL.png","text":"首页"},{"pagePath":"pages/order/list/index","iconPath":"static/image/order.png","selectedIconPath":"static/image/order_HL.png","text":"订单"},{"pagePath":"pages/personal/core/index","iconPath":"static/image/personal.png","selectedIconPath":"static/image/personal_HL.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"shanson","compilerVersion":"3.1.2","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/order/list/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/personal/core/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/wallet/account","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/wallet/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/coupon/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/wallet/transactionDetail","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/personal/messageList","meta":{},"window":{"navigationBarTitleText":"消息中心"}},{"path":"/pages/shop/shopList","meta":{},"window":{"navigationBarTitleText":"门店管理"}},{"path":"/pages/shop/addShop","meta":{},"window":{"navigationBarTitleText":"新增门店"}},{"path":"/pages/shop/shopInfo","meta":{},"window":{"navigationBarTitleText":"门店详情"}},{"path":"/pages/delivery/guaranteedDelivery","meta":{},"window":{"navigationBarTitleText":"保底配送"}},{"path":"/pages/delivery/bindPlatform","meta":{},"window":{"navigationBarTitleText":"绑定外卖平台"}},{"path":"/pages/city/choice/index","meta":{},"window":{"navigationBarTitleText":"城市选择"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
