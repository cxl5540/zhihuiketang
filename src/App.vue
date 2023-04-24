<template>
  <div id="app">
      <Header></Header>
 			<router-view/>
  </div>
</template>

<script>
  import Header from './components/header';
export default {

  name: 'App',
    components:{
      Header
      },
  data(){
    return {
    }
  },
  created(){
		 this.fontsize();
		 let _this=this;
  	$(window).resize(function () {
		   _this.fontsize();
		});
  },
  watch:{

  },
  methods:{
		fontsize(){
			var size;
			var winW = $(window).width();
			if (winW <= 1750 && winW > 1250) {
			    size = Math.round(winW / 17.5);
			} else if(winW <= 1250 && winW > 800){
			    size = Math.round(winW / 14.5);
			}
			 else if (winW <= 800) {
			    size = Math.round(winW / 7.5);
			    if (size > 65) {
			        size = 65;
			    }
			} else {
			    size = 100;
			}
			$('html').css({
			    'font-size': size + 'px'
			})
		}
  }
}
</script>

<style>
#app {
  font-family: 'MicrosoftYaHei', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #A2D8F4;
  font-size: 0.16rem;
  margin: 0px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /*	background: rgba(14,27,82,.6);*/
  background:url('assets/bg.gif');
  background-size: cover;
}
body{
	height: 100vh;
	overflow: hidden;
}
body,p,h1,h2,h3,h4,h5,ul,li{
	margin: 0;
	padding: 0;
}
li{
	list-style: none;
}
button{
  border: none;
}
input:focus,select:focus,textarea:focus{
  border: 1px solid #0082dc !important;
  outline: none;
}
button:focus{
	outline: none;
}
.el-select-dropdown__list{
  background: #0E234B !important;
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
   border-bottom-color: #0E234B !important;
}
.el-select-dropdown__item,.el-form-item__label{
   color: #A2D8F4;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background: #0E234B !important;
}
.el-select-dropdown{
  border: 1px solid #3C6EAC;
}
 .el-select .el-input.is-focus .el-input__inner{
  background: #0E234B;
  border: 1px solid #3C6EAC;
}
.el-input__inner{
  background: #0E234B;
   border: 1px solid #3C6EAC;
   color: #A2D8F4 ;
}
.el-picker-panel__body,.el-date-picker__header{
    background:rgba(14,35,75,1);
}
.el-picker-panel{
   background:rgba(14,35,75,1);
}
.el-picker-panel{
  border: none;
}
.el-date-table th{
  border-bottom: 1px solid #000;
}
.el-date-table td span,.el-date-table th,.el-date-picker__header-label{
   color: #A2D8F4;
}
.el-popper[x-placement^=top] .popper__arrow{
  display: none;
}
.el-icon-d-arrow-right:before,.el-icon-d-arrow-left:before,.el-icon-arrow-right:before,.el-icon-arrow-left:before{
  color: #A2D8F4;
}
.model{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background: rgba(255,255,255,0.2);
}
/*时间**/
/deep/.el-range-editor .el-range-input{
  background: none;
  color: #A2D8F4;
}
.el-date-editor .el-range-separator,.el-time-range-picker__header,.el-time-spinner__item,.el-time-spinner__item.active:not(.disabled),.el-time-panel__btn,.el-date-editor .el-range-input{
   color: #A2D8F4;
}
.el-time-range-picker__body{
   border: 1px solid #3C6EAC;
}
.el-time-panel__content::after, .el-time-panel__content::before{
   border-top: 1px solid #3C6EAC;
   border-bottom: 1px solid #3C6EAC;
}
.el-time-panel__footer{
  border-top: 1px solid #3C6EAC;
  height: auto;
}
.el-time-spinner__item:hover,.el-time-spinner__item:hover:not(.disabled):not(.active){
  background:#409EFF;
}
.el-range-editor .el-range-input{
  background: #0E234B;
}
.el-range-editor.is-active{
  border: 1px solid #3C6EAC;
}
.el-range-editor .el-range-input.active{
  border: none;
  outline: none;
}
</style>
