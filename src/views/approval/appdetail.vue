<template>
    <div class="page detail">
        <div class="page-main" style="background-color:#f3f4f5" v-for="item in list" :key="item.id">
            <div class="page-header  page-header-bordered mb-0">
                <h6 class="page-title nav-head ">{{item.title}}
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
                <div class="panel col-md-12 col-lg-12 py-10">
                    <div class="caption">
                        <h6 class="page-title">{{item.caption}}</h6>
                        <span>编号：{{item.number}}</span>
                    </div>
                    <div class="content" style="border-bottom:1px dashed #ccc">
                        <p class="py-10 pl-20"><span>申请人<em></em><i>{{item.applicant}}</i></span><span class="pl-30">部门<i class="p-10">{{item.department}}</i></span></p>
                        <p class="py-10 pl-20"><span>部门<i class="p-10">{{item.fieldlocation}}</i></span><span class="pl-20">申请时间<i class="p-10">{{item.time}}</i></span></p>
                    </div>
                    <div class="content">
                        <p class="py-10 pl-20"><span>外勤地点<i class="p-10">{{item.fieldlocation}}</i></span><span class="pl-30">外勤天数<i class="p-10">{{item.fieldDays}}天</i></span></p>
                        <p class="py-10 pl-20"><span>开始时间<i class="p-10">{{item.startTime}}</i></span><span class="pl-10">结束时间<i class="p-10">{{item.endTime}}</i></span></p>
                        <p class="py-10 pl-20"><span>外勤事由<i class="p-10">{{item.fieldwork}}</i></span><span class="pl-50">附件<i class="p-10">{{item.department}}</i></span></p>
                    </div>
                    
                </div>
                <div class="panel col-md-12 col-lg-12 py-10">
                    <div class="caption">
                        <h6 class="page-title">审批流程</h6>
                        
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
              console.log(this.list)
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
    font-weight: 500;
}
.page-title{
    font-size: 20px;
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
.title-status span{
    font-size: 20px;
}
.title-status em,.content em{
    width: 20px;
    height:20px;
    display: inline-block;
    background-image: url('../../assets/head.jpg');
    background-size:20px;
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
    padding: 20px;
}
.notify{
    display: flex;
}
.assistor {
    top:-350px !important;
}
</style>


