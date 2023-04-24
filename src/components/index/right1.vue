<template>
  <div class="all">
     <div class="item">
       <div>
         <h4>今日考勤情况统计</h4>
          <img src="../../assets/img_kuang1.png" alt="">
          <div class="title"><span>教师考勤</span><span>学生考勤</span></div>
          <div class="rt1">
            <div id="chart2" ref="chart2" style="width:50%;height: 20vh;"></div>
            <div id="chart3" ref="chart3" style="width:50%;height: 20vh;"></div>
          </div>
         <div class="num"><span>考勤总人次：{{te_all}}次</span><span>考勤总人次：{{st_all}}次</span></div>
       </div>
        <div>
          <h4 class="title_c">  <span>考勤统计数据</span>  <span><span :class="type_p==1?'activ':'' " @click="change(1)">学生</span><span :class="type_p==2?'activ':'' " @click="change(2)">教师</span></span></h4>
          <img src="../../assets/img_kuang1.png" alt="">
          <div class="st_list" style="width:100%;height: 18vh;">
            <ul class="li_ti">
            	<li>{{type_p==1?'学生姓名':'教师姓名'}}</li>
            	<li v-if="type_p==1">班级名称</li>
            	<li>{{type_p==1?'创建时间':'考勤开始时间'}}</li>
            	<li>{{type_p==1?'最后一次考勤时间':'考勤结束时间'}}</li>
              <li>考勤状态</li>
            </ul>
            <vue-seamless-scroll :data="list" class="seamless-warp"  :class-option="initOption" style="height: 100%;box-sizing: border-box;overflow: hidden;" >
               <ul class="i_list"  v-for="item in list">
                   <li>{{type_p==1?item.studentName:item.teacherName}}</li>
                   <li  v-if="type_p==1">{{item.className}}</li>
                   <li>{{type_p==1?changetime(item.createTime):changetime(item.attTime)}}</li>
                   <li>{{type_p==1?changetime(item.lastAttTime):changetime(item.lastAttTime)}}</li>
                   <li :style="{color:item.attResult==1?'#FF9925':item.attResult==2?'#FF9EDE':item.attResult==3?'#FF7E7E':item.attResult==4?'#FF9925':'#1BF654'}">{{item.attResult==1?'旷课':item.attResult==2?'请假':item.attResult==3?'迟到':item.attResult==4?'早退':'正常'}}</li>
               </ul>
            </vue-seamless-scroll>
          </div>
        </div>
     </div>
     <div class="item">
        <div>
          <h4>学生行为总次数情况统计</h4>
           <img src="../../assets/img_kuang1.png" alt="">
            <div id="chart4" ref="chart4" style="width:100%;height: 25vh;"></div>
        </div>
        <div>
          <h4>不专注行为总次数情况统计</h4>
           <img src="../../assets/img_kuang1.png" alt="">
            <div id="chart5" ref="chart5" style="width:100%;height: 25vh;"></div>
        </div>
     </div>
     <div class="item">
        <div class="table">
          <h4 style="line-height: 0.34rem;" class="title_c search"><span>学生行为数据列表 &nbsp;&nbsp;&nbsp;<span style="cursor: pointer;z-index: 100;position: relative;" @click="showList">+</span></span> <span>
          <img src="../../assets/icon_sousuo.png" alt="" @click="search"><input type="text" v-model="key_name" placeholder="姓名"><el-button  @click="search" size='mini'  type="primary">搜索</el-button></span> </h4>
           <img src="../../assets/img_kuang4.png" alt="">
           <div class="st_list xw_list" style="width:100%;height: 18vh;">
             <ul class="li_ti">
             	<li>姓名</li>
             	<li>班级名称</li>
             	<li>学生行为</li>
             	<li>记录时间</li>
               <li>操作</li>
             </ul>
             <vue-seamless-scroll :data="list_beh" class="seamless-warp"  :class-option="initOption" style="height: 100%;box-sizing: border-box;overflow: hidden;" >
                <ul class="i_list"  v-for="i in list_beh">
                    <li>{{i.humanName}}</li>
                    <li>{{i.className}}</li>
                    <li>
                      <span>{{i.posture=='sitting'?'坐下':i.posture=='standingUp'?'坐下':'未知'}}</span>
                      <span>{{i.reading=='no'?'没阅读':i.reading=='yes'?'阅读':'未知'}}</span>
                      <span>{{i.writing=='no'?'没书写':i.writing=='yes'?'书写':'未知'}}</span>
                      <span>{{i.raisingHand=='no'?'没举手':i.raisingHand=='yes'?'举手':'未知'}}</span>
                      <span>{{i.discuss=='no'?'没讨论':i.discuss=='yes'?'讨论':'未知'}}</span>
                      <span>{{i.direction=='forward'?'朝前':i.direction=='backward'?'朝后':i.direction=='leftward'?'朝左':i.direction=='rightward'?'朝右':'未知'}}</span>
                      <span>{{i.listening=='no'?'没听讲':i.listening=='yes'?'听讲':'未知'}}</span>
                      <span :style="{background:i.headOnDesk=='yes'?'#FF6347':''}">{{i.headOnDesk=='no'?'没趴桌子':i.headOnDesk=='yes'?'趴桌子':'未知'}}</span>
                      <span :style="{background:i.playMobilePhone=='yes'?'#FF6347':''}">{{i.playMobilePhone=='no'?'没玩手机':i.playMobilePhone=='yes'?'玩手机':'未知'}}</span>
                    </li>
                    <li>{{changetime(i.happenTime)}}</li>
                    <li style="color: #FF9925;cursor: pointer;" @click="showmodel(i.bkgUrl,i.snapHumanUrl,i.headOnDesk,i.listening)">查看</li>
                </ul>
             </vue-seamless-scroll>
           </div>
        </div>
     </div>
     <div class="model" v-if="show_m" style="z-index: 999999;">
        <div class="m_pic">
          <img :src="pic_url" alt="" style="max-width: 14rem;">
          <img :src="snapHumanUrl" style="position: absolute;left: 0;max-height: 2rem;"/>
          <div style="position: absolute;bottom: 0;right: 0;">
            <el-tag >{{headOnDesk=='no'?'没趴桌子':headOnDesk=='yes'?'趴桌子':'未知'}}</el-tag>
            <el-tag  type="success">{{listening=='no'?'没听讲':listening=='yes'?'听讲':'未知'}}</el-tag>
          </div>
        </div>
        <img src="../../assets/icon_close.png" @click="show_m=false" alt="">
     </div>
     <div class="model" v-if="show_list">
       <div class="video">
          <div class="item" style="width: 100%;">
             <div class="table">
               <h4 style="line-height: 0.34rem;padding-left: 0.3rem;" class="title_c search"><span>学生行为数据列表</span>
               <span style="border:1px solid #3C6EAC;overflow: hidden;margin-right: 0.3rem;padding: 0 0 0 0.1rem;"><img src="../../assets/icon_sousuo.png" alt="" @click="search1"><input type="text" v-model="key_name1" placeholder="姓名"><el-button  @click="search1" size='mini'   type="primary">搜索</el-button></span></h4>
                <div class="st_list xw_list" style="width:100%;height: 18vh;">
                  <ul class="li_ti">
                  	<li>姓名</li>
                  	<li>班级名称</li>
                  	<li>学生行为</li>
                  	<li>记录时间</li>
                    <li>操作</li>
                  </ul>
                     <ul class="i_list"  v-for="i,index in list_beh1" :key='index'>
                         <li>{{i.humanName}}</li>
                         <li>{{i.className}}</li>
                         <li>
                           <span>{{i.posture=='sitting'?'坐下':i.posture=='standingUp'?'坐下':'未知'}}</span>
                           <span>{{i.reading=='no'?'没阅读':i.reading=='yes'?'阅读':'未知'}}</span>
                           <span>{{i.writing=='no'?'没书写':i.writing=='yes'?'书写':'未知'}}</span>
                           <span>{{i.raisingHand=='no'?'没举手':i.raisingHand=='yes'?'举手':'未知'}}</span>
                           <span>{{i.discuss=='no'?'没讨论':i.discuss=='yes'?'讨论':'未知'}}</span>
                           <span>{{i.direction=='forward'?'朝前':i.direction=='backward'?'朝后':i.direction=='leftward'?'朝左':i.direction=='rightward'?'朝右':'未知'}}</span>
                           <span>{{i.listening=='no'?'没听讲':i.listening=='yes'?'听讲':'未知'}}</span>
                           <span :style="{background:i.headOnDesk=='yes'?'#FF6347':''}">{{i.headOnDesk=='no'?'没趴桌子':i.headOnDesk=='yes'?'趴桌子':'未知'}}</span>
                           <span :style="{background:i.playMobilePhone=='yes'?'#FF6347':''}">{{i.playMobilePhone=='no'?'没玩手机':i.playMobilePhone=='yes'?'玩手机':'未知'}}</span>
                         </li>
                         <li>{{changetime(i.happenTime)}}</li>
                         <li style="color: #FF9925;cursor: pointer;" @click="showmodel(i.bkgUrl,i.snapHumanUrl,i.headOnDesk,i.listening)">查看</li>
                     </ul>
                </div>
             </div>
          </div>
          <div class="pagination">
            <el-pagination
              background
              @current-change=changpage
              layout="prev, pager, next"
               :pager-count="11"
              :total="pages*10">
            </el-pagination>
          </div>
       </div>
          <img src="../../assets/icon_close.png" @click="close_list" alt="">
     </div>

  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      myChart2:'',
      myChart3:'',
      myChart4:'',
      myChart5:'',
      xw_list:['坐下','没阅读','没书写','没举手','没讨论','朝前','没听讲','没趴桌子','没玩手机'],
      list:[],
      list_beh:[],
      list_beh1:[],
      st_all:0,
      te_all:0,
      type_p:1,
      key_name:'',
      key_name1:'',
      pic_url:'',
      snapHumanUrl:'',
      show_m:false,
      show_list:false,
      pages:0,
      page:1,
      headOnDesk:'',
      listening:''
    }
  },
  computed: {
  	initOption() {
  		return {
  			hoverStop: true, //鼠标移入时是否停止滚动
  			singleHeight: 0,
  			waitTime: 0,
  			step: 0.2, // 滚动速度，越大越快
  		}
  	},
    dataVal(){
    	return this.$store.state.date
    },
    classroomId(){
    	return this.$store.state.classroomId
    },
    curriculumId(){
    	return this.$store.state.curriculumId
    }
  },
  watch:{
    dataVal(newVal,oldVal){
      if(newVal!==oldVal){
          this.getkaoqin();
          this.getxingwei();
          this.getlist();
           this.getlist_xw();
      }
    },

    classroomId(newVal,oldVal){
      if(newVal!==oldVal){
          this.getkaoqin();
          this.getxingwei();
          this.getlist();
           this.getlist_xw();
      }
    },
    curriculumId(newVal,oldVal){
      if(newVal!==oldVal){
          this.getkaoqin();
          this.getxingwei();
          this.getlist();
          this.getlist_xw();
      }
    }
  },
  created() {

  },
  mounted() {
     this.getkaoqin();
     this.getxingwei();
     this.getlist();
     this.getlist_xw();
    window.addEventListener('resize', ()=> {
    		this.myChart2.resize();
    	  this.myChart3.resize();
        this.myChart4.resize();
        this.myChart5.resize();
    		// this.myChart4.resize();
    });
  },
  methods:{
    changpage(val){ //分页
      this.page=val;
      this.getlist_xw1()
    },
    showList(){ //行为列表
     this.key_name1='';
     this.page=1;
      this.show_list=true;
      this.getlist_xw1();
    },
    close_list(){  //关闭列表
      this.show_list=false;
    },
    search1(){  //搜索列表
      this.page=1;
      this.getlist_xw1()
    },
    search(){  //搜索列表
      this.page=1;
      this.getlist_xw()
    },
    showmodel(bkgUrl,snapHumanUrl,headOnDesk,listening){//巡检
      this.pic_url=bkgUrl;
      this.snapHumanUrl=snapHumanUrl;
      this.headOnDesk=headOnDesk;
      this.listening=listening;
      this.show_m=true;
    },
    getkaoqin(){  //全校考勤情况
      var url=this.testUrl+'api/v1/statistics/getTodayAttendance';
      var data={
        	"behaviorTypeId": 0,
        	"classroomId":this.$store.state.classroomId,
        	"curriculumId":this.$store.state.curriculumId,
        	"day":this.$store.state.date
      }
      let _this=this;
     $.ajax({
       url:url,
       type:"post",
       dataType:"json",
       data:JSON.stringify(data) ,
       headers: {'Content-Type': 'application/json'},
       success: function (res) {
          if(res.code==200){
            _this.st_all=res.data.studentLate+res.data.studentLeave+res.data.studentLeaveEarly+res.data.studentNormal+res.data.studentTruancy;
            _this.te_all=res.data.teacherTruancy+res.data.teacherNormal+res.data.teacherLeaveEarly+res.data.teacherLeave+res.data.teacherLate;
            _this.getdata2(res.data.teacherLate,res.data.teacherLeave,res.data.teacherLeaveEarly,res.data.teacherTruancy,res.data.teacherNormal);
            _this. getdata3(res.data.studentLate,res.data.studentLeave,res.data.studentLeaveEarly,res.data.studentNormal,res.data.studentTruancy)
          }
       }
     })
    },
    change(type_p){
      this.type_p=type_p;
       this.getlist();
    },
    getlist(){  //全校考勤情况学生
      var url='';
      if(this.type_p==1){
        url=this.testUrl+'api/v1/statistics/getTodayAttendanceStudentList';
      }else{
         url=this.testUrl+'api/v1/statistics/getTodayAttendanceTeacherList';
      }
      var data={
        	"behaviorTypeId": 0,
        	"classroomId":this.$store.state.classroomId,
        	"curriculumId":this.$store.state.curriculumId,
        	"day":this.$store.state.date
      }
      let _this=this;
     $.ajax({
       url:url,
       type:"post",
       dataType:"json",
       data:JSON.stringify(data) ,
       headers: {'Content-Type': 'application/json'},
       success: function (res) {
          if(res.code==200){
              _this.list=res.data;

          }
       }
     })
    },
    getlist_xw(){  //教室和课程学生行为数据列表
      var url=this.testUrl+'api/v1/statistics/getTodayStudentBehaviorList';
      var data={
        	"name":this.key_name,
        	"classroomId":this.$store.state.classroomId,
        	"curriculumId":this.$store.state.curriculumId,
        	"day":this.$store.state.date,
          "pageNum":1,
          "pageSize": 200
      }
      let _this=this;
     $.ajax({
       url:url,
       type:"post",
       dataType:"json",
       data:JSON.stringify(data) ,
       headers: {'Content-Type': 'application/json'},
       success: function (res) {
          if(res.code==200){
              _this.list_beh=res.data.list;
              _this.pages=res.data.pages;
          }
       }
     })
    },
    getlist_xw1(){  //教室和课程学生行为数据列表
      var url=this.testUrl+'api/v1/statistics/getTodayStudentBehaviorList';
      var data={
        	"name":this.key_name1,
        	"classroomId":this.$store.state.classroomId,
        	"curriculumId":this.$store.state.curriculumId,
        	"day":this.$store.state.date,
          "pageNum":this.page,
          "pageSize": 10
      }
      let _this=this;
     $.ajax({
       url:url,
       type:"post",
       dataType:"json",
       data:JSON.stringify(data) ,
       headers: {'Content-Type': 'application/json'},
       success: function (res) {
          if(res.code==200){
              _this.list_beh1=res.data.list;
              _this.pages=res.data.pages;
          }
       }
     })
    },
    getxingwei(){  //全校行为总数
      var url=this.testUrl+'api/v1/statistics/getTodayStudyBehavior';
      var data={
        	"behaviorTypeId": 0,
        	"classroomId":this.$store.state.classroomId,
        	"curriculumId":this.$store.state.curriculumId,
        	"day":this.$store.state.date
      }
      let _this=this;
     $.ajax({
       url:url,
       type:"post",
       dataType:"json",
       data:JSON.stringify(data) ,
       headers: {'Content-Type': 'application/json'},
       success: function (res) {
          if(res.code==200){
            if(res.data){
              _this.getdata4(res.data.sitDown,res.data.stand,res.data.notReadIng,res.data.readIng,res.data.notWriteIng,res.data.writeIng,res.data.notRaise,res.data.raise,res.data.notDiscuss,res.data.discuss,res.data.front,res.data.back,res.data.leftward,res.data.right);
              _this.getdata5(res.data.listen,res.data.notListen,res.data.lieOnTheTable,res.data.notLieOnTheTable,res.data.playMobilePhone,res.data.notPlayMobilePhone)
            }

          }
       }
     })
    },
    getdata2(teacherLate,teacherLeave,teacherLeaveEarly,teacherTruancy,teacherNormal){
       var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
           x:145,
           y:40,
          itemWidth: 6,   // 设置图例图形的宽
          itemHeight: 6,
          textStyle: {
            color: '#C4EAFE'  // 图例文字颜色
          },
          formatter: function(name) {
              // 获取legend显示内容
              let data = option.series[0].data;
              let total = 0;
              let tarValue = 0;
              for (let i = 0, l = data.length; i < l; i++) {
                  total += data[i].value;
                  if (data[i].name == name) {
                      tarValue = data[i].value;
                  }
              }
             let p=0;
             if(total==0){
              p=0
             }else{
               p = (tarValue / total * 100).toFixed(2);
             }
              return name + " " + " " + p + "%";
          },
        },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['30%', '40%'],
          center:['35%','40%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14',
              fontWeight: 'bold',
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: teacherLate, name: '迟到' },
            { value: teacherLeave, name: '请假' },
            { value: teacherLeaveEarly, name: '早退' },
            { value: teacherTruancy, name: '旷课' },
            { value: teacherNormal, name: '正常' },
          ],
          itemStyle: {
            normal: {
              color: function (colors) {
                var colorList = [
                  '#F8B551',
                  '#6EFFC3',
                  '#EA68A2',
                  '#6ED1FF',
                  '#EC6941'
                ];
                return colorList[colors.dataIndex];
              },
              }
            },
        }
      ]
  };
