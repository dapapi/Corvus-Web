<template>
    <div class="page detail">
        <div class="page-main" style="background-color:#f3f4f5" v-for="item in list" :key="item.id">
            <div class="page-header  page-header-bordered mb-0">
                <h6 class="page-title nav-head">{{item.title}}
                    <template v-if="item.type==0">
                        <span class="approved">已审批</span>
                    </template>
                    <template v-if="item.type==1">
                        <span class="pending">待审批</span>
                    </template>
                    <template v-if="item.type==2">
                        <span class="revoke">已撤销</span>
                    </template>
                    <template v-if="item.type==3">
                        <span class="cancel">已作废</span>
                    </template>
                    <template v-if="item.type==4">
                        <span class="refuse">已拒绝</span>
                    </template>
                </h6>
            </div>
            <div class="page-header  page-header-bordered m-20 pl-10">
                <h6 class="page-title title-status">当前状态<em></em><span>待测试审批</span>
                    <i v-if="item.type==0">
                        <button class="btn btn-primary">作废</button>
                    </i>
                    <i v-if="item.type==1">
                        <button class="btn btn-primary">撤销</button>
                        <button class="btn btn-danger" type="submit" 
                                data-toggle="modal" data-target="#addProject">提醒
                        </button>
                    </i>
                    <i v-if="item.type==2">
                        <button class="btn btn-primary">重新提交</button>
                    </i>
                    <i v-if="item.type==3">
                        <button class="btn btn-primary">重新提交</button>
                    </i>
                    <i v-if="item.type==4">
                        <button class="btn btn-primary">作废</button>
                    </i>
                </h6>
            </div>
            <div class="page-content container-fluid mt-20">
                <div class="panel col-md-12 col-lg-12 pb-10">
                    <div class="caption">
                        <h6 class="page-title">{{item.caption}}</h6>
                        <span>编号：{{item.number}}</span>
                    </div>
                    <div class="content" style="border-bottom:1px dashed #ccc">
                        <p class="py-10 pl-20"><span>申请人<em></em><i>{{item.applicant}}</i></span><b >部门<i class="p-10">{{item.department}}</i></b></p>
                        <p class="py-10 pl-20"><span>部门<i class="p-10">{{item.fieldlocation}}</i></span><b >申请时间<i class="p-10">{{item.time}}</i></b></p>
                    </div>
                    <div class="content">
                        <p class="py-10 pl-20"><span>外勤地点<i class="p-10">{{item.fieldlocation}}</i></span><b >外勤天数<i class="p-10">{{item.fieldDays}}天</i></b></p>
                        <p class="py-10 pl-20"><span>开始时间<i class="p-10">{{item.startTime}}</i></span><b>结束时间<i class="p-10">{{item.endTime}}</i></b></p>
                        <p class="py-10 pl-20"><span>外勤事由<i class="p-10">{{item.fieldwork}}</i></span><b >附件<i class="p-10">{{item.department}}</i></b></p>
                    </div>
                    
                </div>
                <div class="panel col-md-12 col-lg-12">
                    <div class="caption" style="border:0;">
                        <h6 class="page-title pb-20" style="border-bottom:1px solid #ccc">审批流程</h6>
                        <div class="setp pt-20">
                            <div class="left col-md-2">
                                <em><i class="icon md-check-circle pr-5" style="color:#4DAF50"></i></em>
                                <div class="left-cont">
                                    <b class="branch">泰洋系</b>
                                    <b class="type" style="color:#999">提交审批</b>
                                </div>
                            </div>
                            <div class="middle col-md-2">
                                <template v-if="item.type==0">
                                    <em><i class="icon md-check-circle pr-5" style="color:#4DAF50"></i></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">待审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==1">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">待审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==2">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">待审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==3">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">已审批</b>
                                    </div>
                                </template>
                                <template v-if="item.type==4">
                                    <em></em>
                                    <div class="middle-cont">
                                        <b class="branch">泰洋系</b>
                                        <b class="type" style="color:#999">已拒绝</b>
                                    </div>
                                </template>
                                
                            </div>
                             <div class="right col-md-2">
                                <template v-if="item.type==0">
                                    <div class="right-cont" style="color:#4DAF50">
                                        <i class="icon md-check-circle pr-5"></i>
                                        <b>审批通过</b>
                                    </div>
                                </template>
                                <template v-if="item.type==1">
                                    <div class="right-cont" style="color:#E0E0E0">
                                        <i class="icon md-check-circle pr-5"></i>
                                        <b>审批通过</b>
                                    </div>
                                </template>
                                <template v-if="item.type==2">
                                    <div class="right-cont">
                                        <i class="icon md-close-circle pr-5"></i>
                                        <b>已撤回</b>
                                    </div>
                                </template>
                                <template v-if="item.type==3">               
                                    <div class="right-cont">
                                        <i class="icon md-close-circle pr-5"></i>
                                        <b>已作废</b>
                                    </div>
                                </template>
                                <template v-if="item.type==4">
                                    <div class="right-cont" style="color:red">
                                        <i class="icon md-close-circle pr-5"></i>
                                        <b>已拒绝</b>
                                    </div>
                                </template>
                                
                            </div>
                        </div>
                    </div> 
                                
                </div>
                <div class="panel col-md-12 col-lg-12 py-10">
                    <div class="content" >
                        <p class="py-10 pl-20" style="border-bottom:1px solid #E0E0E0"><span>审批<em></em><i>{{item.applicant}}</i></span><span class="pl-100">操作<i class="p-10">同意审批</i></span> <span class="pl-100">审批时间<i class="p-10">2018-12-13</i></span></p>
                        <p class="py-10 pl-20" style="border-bottom:1px solid #E0E0E0"><span>审批<em></em><i>{{item.applicant}}</i></span>       
                        <template v-if="item.type==0">
                         <span class="pl-100">操作<i class="p-10">{{item.approval}}</i></span>
                        </template> 
                        <template v-if="item.type==1">
                         <span class="pl-100">操作<i class="pl-10 " style="padding-right:23px">{{item.approval}}</i></span>
                        </template> 
                        <template v-if="item.type==2">
                         <span class="pl-100">操作<i class="pl-10 " style="padding-right:23px">{{item.approval}}</i></span>
                        </template> 
                        <template v-if="item.type==3">
                         <span class="pl-100">操作<i class="p-10">{{item.approval}}</i></span>
                        </template>   
                        <template v-if="item.type==4">
                         <span class="pl-100">操作<i class="p-10">{{item.approval}}</i></span>
                        </template>          
                        <span class="pl-100">审批时间<i class="p-10">2018-12-13</i></span></p>
                    </div>
                     <div class="notify pl-20">
                        <div>知会人</div>
                        <AddMember @change="participantChange"></AddMember>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import data from './data.json'
