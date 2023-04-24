<template>
  <div class="all">
     <div class="item">
        <div>
          <h4>今日上课情况统计</h4>
          <img src="../../assets/img_kuang1.png" alt="">
          <div id="chart1" ref="chart1" style="width:100%;height: 25vh;"></div>
          <div class="text">
            <p>今日总课程数 (节)</p>
            <h3>{{curse_all}}</h3>
          </div>
        </div>
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
     </div>
     <div class="item">
        <div>
          <h4>学习行为总次数情况统计</h4>
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
        <div>
          <h4 class="search"><span>行为数据智能感知趋势图</span>
          <el-form  label-width="80px" size='mini'>
              <el-form-item label="行为类型:" >
                  <el-select v-model="region" placeholder="请选择行为类型" style="width: 1.2rem;"  @change="selectChanged">
                     <el-option label="全部" value=0></el-option>
                     <el-option v-for="i,index in haviorType_list" :label="i.behaviorName" :value="i.behaviorType"></el-option>
                  </el-select>
                </el-form-item>
          </el-form>
          </h4>
           <img src="../../assets/img_kuang1.png" alt="">
           <div id="chart6" ref="chart6" style="width:100%;height: 25vh;"></div>
        </div>
        <div>
          <h4>学生听讲专注指数趋势图</h4>
           <img src="../../assets/img_kuang1.png" alt="">
           <div id="chart7" ref="chart7" style="width:100%;height: 25vh;"></div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      myChart1:'',
      myChart2:'',
      myChart3:'',
      myChart4:'',
      myChart5:'',
      myChart6:'',
      myChart7:'',
      region:'全部',
      st_all:0,
      te_all:0,
      curse_all:0,
      haviorType_list:[],
      behaviorType:0, timer:null
    }
  },
  created() {

  },
  computed:{
  		dataVal(){
  			return this.$store.state.date
  		}
  	},
  watch:{
    dataVal(newVal,oldVal){
      if(newVal!==oldVal){
          this.getsktj();
          this.getkaoqin();
          this.getxingwei();
          this.getTodayTrendBehavior();
          this.getleanTrend();
      }
      if(newVal!=this.initnowday()){
        clearInterval(this.timer);
        this.timer = null;
      }else{
        this.timer =setInterval(res=>{
        		this.getsktj();
        		this.getkaoqin();
        		this.getxingwei();
        		this.getTodayTrendBehavior();
        		this.getleanTrend();
        },60000)

      }

      // if(newVal!=this.initnowday()){
      //   clearInterval(this.timer);
      //   this.timer = null;
      // }else{
      //   this.timer =setInterval(res=>{
      //   	this.getsktj();
      //    // this.getkaoqin();
      //    // this.getxingwei();
      //    // this.getTodayTrendBehavior();
      //    // this.getleanTrend();
      //   },3000)
      // }
    }
  },
  mounted() {
     this.getBehaviorType();
     this.getsktj();
     this.getkaoqin();
     this.getxingwei();
     this.getTodayTrendBehavior();
     this.getleanTrend();

       this.timer =setInterval(res=>{
       	 this.getsktj();
         this.getkaoqin();
         this.getxingwei();
         this.getTodayTrendBehavior();
         this.getleanTrend();
       },60000)


    window.addEventListener('resize', ()=> {
    		this.myChart1.resize();
    		this.myChart2.resize();
    	  this.myChart3.resize();
        this.myChart4.resize();
        this.myChart5.resize();
        this.myChart6.resize();
        this.myChart7.resize();
    		// this.myChart4.resize();
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods:{
    getsktj(){  //今日上课情况统计
      var url=this.testUrl+'api/v1/statistics/getTodayClassBegins';
      var data={
        	"classroomId": "",
          "curriculumId": "",
          "name": "",
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
            _this.curse_all=res.data.beginingNum+res.data.endNum+res.data.noStartNum
            _this.getdata1(res.data)
          }
       }
     })
    },

    getkaoqin(){  //全校考勤情况
      var url=this.testUrl+'api/v1/statistics/getTodayAttendance';
      var data={
        	"behaviorTypeId": 0,
        	"classroomId": "",
        	"curriculumId": "",
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
    getxingwei(){  //全校行为总数
      var url=this.testUrl+'api/v1/statistics/getTodayStudyBehavior';
      var data={
        	"behaviorTypeId": 0,
        	"classroomId": "",
        	"curriculumId": "",
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
            _this.getdata4(res.data.sitDown,res.data.stand,res.data.notReadIng,res.data.readIng,res.data.notWriteIng,res.data.writeIng,res.data.notRaise,res.data.raise,res.data.notDiscuss,res.data.discuss,res.data.front,res.data.back,res.data.leftward,res.data.right);
            _this.getdata5(res.data.listen,res.data.notListen,res.data.lieOnTheTable,res.data.notLieOnTheTable,res.data.playMobilePhone,res.data.notPlayMobilePhone)
          }
       }
     })
    },
    getleanTrend(){  //学生听讲趋势
      var url=this.testUrl+'api/v1/statistics/getTodayStudentleanTrend';
      var data={
          "behaviorTypeId": 0,
          "classroomId": "",
          "curriculumId": "",
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
            _this.getdata7(res.data);
          }
       }
     })
    },
    getTodayTrendBehavior(){  //行为数据智能感知趋势图
      var url=this.testUrl+'api/v1/statistics/getTodayTrendBehavior';
      var data={
          "behaviorTypeId":Number(this.behaviorType),
          "classroomId": "",
          "curriculumId": "",
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
            _this.getdata6(res.data);
          }
       }
     })
    },
    getBehaviorType(){  //下拉选择-获取行为类型
      var url=this.testUrl+'api/v1/common/getBehaviorType';
      var data={}
      let _this=this;
     $.ajax({
       url:url,
       type:"post",
       dataType:"json",
       data:JSON.stringify(data) ,
       headers: {'Content-Type': 'application/json'},
       success: function (res) {
          if(res.code==200){
           _this.haviorType_list=res.data;
          }
       }
     })
    },
    selectChanged(value){
      this.behaviorType=value;
      this.getTodayTrendBehavior();
    },
    getdata1(data){
       var option = {
                title: {},
                tooltip: {
                  trigger: 'item'
                },
                 legend: {
                    orient: 'vertical',
                     x:310,
                     y:130,
                    itemWidth: 6,   // 设置图例图形的宽
                    itemHeight: 6,
                    textStyle: {
                      color: '#C4EAFE'  // 图例文字颜色
                    },
                     // formatter: function(name) {
                     //     // 获取legend显示内容
                     //     let data = option.series[0].data;
                     //     let total = 0;
                     //     let tarValue = 0;
                     //     for (let i = 0, l = data.length; i < l; i++) {
                     //         total += data[i].value;
                     //         if (data[i].name == name) {
                     //             tarValue = data[i].value;
                     //         }
                     //     }
                     //     let p = (tarValue / total * 100).toFixed(2);
                     //     return name + " " + " " + p + "%";
                     // },
                  },
                series: [
                  {
                    name: '',
                    type: 'pie',
                    radius: '48%',
                    center:['20%','40%'],
                    data: [
                      { value: data.beginingNum, name: '上课中课程数'},
                      { value: data.endNum, name: '已结束课程数'},
                      { value: data.noStartNum, name: '未开始课程数'}
                    ],
                    itemStyle: {
                      normal: {
                        color: function (colors) {
                          var colorList = [
                            '#13C631',
                            '#F8B551',
                            '#00A0E9',
                          ];
                          return colorList[colors.dataIndex];
                        },
                        }
                      },
                      label: {
                          normal: {
                            position: 'outer',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                            // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                            // {a}指series.name  {b}指series.data的name
                            // {c}指series.data的value  {d}%指这一部分占总数的百分比
                            formatter: '{c}'+'节'+'({d}%)'
                          }
                        },

                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'

                      }
                    }
                  }
                ]
              };
              this.myChart1 = echarts.init(this.$refs.chart1);
              this.myChart1.setOption(option);
            },
            getdata2(teacherLate,teacherLeave,teacherLeaveEarly,teacherTruancy,teacherNormal){  //教师考勤
               var option = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  orient: 'vertical',
                   x:140,
                   y:30,
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
    getdata3(studentLate,studentLeave,studentLeaveEarly,studentNormal,studentTruancy){  //学生考勤
               var option = {
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  orient: 'vertical',
                   x:130,
                   y:30,
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
    getdata4(sitDown,stand,notReadIng,readIng,notWriteIng,writeIng,notRaise,raise,notDiscuss,discuss,front,back,leftward,right){//行为数量
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

    ceilNumber(number){
      let bite = 0;
      if(number < 10){
        return 10;
      }
      while( number >= 10 ){
        number /= 10;
        bite += 1;
      }
      return Math.ceil(number) * Math.pow(10,bite);
    },

    getdata6(data){
      var attr=[data.eightNumCourse,data.tenNumCourse,data.twelveNumCourse,data.fourteenNumCourse,data.sixteenNumCourse,data.eighteenNumCourse,data.twentyNumCourse,data.twentyTwoNumCourse];
      var max_pj = this.ceilNumber(Math.ceil(Math.max.apply(null,attr)));
      var attr1=[data.eightNum,data.tenNum,data.twelveNum,data.fourteenNum,data.sixteenNum,data.eighteenNum,data.twentyNum,data.twentyTwoNum];
      var max_zs =this.ceilNumber(Math.max.apply(null,attr1));
       var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#0E234B'
            }
          }
        },
        legend: {
         // show:false,
          data: ['课时平均/次', '总数',],
          itemWidth: 8,   // 设置图例图形的宽
          itemHeight:8,
          textStyle: {
            color: '#C4EAFE'  // 图例文字颜色
          },
        },
        toolbox: {
          show:false,
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            axisLine: {
            	lineStyle: {
            		color: '#C4EAFE',
            		width: 1, //这里是为了突出显示加上的
            	}
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            min: 0,
            max:max_pj,
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
          {
            type: 'value',
            position: 'right',
            min: 0,
            max: max_zs,
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
        ],
        series: [{
							name: '课时平均/次',
							type: 'line',
//							yAxisIndex: 1,
							interval:50,
							smooth:true,
							symbol:'none',
							stack: '总量',
              areaStyle: {
              	normal: {
              		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              				offset: 0,
              				color: 'rgba(248,181,81,0.9)'
              			},
              			{
              				offset: 0.5,
              				color: 'rgba(248,181,81,0.5)'
              			},
              			{
              				offset: 1,
              				color: 'rgba(248,181,81,0)'
              			}
              		])
              	},

              },
							itemStyle:{
				                normal:{
				                    color:'#F8B551',//折线的颜色
				                    width:'1'//折线粗细
				                }
				            },
							data: [data.eightNumCourse,data.tenNumCourse,data.twelveNumCourse,data.fourteenNumCourse,data.sixteenNumCourse,data.eighteenNumCourse,data.twentyNumCourse,data.twentyTwoNumCourse]
						},
						{
							yAxisIndex: 1,
							name: '总数',
							type: 'line',
							interval:50,
							smooth:true,
							symbol:'none',
							stack: '总量',
              areaStyle: {
              	normal: {
              		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              				offset: 0,
              				color: 'rgba(110,255,195,0.9)'
              			},
              			{
              				offset: 0.5,
              				color: 'rgba(110,255,195,0.5)'
              			},
              			{
              				offset: 1,
              				color: 'rgba(110,255,195,0)'
              			}
              		])
              	},

              },
							itemStyle:{
				                normal:{
				                    color:'#6EFFC3',//折线的颜色
				                    width:'1'//折线粗细
				                }
				            },
							data: [data.eightNum,data.tenNum,data.twelveNum,data.fourteenNum,data.sixteenNum,data.eighteenNum,data.twentyNum,data.twentyTwoNum]
						},

					]

      };
      this.myChart6= echarts.init(this.$refs.chart6);
      this.myChart6.setOption(option);
    },
    getdata7(data){ //听讲趋势
       var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#0E234B'
            }
          }
        },
        legend: {
          show:false,
        },
        toolbox: {
          show:false,
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
              data: ['8:00', '10:00','12:00', '14:00','16:00', '18:00','20:00','22:00'],
            axisLine: {
            	lineStyle: {
            		color: '#C4EAFE',
            		width: 1, //这里是为了突出显示加上的
            	}
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
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

        ],
        series: [
          {
            name: '',
            type: 'line',
            stack: 'Total',
            symbol: 'emptyCircle',
            itemStyle:{
              color:'#fff'
            },
            areaStyle: {
            	normal: {
            		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            				offset: 0,
            				color: 'rgba(93,203,255,0.9)'
            			},
            			{
            				offset: 0.5,
            				color: 'rgba(93,203,255,0.5)'
            			},
            			{
            				offset: 1,
            				color: 'rgba(93,203,255,0)'
            			}
            		])
            	},

            },
            emphasis: {
              focus: 'series'
            },
            data: [data.eightNum,data.tenNum,data.twelveNum,data.fourteenNum,
            data.sixteenNum,data.eighteenNum,data.twentyNum,data.twentyTwoNum],
           // data: [data.eightNum,data.nineNum,data.tenNum,data.elevenNum,data.twelveNum,data.thirteenNum,data.fourteenNum,data.fifteenNum,
           // data.sixteenNum,data.seventeenNum,data.eighteenNum,data.nineteenNum,data.twentyNum,data.twentyOneNum,data.twentyTwoNum],
            lineStyle: {
                color: '#C4EAFE',
                width:1
            },
          },
        ]
      };
      this.myChart7 = echarts.init(this.$refs.chart7);
      this.myChart7.setOption(option);
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
  >.item{
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
        padding-left: 0.8rem;
      }
      >.search{
        width: 100%;
        display: flex;
        justify-content: space-between;
        z-index: 100;
        position: relative;
        box-sizing: border-box;
        align-items: center;
        .el-form-item{
          margin-bottom: 0.1rem;
          margin-right: 0.1rem;
        }
      }
      >.text{
        position: absolute;
        right:0.2rem;
        top: 0.8rem;
        border: 1px solid #3C6EAC;
        background: rgba(14,35,75,0.6);
        padding: 0.1rem 0.05rem;
        >p{
          font-size: 0.14rem;
          margin-bottom: 0.1rem ;
        }
      }
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
</style>