this.myChart2 = echarts.init(this.$refs.chart2);
this.myChart2.setOption(option);
},
    getdata3(studentLate,studentLeave,studentLeaveEarly,studentNormal,studentTruancy){ //学生考勤
               var option = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  orient: 'vertical',
                   x:135,
                   y:40,
                  itemWidth: 6,   // 设置图例图形的宽
                  itemHeight: 6,
                  textStyle: {
                    color: '#C4EAFE'  // 图例文字颜色
                  },
                  formatter: function(name) {
                      // 获取legend显示内容
                      let data = option.series[0].data;
                      let total = 0;
                      let tarValue = 0;
                      for (let i = 0, l = data.length; i < l; i++) {
                          total += data[i].value;
                          if (data[i].name == name) {
                              tarValue = data[i].value;
                          }
                      }
                     let p=0;
                     if(total==0){
                      p=0
                     }else{
                       p = (tarValue / total * 100).toFixed(2);
                     }
                      return name + " " + " " + p + "%";
                  },
                },
              series: [
                {
                  name: '',
                  type: 'pie',
                  radius: ['30%', '40%'],
                  center:['30%','40%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '14',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                   { value: studentLate, name: '迟到' },
                   { value: studentLeave, name: '请假' },
                   { value: studentLeaveEarly, name: '早退' },
                   { value: studentTruancy, name: '旷课' },
                   { value: studentNormal, name: '正常' },
                  ],
                  itemStyle: {
                    normal: {
                      color: function (colors) {
                        var colorList = [
                          '#F8B551',
                          '#6EFFC3',
                          '#EA68A2',
                          '#6ED1FF',
                          '#EC6941'
                        ];
                        return colorList[colors.dataIndex];
                      },
                      }
                    },
                }
              ]
          };
      this.myChart3 = echarts.init(this.$refs.chart3);
      this.myChart3.setOption(option);
    },
    getdata4(sitDown,stand,notReadIng,readIng,notWriteIng,writeIng,notRaise,raise,notDiscuss,discuss,front,back,leftward,right){
         var option = {
          legend: {},
          tooltip: {},
          grid: {
            left: '3%',
            right: '4%',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['坐下', '站立', '没阅读', '阅读', '没书写', '书写', '没举手', '举手', '没讨论', '讨论', '朝前', '朝后', '朝左', '朝右'],
            axisLine: {
            	lineStyle: {
            		color: '#C4EAFE',
            		width: 1, //这里是为了突出显示加上的
            	}
            },
             axisLabel: { //设置x轴的字
              show:true,
              interval:0,//使x轴横坐标全部显示
              formatter: function (params) {
                       var newParamsName = "";
                       var paramsNameNumber = params.length;
                       var provideNumber = 1;
                       var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                       if (paramsNameNumber > provideNumber) {
                         for (var p = 0; p < rowNumber; p++) {
                           var tempStr = "";
                           var start = p * provideNumber;
                           var end = start + provideNumber;
                           if (p == rowNumber - 1) {
                             tempStr = params.substring(start, paramsNameNumber);
                           } else {
                             tempStr = params.substring(start, end) + "\n";
                           }
                           newParamsName += tempStr;
                         }
                       } else {
                         newParamsName = params;
                       }
                       return newParamsName;
                     }
                   },

          },
          yAxis: {
            axisLine: {
            	lineStyle: {
            		color: '#C4EAFE',
            		width: 1, //这里是为了突出显示加上的
            	}
            },
            splitLine: {
            	show: true,
            	lineStyle: {
            		type: 'solid',
            		color: 'rgba(93,203,255,0.2)',
            	}
            },
          },
          series: [
                {
                  data: [sitDown,stand,notReadIng,readIng,notWriteIng,writeIng,notRaise,raise,notDiscuss,discuss,front,back,leftward,right],
                  itemStyle: {
                    normal: {
                  color: function (colors) {
                   var colorList = ['#FAE550', '#FAE550', '#93F7FF', '#93F7FF', '#D8FF61', '#D8FF61',
                          '#F28BED','#F28BED','#97C7FF', '#97C7FF', '#86FFB9', '#86FFB9', '#86FFB9', '#86FFB9',
                        ];
                        return colorList[colors.dataIndex];
                      },
                      }
                    },
                  barWidth:'40%',
                  type: 'bar',
                  showBackground: true,
                  backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                  }
                }
            ]
        };

      this.myChart4 = echarts.init(this.$refs.chart4);
      this.myChart4.setOption(option);
    },
    getdata5(listen,notListen,lieOnTheTable,notLieOnTheTable,playMobilePhone,notPlayMobilePhone){
         var option = {
          legend: {},
          tooltip: {},
          grid: {
            left: '3%',
            right: '4%',
            top: '10%',
            containLabel: true
          },
          yAxis: {
            type: 'category',
            data: ['听讲', '没听讲', '趴桌子', '没趴桌子', '玩手机', '没玩手机'],
            axisLine: {
            	lineStyle: {
            		color: '#C4EAFE',
            		width: 1, //这里是为了突出显示加上的
            	}
            },
             axisLabel: { //设置x轴的字
              show:true,
              interval:0,//使x轴横坐标全部显示
                },
          },
          xAxis: {
            axisLine: {
            	lineStyle: {
            		color: '#C4EAFE',
            		width: 1, //这里是为了突出显示加上的
            	}
            },
            splitLine: {
            	show: true,
            	lineStyle: {
            		type: 'solid',
            		color: 'rgba(93,203,255,0.2)',
            	}
            },
          },
          series: [
                {
                  data: [listen,notListen,lieOnTheTable,notLieOnTheTable,playMobilePhone,notPlayMobilePhone],
                  itemStyle: {
                    normal: {
                  color: function (colors) {
                   var colorList = ['#FAE550', '#FAE550',
                          '#F28BED','#F28BED', '#86FFB9', '#86FFB9',
                        ];
                        return colorList[colors.dataIndex];
                      },
                      }
                    },
                  barWidth:'40%',
                  type: 'bar',
                  showBackground: true,
                  backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                  }
                }
            ]
        };

      this.myChart5 = echarts.init(this.$refs.chart5);
      this.myChart5.setOption(option);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
