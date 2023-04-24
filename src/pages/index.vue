<template>
  <div class="index">
      <img  src="../assets/sx.png" style="cursor: pointer;max-width:40px;position: absolute;left:34%;top: 0.7rem;z-index: 999;" @click="onload()" alt="">
      <div class="lt">
          <div @click="show=!show" class="bulde">
            <div style="position: absolute;top:2rem;left: -0.1rem;">
              <el-form  label-width="80px" size='mini'>
                  <el-form-item label="楼区:" >
                      <el-select v-model="region" placeholder="请选择楼区" style="width: 1.2rem;"  @change="selectChanged">
                         <el-option v-for="i,index in haviorType_list" :label="i.Name" :value="i.Type"></el-option>
                      </el-select>
                    </el-form-item>
              </el-form>
            </div>

            <img src="../assets/img_house2.png" alt=""  >

            <div class="pics">
              <img  v-for="i,index in Roomlist.slice(0,18)"  :key='index' :title="i.classRoomName" :src= 'i.status==1?pics[1]:pics[0]' @click="classroom(i.classRoomId,i.classRoomName)"  alt="">
            </div>
            <div class="left">
              <b>教室使用情况</b>
              <p>已使用教室：<span>{{use_list.length}}</span>间</p>
              <p>未使用教室：<span>{{60-use_list.length}}</span>间</p>
              <div  v-if="$store.state.classroomName">
                <b>{{$store.state.classroomName}}</b>
                <p>今日课程：<span>{{list_corse.length}}</span>节</p>
              </div>
            </div>

          </div>
          <div class="bulde">
            <div style="position: absolute;top:2rem;left: -0.1rem;">
              <el-form  label-width="80px" size='mini'>
                  <el-form-item label="楼区:" >
                      <el-select v-model="type_zy" placeholder="请选择楼区" style="width: 1.2rem;">
                         <el-option label="致用楼-C" value='5'></el-option>
                      </el-select>
                    </el-form-item>
              </el-form>
            </div>

            <img src="../assets/img_house.png" alt="">
            <div class="pics">
              <img  v-for="i,index in Roomlist_zy.slice(0,18)"  :key='index'  :title="i.classRoomName"  :src= 'i.status==1?pics[1]:pics[0]' @click="classroom(i.classRoomId,i.classRoomName)" alt="">
            </div>
     <!--       <div class="left"  v-if="$store.state.classroomName">
              <b>{{$store.state.classroomName}}</b>
              <p>今日课程：<span>{{list_corse.length}}节</span></p>
            </div> -->
          </div>
          <div class="right">
             <p>课程表--{{$store.state.classroomName?$store.state.classroomName:'教室名称'}}</p>
             <div>
              <!-- <img src="../assets/x.png" alt=""> -->
               <ul>
                 <li v-if="list_corse.length&&$store.state.classroomId" v-for="i,index in list_corse" :key='index'
                  :style="{background:$store.state.curriculumId==i.courseScheduleId?'#043A7F':''}"
                  @click="coursedel(i.courseScheduleId,i.courseName)">时间:{{i.startTime}}~{{i.endTime}} {{getstr(i.courseName,5) }}<span class="choose" v-show="$store.state.curriculumId==i.courseScheduleId">√</span> <span  :class="i.courseHandleStatus==1?'skz stu':i.courseHandleStatus==0?'stu':'stu yjs'">{{i.courseHandleStatus==1?'上课中':i.courseHandleStatus==0?'未开始':'已结束'}}</span>
                    <!-- <img v-show="i.courseHandleStatus!=0" src="../assets/icon_bf.png"/> -->
                   </li>
                 <li v-if="!list_corse.length||!$store.state.classroomId" v-for="i,index in list" :key='index'>{{i.courseName}}<span class="choose"></span> <span  :class="i.courseHandleStatus==1?'skz stu':i.courseHandleStatus==0?'stu':'stu yjs'">{{i.courseHandleStatus==1?'上课中':i.courseHandleStatus==0?'未开始':'已结束'}}</span></li>
               </ul>
             </div>
           </div>
           <div style="position: absolute;bottom: 1.2rem;left:-6% ;text-align: center;width: 100%;">
             <el-button type="primary" style="margin:  0 0.4rem;" @click="show_dialog(1)">实时巡课</el-button>
            <el-button type="primary" style="margin:  0 0.4rem;" @click="show_dialog(2)">录像巡课</el-button>
           </div>
      </div>
      <div class="rt">
        <Right v-if="$store.state.type==1"></Right>
        <Right1 v-if="$store.state.type==2"></Right1>
      </div>
      <el-dialog
        :title="type_dialog==1?'实时巡课':'录像巡课'"
        :visible.sync="dialog"
        width="80%"
        height='100vh'
        :lock-scroll=false
        custom-class='concat'
        :before-close="handleClose"
       >
       <iframe :src="video_url" frameborder="0"></iframe>
      </el-dialog>

  </div>
