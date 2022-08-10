import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={//要设置的全局访问的state对象
  	 type:1,
     date:'',
     classroomId:'',
     classroomName:'',
     curriculumId:'',
     courseName:'',
     show:false,

};
 const store = new Vuex.Store({
       state
    });

export default store;