export default {
    data(){
        return{
           list:[]
        }
    },
    mounted(){
        data.forEach((item)=>{
          if(this.$route.params.id==item.number){
              this.list.push(item)
          }
        });  
    },
    methods:{
        participantChange: function (value) {
        let flagArr = [];
        for (let i = 0; i < value.length; i++) {
          flagArr.push(value[i].id)
        }
        this.participants = flagArr
      },
    }
}
</script>
<style scoped>
*{
    list-style: none;
    font-style: normal;
    font-weight: normal;
}
.detail {
    width: 82%;
    position: absolute;
    left: 140px;
    top: 0;
}
.pending{
    background: #FFC107
}
.approved{
    background: #4DAF50 
}
.revoke{
    background: #616161
}
.cancel{
    background: #616161
}
.refuse{
    background: red
}
.btn{
    padding: 0 10px;
    margin: 0 10px;
}
.nav-head span{
   display: inline-block;
   color: #fff;
   font-size: 14px;
   padding: 4px;
}
.title-status{
    position: relative;
}
.title-status em,.content em,.setp em{
    width: 25px;
    height:25px;
    display: inline-block;
    background-image: url('../../assets/head.jpg');
    background-size:25px;
    border-radius: 50%;
    margin: 0 10px;
    vertical-align: middle;
}
.title-status i{
    position: absolute;
    right:10px;
    top:0;
}
.caption{
  padding: 20px 0;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.caption span{
  position: absolute;
  right:10px;
  top: 20px;
}
.page-content{
    padding: 0 20px;
}
.notify{
    display: flex;
}
.content p{
    position: relative;
}
.content p b{
    position: absolute;
    left:300px;
    top:10px;
}
.left,.middle{
    display: flex;
    vertical-align: middle;
    position: relative;
}
.left::before,.middle::before{
    content: '';
    width:40px;
    height:1px;
    background: #e0e0e0;
    display: inline-block;
    position: absolute;
    top: 15px;
    left: 130px;
}
.left-cont,.middle-cont{
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: bold;
}
.setp{
    display: flex;
}
.setp em{
   width: 35px;
   height:35px;
}
.right{
    display: flex;
    align-items: center;
}
.middle em,.left em {
    position: relative;
}
.middle em i,.left em i{
    position: absolute;
    bottom: -3px;
    right:-6px;
}
.panel{
   margin-bottom: 20px;
}
</style>