</template>

<script>
  import Right from '../components/index/right.vue'
  import Right1 from '../components/index/right1.vue'
  export default {
    name: 'index',
    components: {
      Right,
      Right1
    },
    data() {
      return {
        video_url:'',
        type_dialog:1,
        dialog:false,
         show:false,
         pics:[
           require('../assets/hei.png'), require('../assets/huang.png'),
         ],
         Roomlist:[],
         Roomlist_zy:[],
         type_mx:1,
         region:'敏学楼-B',
         type_zy:'致用楼-C',
         haviorType_list:[
           {'Name':'敏学楼-B','Type':1},
           {'Name':'敏学楼-C','Type':2},
           {'Name':'敏学楼-D','Type':3},
           {'Name':'敏学楼-E','Type':4},
         ],
        list:[
          {courseName:'第一节',courseHandleStatus:0,v:1},
          {courseName:'第二节',courseHandleStatus:0,v:1},
          {courseName:'第三节',courseHandleStatus:0,v:2},
          {courseName:'第四节',courseHandleStatus:0,v:3},
          {courseName:'第五节',courseHandleStatus:0,v:3},
          {courseName:'第六节',courseHandleStatus:0,v:3},
          {courseName:'第七节',courseHandleStatus:0,v:3},
          {courseName:'第八节',courseHandleStatus:0,v:3},
          {courseName:'第九节',courseHandleStatus:0,v:3},
        ],
        list_corse:'',
        use_num:0,
        timer:null,
        use_list:[]
      }
    },
    created() {
      this.getdata1();
      this.getdata();
     // this.getUrl();
      this.getzyl();//致用楼
        this.timer =setInterval(res=>{
           this.getdata();
           this.getdata1();
           this.getzyl();//致用楼
      },60000)
    },
    computed:{
    		dataVal(){
    			return this.$store.state.date
    		}
    	},
    watch:{
      dataVal(newVal,oldVal){
        if(newVal!==oldVal){
          this.getdata1();//刷新
          this.getdata();
          this.getzyl();//致用楼
          this.getcorse();
        }
        if(newVal!=this.initnowday()){
          clearInterval(this.timer);
          this.timer = null;
        }else{
          this.timer =setInterval(res=>{
          		this.getdata1();//敏学楼
              this.getdata();
          },60000)

        }
      }
    },
    mounted() {

    },
    beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
		},
    methods: {
      show_dialog(type){ //巡课
      var url=this.testUrl+'/api/v1/common/getUrl';
      var data={
        type:type
      }
        let _this=this;
        $.post(url,data,function(res){
        			 if(res.code==200){
                _this.video_url=res.data;
                 window.open(res.data)
        			 }
          });
      },
      show_dialog_2(){

      },
      handleClose(){
        this.dialog=false
      },
      selectChanged(val){ //筛选敏学楼
        this.type_mx=val;
        this.getdata1();
      },
      getdata1(){  //筛选教室
        var url=this.testUrl+'api/v1/common/getRoomListByType/'+this.type_mx;
        var data={
          "day":this.$store.state.date,
          "type":this.type_mx
        }
          let _this=this;
          $.post(url,data,function(res){
          			 if(res.code==200){
                   _this.Roomlist=res.data;
          			 }
            });
      },
      getUrl(){  //巡检视频
        var url=this.testUrl+'/api/v1/common/getUrl';
        var data={}
          let _this=this;
          $.post(url,data,function(res){
          			 if(res.code==200){
                  _this.video_url=res.data;
          			 }
            });
      },
      onload(){ //刷新
      this.$router.go(0);
      return false;
        this.$store.state.type=1;
        this.$store.state.classroomId='';
        this.$store.state.classroomName='';
        this.$store.state.curriculumId='';
        this.$store.state.courseName='';
        this.type_mx=1;
        this.region='敏学楼-B';
        this.getdata1();

      },
      getzyl(){  //筛选致用楼
      console.log(this.$store.state.date)
        var url=this.testUrl+'api/v1/common/getRoomListByType/5';
        var data={
          "day":this.$store.state.date,
          "type":5
        }
          let _this=this;
          $.post(url,data,function(res){
          			 if(res.code==200){
                   _this.Roomlist_zy=res.data;

          			 }
            });
      },
      getdata(){  //全校教室使用情况
        var url=this.testUrl+'api/v1/statistics/getRoomSituation';
        var data={
          "day":this.$store.state.date
        }
          let _this=this;
          $.post(url,data,function(res){
          			 if(res.code==200){
                   _this.use_num=res.data.filter((i)=>{
                     return i.status==1;
                   })
                   _this.use_list=res.data;
          			 }
            });
      },
      getcorse(){  //课表
        var url=this.testUrl+'api/v1/statistics/getStudentClassBegins';
         var data={
           	"classRoomId":this.$store.state.classroomId,
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
               var list=res.data;
               // for(var i=0;i<list.length;i++){
               //   if(list[i].startTime.slice(0,2)<='12'){
               //     _this.morning.push(list[i])
               //   }else if(list[i].startTime.slice(0,2)<='17' && list[i].startTime.slice(0,2)>='13'){
               //      _this.noon.push(list[i])
               //   }else{
               //      _this.night.push(list[i])
               //   }

               // }
                 _this.list_corse=res.data
             }
          }
        })
      },
        classroom(classroomId,classRoomName){ //教室
           this.$store.state.classroomId=classroomId;
           this.$store.state.type=2;
            this.$store.state.classroomName=classRoomName;
           this.$store.state.curriculumId='';
           this.$store.state.courseName='';
           this.getcorse();
        },
        coursedel(courseScheduleId,courseName){ //课表
          this.$store.state.type=2;
          this.$store.state.curriculumId=courseScheduleId;
          this.$store.state.courseName=courseName;
        }
			}

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	iframe{
		width: 100%;
		height: 700px;
	}
	.concat .el-dialog__body{
		padding: 0
	}
  /deep/.el-dialog{
    margin-top: 5vh !important;
  }
