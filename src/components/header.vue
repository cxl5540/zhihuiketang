<template>
  <div class="header">
      <p>智慧课堂行为追溯可视化平台</p>
      <div class="title" style="z-index: 100;">
         <div style="position: relative;">
            <div>日期：
            <el-date-picker
              v-model="date_val"
              type="date"
              placeholder="选择日期"
               value-format="yyyy-MM-dd"
              @change='changedate'
              >
            </el-date-picker> </span></div>
            <span>当前时间：{{this.nowTime}} 星期{{week}}</span>
          <!--  <img  src="../assets/sx.png" style="cursor: pointer;max-width:40px;position: absolute;right:-0.7rem;" @click="onload()" alt=""> -->
         </div>
         <div>
           <span>当前统计：<span @click="all()">全校数据统计</span><span v-if="$store.state.classroomName" @click="changeclass()"> >{{$store.state.classroomName}}</span><span v-if="$store.state.courseName"> >{{ $store.state.courseName}}</span></span>
           <span @click="showpic()" style="cursor: pointer;z-index: 10;">行为巡检</span>
         </div>
      </div>
      <div class="video" v-show="show">
          <div class="ti">
            <span style="font-size: 0.2rem;display: inline-block;width: 2rem;line-height: 40px;"> <img src="../../src/assets/icon_jt.png" alt=""> 行为巡检 </span>
            <div style="display: flex; margin-right: 0.2rem;">
              <el-form  label-width="60px" >
                  <el-form-item label="教室:" >
                      <el-select v-model="region" placeholder="请选择教室"  @change="selectChanged">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i,index in room_list" :label="i.classRoomName" :value="i.classRoomId"></el-option>
                      </el-select>
                    </el-form-item>
              </el-form>
              <el-form  label-width="60px" >
                  <el-form-item label="课程:" style="width: 3rem;" >
                      <el-select v-model="region1" placeholder="请选择课程" @change="selectcurriculumId">
                      <el-option label="全部" value=""></el-option>
                       <el-option v-for="i,index in course_list" :label="'时间:'+i.startTime+'~'+i.endTime+' '+ i.courseName" :value="i.courseId"></el-option>
                      </el-select>
                    </el-form-item>
              </el-form>
              <el-form  label-width="60px" >
                  <el-form-item label="行为:" >
                      <el-select v-model="region2" placeholder="请选择行为" @change="selectChanged_type">
                      <el-option label="全部" value=0></el-option>
                      <el-option v-for="i,index in haviorType_list" :label="i.behaviorName" :value="i.behaviorType"></el-option>
                      </el-select>
                    </el-form-item>
              </el-form>
              <!-- <el-form  label-width="60px" >
                  <el-form-item label="时间:" >
                      <el-time-picker
                          is-range
                          v-model="value1"
                          @change="gettime"
                          value-format="HH:mm:ss"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围">
                        </el-time-picker>

                    </el-form-item>
              </el-form> -->
              <el-form  label-width="60px" >
                  <el-form-item label="姓名:" >
                      <el-input type="text" v-model="key_name" placeholder="输入姓名"></el-input>
                    </el-form-item>
              </el-form>
              <el-form  style="margin-left: 0.3rem;" >
                   <el-button @click="search"   type="primary">搜索</el-button>
              </el-form>
            </div>
            <img src="../../src/assets/icon_close.png"  @click="show=false"/>
          </div>
          <div class="list">
             <div v-for="i,index in urllist" :key=index style="position: relative;"  @click="showmodel(i.pic,i.snapHumanUrl,i.headOnDesk,i.listening)">
                 <!-- <el-image
                    style="width: 2rem; height: 1.1rem"
                    :src="i.pic"
                    :preview-src-list="srcList">
                  </el-image> -->
                   <img :src="i.pic" alt="" style="max-width: 13rem;">
                  <img :src="i.snapHumanUrl" style="position: absolute;top: 0;left: 0;max-width: 0.8rem;max-height: 0.8rem;"/>
                  <div style="position: absolute;bottom: 0;right: 0;">
                    <el-tag size="mini">{{i.headOnDesk=='no'?'没趴桌子':i.headOnDesk=='yes'?'趴桌子':'未知'}}</el-tag>
                    <el-tag size="mini" type="success">{{i.listening=='no'?'没听讲':i.listening=='yes'?'听讲':'未知'}}</el-tag>
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
             <img src="../assets/icon_close.png" @click="show_m=false" alt="">
          </div>
          <div class="pagination">
            <el-pagination
              background
              @current-change=changpage
              layout="prev, pager, next"
              :total="pages*10">
            </el-pagination>
          </div>

      </div>
  </div>
</template>