.all{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  .item{
    width: 95%;
    height: 27vh;
    display: flex;
    justify-content: space-between;
    >div{
      width: 5.6rem;
      height: 100%;
      position: relative;
      .rt1{
        width: 100%;
        height: 25vh;
        display: flex;
        justify-content: space-between;
      }
      >.num{
        width: 100%;
        display: flex;
        justify-content: space-around;
        position: absolute;
        bottom:0.1rem;
        color: #fff;
      }
      >.title{
        display: flex;
        justify-content: space-around;
       position: relative;
       top: 0.1rem;
        >span{
          display: inline-block;
          width: 1.5rem;
          height: 0.32rem;
          line-height:0.32rem;
          background: rgba(14,35,75,0.8);
          border-left: 4px solid #3C6EAC;
          border-right: 4px solid #3C6EAC;
        }
      }
      >img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      >h4{
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: left;
        box-sizing: border-box;
        padding-left: 0.8rem;
      }
      >.title_c{
        width: 100%;
        display: flex;
        justify-content: space-between;
        >span:nth-child(2){
          display: inline-block;
          font-weight: 400;
          font-size: 0.14rem;
          display: flex;
          align-items: center;
          >span{
            display: inline-block;
            width: 0.6rem;
            height: 0.28rem;
            text-align: center;
            line-height: 0.28rem;
            border: 1px solid #3C6EAC;
            cursor: pointer;
            position: relative;
            z-index: 10;
          }
          >span:nth-child(1){
            border-radius: 0.16rem 0px 0px 0.16rem;
          }
          >span:nth-child(2){
             border-radius: 0px 0.16rem  0.16rem 0px;
          }
          .activ{
            background: #3C6EAC
          }
        }
      }
      >.search{
        >span:nth-child(2){
          position: relative;
          z-index: 1;
          height: 0.32rem;
          box-sizing: border-box;
          padding: 0 0.1rem;
          background: rgba(14,35,75,0.8);
          >input{
            height: 100%;
            background: rgba(14,35,75,0.8);
            border: none;
            color: #fff;
            width: 80%;
          }
          >img{
            margin-right: 0.1rem;
            cursor: pointer;
          }
          >input:focus{
            border: none !important;
          }
        }

      }
    }
    >.table{
      width: 100%;
    }
  }
  >.item:nth-child(1){
    position: relative;
    top: 0.1rem;
  }
  >.item:nth-child(2){
    position: relative;
    top: 0.05rem;
  }
}
.st_list{
  ul{
    width: 96%;
    margin: auto;
    font-size: 0.12rem;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0 0.03rem;
    li:nth-child(1),li:nth-child(5),{
      width: 11%;
    }
    li:nth-child(2),li:nth-child(3),li:nth-child(4),{
      width: 25%;
    }
  }
  .li_ti{
    background: rgba(0,52,114,0.8);
    align-items: center;
   padding: 0.1rem 0;
  }
  .i_list{
    li{
      padding: 0.06rem 0;
    }
  }
  .i_list:nth-child(2n){
      background: rgba(0,52,114,0.3);
      cursor: pointer;
  }
}
.xw_list{
  ul{
    li:nth-child(1),li:nth-child(5){
       width: 5%;
    }
    li:nth-child(2),li:nth-child(4){
       width: 10%;
    }
    li:nth-child(3){
      width:70%;
      >span{
        display: inline-block;
        border: 1px solid #2C62A5;
        background: rgba(44,98,165,0.6);
        color: #FFFFFF;
        padding: 0.05rem 0;
        margin: 0 0.04rem;
        width: 0.64rem;
      }
      >span:nth-last-child(1),>span:nth-last-child(2){
        border: 1px solid #F8B551;
        background: rgba(248,181,81,0.4);
      }
    }
  }
  .i_list{
    align-items: center;
  }

}
  .model{
    z-index: 3000;
    >.m_pic{
      position: absolute;
      //width: 100%;
      width:14rem;
      text-align: center;
      top: 10%;
      left: 50%;
      margin-left: -7rem;
    }
    >img{
      position: absolute;
      right:1.8rem;
      top:1rem;
      cursor: pointer;
       z-index: 3000;
    }
  }

 .video{
   width: 14rem;
   height: 7.88rem;
   background: #0D2147;
   border: 1px solid #3C6EAB;
   box-shadow: 0px 3px 1rem 0px rgba(43,90,181,0.3);
   position: fixed;
   top: 50%;
   left: 50%;
   margin-top: -3.6rem;
   margin-left: -7rem;
   z-index: 2000;
   box-sizing: border-box;
   padding: 0.2rem;
   >.ti{
     display: flex;
     justify-content: space-between;
     >img{
       width: 0.24rem;
       height: 0.24rem;
     }
   }
   .list{
     text-align: left;
     >div{
       width: 2rem;
       height: 1.1rem;
       border: 1px solid #3C6EAB;
       display: inline-block;
       margin: 0.1rem 0.34rem;
       >img{
         width: 100%;
         height: 100%;
       }
     }
   }
 }
 .pagination{
   position: absolute;
   width: 100%;
   bottom: 0.2rem;
   left:0;
 }
</style>
