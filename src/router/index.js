import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
Vue.use(Router)
export default new Router({
	// base: '/history',
	mode:'history',
  routes: [
	  // {
	  //       path: "*",
	  //       redirect: "/"
	  // },
    {
      path: '/',
      name: 'index',
     component: index,

    },
    {
      path: '/index',
      name: 'index',
      component: index,

    }
  ]
})
