import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
var http = require("utils/http.js");
import Tool from './utils/tool.js'
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$Tool = Tool

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