.index{
  display: flex;
  justify-content: space-between;
  >.lt{
    position: relative;
    height: 100vh;
    width: 33%;
    >.bulde{
      width: 100%;
      height: 6rem;
      position: relative;
      >img{
        width: 100%;
        height: 100%;
      }
      >.pics{
        position: absolute;
        top:40%;
        // left:47.5%;
        //width: 0.24rem;
         width: 0.4rem;
         left:46.3%;
        display: flex;
        flex-wrap: wrap;
        >img{
          width: 0.12rem;
          margin-top: 0.02rem;
          cursor: pointer;
        }

        >img:nth-child(3n+5),>img:nth-child(2){
            position: relative;
            top: -0.09rem;
            left: 0.05rem;
        }
        >img:nth-child(3n){
            position: relative;
            top: -0.18rem;
            left: 0.1rem;
        }
        // >img:nth-child(2n){
        //   position: relative;
        //   top: -0.11rem;
        //   left: 0.1rem;
        // }
        // >img:nth-child(3n){
        //   position: relative;
        //   top: -0.11rem;
        //   left: 0.1rem;
        // }

      }
      >.left{
        position: absolute;
       right:-0.4rem;
        top:35%;
        text-align: left;
        width: 1.43rem;
        height: 1.42rem;
        background-image: url('../assets/img_louk.png');
        background-size: 100%;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding: 0.1rem;
        font-size: 0.14rem;
        p{
          padding: 0.05rem 0;
          >span{
            color:#FFF8AC;
          }
        }
      }
    }
     >div:nth-child(1){
        top: -1rem;
     }
     >div:nth-child(2){
       position: absolute;
       left: 0;
       bottom: 0.6rem;
     //  top: -2.5rem;
     }
     >.right{
       position: absolute;
       right:-0.4rem;
       top:35%;
       >p{
         font-weight: bold;
         position: relative;
          text-align: center;
          border-bottom: 0.09rem solid rgba(0,114,255,0.4);
          margin-bottom: 0.1rem;
       }
       // >p::after{
       //   content: '';
       //   width: 1.32rem;
       //   height: 0.08rem;
       //   background:rgba(0,114,255,0.4);
       //   position: absolute;
       //   bottom: -0.06rem;
       //   left:0.03rem;
       // }
       >div{
         display: flex;
         >ul{
         //  margin-top: 0.15rem;
           >li{
             font-size: 0.16rem;
             padding: 0 0.02rem;
             text-align: left;
              height: 0.3rem;
              display: flex;
              align-items: center;
             cursor: pointer;
             img{
               vertical-align: bottom;
             }
             >.stu{
               display: inline-block;
               width: 0.54rem;
               height: 0.2rem;
               border: 1px solid #00A0E9;
               border-radius: 0.2rem;
               font-size: 12px;
              // color: #00A0E9;
               text-align: center;
               margin-left: 0.05rem;
             }
             >.choose{
               display: inline-block;
               margin: 0 0.02rem;
             }
             &:hover{
               background: #043A7F;
             }
           }
           // >li:nth-child(5){
           //    margin-top: 0.04rem;
           // }
           // >li:nth-child(6){
           //    position: relative;
           //    top: 0.02rem;
           // }
           .activ{
             color: #FFFFFF;
             background:#043A7F;
           }
         }
       }
       .skz{
         border: 1px solid #13C631 !important;
         color: #13C631;
       }
       .yjs{
          color: #F8B551;
           border: 1px solid #F8B551 !important;
       }
     }
  }
  .rt{
    height: 90vh;
    width: 63%;
    position: absolute;
    bottom: 0.1rem;
    right: 0;
  }
}
</style>
