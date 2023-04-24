// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import router from './router'
 import store from './store'
// import 'lib-flexible/flexible'
import 'babel-polyfill'
import 'classlist-polyfill'
Vue.config.productionTip = false
import Axios from 'axios'

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.prototype.testUrl = "http://172.16.13.73:8088/"

Vue.prototype.getstr=function(str,num){
	if(str!=undefined){
		var length=str.length;
		if(length>num){
			str=str.substring(0,num)+"..."
		}
		return str;
	}

}
Vue.prototype.initnowday=function(){
    var date=new Date();
    //年
    var year=date.getFullYear();
    //月
    var month=date.getMonth()+1;
    //日
    var day=date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var ss=date.getSeconds();
    var rq=year+'-'+month+'-'+day
     var nowday='';
     return nowday=rq;
}

Vue.prototype.changetime=function(time){
  if(time){
    var dateee = new Date(time).toJSON();
    var time1 = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return time1
  }else{
    return time
  }

}
// Vue.prototype.changetime=function(timestamp){
//   let a = new Date(timestamp).getTime();
//     const date = new Date(a);
//     const Y = date.getFullYear() + '-';
//     const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//     const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  ';
//     const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
//     const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
//     // const s = date.getSeconds(); // 秒
//     const dateString = Y + M + D + h + m;
//     // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
//     return dateString;

// }

Vue.prototype.Datetime=function(){
 let dateTime
       let yy = new Date().getFullYear()
       let mm = new Date().getMonth() + 1
       let dd = new Date().getDate()
       let hh = new Date().getHours()
       let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
         :
         new Date().getMinutes()
       let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
         :
         new Date().getSeconds()
//     dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
       dateTime =  hh + ':' + mf + ':' + ss
       return dateTime;

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	 store,
  components: { App },
  template: '<App/>'
})