<script>
  export default {
    name: 'newslist',
    data() {
      return {
        value1:'',
        key_name:'',
        show_m:false,
        region:'全部',
        region1:'全部',
        region2:'全部',
        show:false,
        date_val:'',
        week:'',
        room_list:'',
        course_list:'',
        nowTime: new Date(),
        page:1,
        urllist:'',
        srcList:[],
        haviorType_list:[],
        pages:0,
        classRoomId:'',
        courseId:'',
        behaviorType:0,
        pic_url:'',
        snapHumanUrl:'',
        headOnDesk:'',
        listening:''
      }
    },
    created() {
      this.date_val=this.initnowday();
      this.$store.state.date=this.initnowday();
      this.week="日一二三四五六".charAt(new Date().getDay());

    },
    mounted() {
      var this_ = this; //声明一个变量代表this，保证this的指向正确
       this.setTime = setInterval(function() {  //使用定时器，每一秒执行一次
         this_.nowTime = //将获取的时间戳转换成日常的时间格式
           // new Date().getFullYear() + "-" +
           // this_.appendZero((new Date().getMonth() + 1)) + "-" +
           // this_.appendZero(new Date().getDate()) + " " +
           this_.appendZero(new Date().getHours()) + ":" +
           this_.appendZero(new Date().getMinutes()) + ": " +
           this_.appendZero(new Date().getSeconds());
       }, 1000);
       this.getBehaviorType();
       this.getRoomData()
    },
    beforeDestroy: function() {
    // if (this.setTime) {
    //   clearInterval(this.setTime);
    // }
    },
    methods: {
      showmodel(bkgUrl,snapHumanUrl,headOnDesk,listening){//巡检
        this.pic_url=bkgUrl;
        this.snapHumanUrl=snapHumanUrl;
        this.headOnDesk=headOnDesk;
        this.listening=listening;
        this.show_m=true;
      },
      changpage(val){
        this.page=val;
        this.getPic()
      },
      gettime(){
        console.log(this.value1)
      },
      getRoomData(){  //下拉选择-获取教室信息
        var url=this.testUrl+'api/v1/common/getRoomData';
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
             _this.room_list=res.data;
            }
         }
       })
      },
      onload(){ //刷新
        this.all()
      },
      showpic(){
        this.show=true;
        this.getPic();
      },
      search(){  //搜索
        this.page=1;
        this.getPic();
      },
      getPic(){  //获取图片
        var url=this.testUrl+'api/v1/statistics/getPic';
        var data={
          	"behaviorTypeId":Number(this.behaviorType),
          	"classroomId":this.classRoomId,
            "curriculumId":this.courseId,
            "pageNum": this.page,
            "pageSize": 24,
          	"day":this.$store.state.date,
            "key": "",
            "value": "",
            "name":this.key_name
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
              _this.urllist=res.data.list
              var sttr=[];
              for(var i=0;i<_this.urllist.length;i++){
                sttr.push(_this.urllist[i].pic)
              }
              _this.srcList=sttr;
              _this.pages=res.data.pages;
            }
         }
       })
      },
      selectChanged_type(value){
        console.log(value)
        this.behaviorType=value;
        this.getPic();
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
      getCourseData(classRoomId){  //下拉选择-根据教室编号获取课程信息
        var url=this.testUrl+'api/v1/common/getCourseData';
        var data={
          "classRoomId":classRoomId,
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
             _this.course_list=res.data;
            }
         }
       })
      },
      selectcurriculumId(value){ //课程
        this.courseId=value;
        this.getPic()
      },
      selectChanged(value){//教室
      console.log(value)
        var classRoomId=value;
        this.region1='全部';
         this.region2='全部';
        this.courseId='';
        this.getCourseData(value);
        this.classRoomId=value;
        this.getPic()
      },
      changedate(date){
        this.date_val=date;
        this.$store.state.date=date;
        console.log(this.$store.state.date)
        this.getPic()
      },
      all(){
        this.$store.state.type=1;
        this.$store.state.classroomId='';
        this.$store.state.classroomName='';
        this.$store.state.curriculumId='';
        this.$store.state.courseName='';
      },
      changeclass(){
        this.$store.state.curriculumId='';
        this.$store.state.courseName='';
      },
      appendZero(time){
        if (time < 10) {
          return "0" + time;
        }else {
          return time;
        }
      },
    }
  }

</script>

<style scoped lang="less">
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
.header{
  height: 1rem;
  width: 100%;
  background-image: url('../assets/img_top.png');
  background-size: cover;
  >p{
    font-weight: bold;
    font-size: 0.32rem;
    position: relative;
    top: 0.28rem;
  }
  >.title{
    width: 94%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 0.26rem;
    >div:nth-child(1){
      color: #A2D8F4;
      >span{
        display: inline-block;
        width: 2.8rem;
        height: 0.42rem;
        line-height:0.42rem;
        background: #0E234B;
        border: 1px solid #3C6EAC;
        margin-left: 0.1rem;
      }
      >div{
        display: inline-block;
        >span{
          display: inline-block;
          width: 2.74rem;
          height: 0.42rem;
          line-height:0.42rem;
          background: #0E234B;
          border: 1px solid #3C6EAC;
          >img{
            vertical-align: sub;
            margin-left: 0.2rem;
          }
        }
      }
    }
    >div:nth-child(2){
      >span{
        display: inline-block;
        height: 0.42rem;
        line-height:0.42rem;
        background: #0E234B;
        border: 1px solid #3C6EAC;
      }
      >span:nth-child(1){
        min-width: 4rem;
        padding: 0 0.1rem;
        margin-right: 0.1rem;
        >span{
          color: #FFBF59 ;
          cursor: pointer;
        }
      }
      >span:nth-child(2){
        width:1.66rem;
      }
    }
  }
  .video{
    width: 17rem;
    height: 8rem;
    background: #0D2147;
    border: 1px solid #3C6EAB;
    box-shadow: 0px 3px 1rem 0px rgba(43,90,181,0.3);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -4rem;
    margin-left: -8.5rem;
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
        margin:0.16rem 0.36rem;
        >img{
          width: 100%;
          height: 100%;
        }
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
