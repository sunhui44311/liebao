import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
var http = require("utils/http.js");
Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$http = http;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
