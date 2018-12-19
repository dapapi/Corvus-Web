<template>
    <div class="">
        <div class="" style="background-color:#f3f4f5" v-for="item in list" :key="item.id">
            <div class="page-header  page-header-bordered mb-0">
                <h6 class="page-title nav-head">{{item.title}}
                    <template v-if="item.type==0">
                        <button class="btn btn-success py-5">已审批</button>
                    </template>
                    <template v-if="item.type==1">
                        <button class="btn btn-warning py-5">待审批</button>
                    </template>
                    <template v-if="item.type==2">
                        <button class="btn py-5">已撤销</button>
                    </template>
                    <template v-if="item.type==3">
                        <button class="btn py-5">已作废</button>
                    </template>
                    <template v-if="item.type==4">
                        <button class="btn btn-danger py-5 ">已拒绝</button>
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
                    <div class="example">
                        <div class="col-md-2 float-left">申请人</div>
                        <div class="col-md-2 float-left">{{item.applicant}}</div>
                        <div class="col-md-2 float-left">部门</div>
                        <div class="col-md-2 float-left">{{item.department}}</div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 float-left">部门</div>
                        <div class="col-md-2 float-left">{{item.fieldlocation}}</div>
                        <div class="col-md-2 float-left">申请时间</div>
                        <div class="col-md-2 float-left">{{item.time}}</div>
                    </div>
                    <div class="example pt-20" style="border-top:1px solid #ccc">
                        <div class="col-md-2 float-left">外勤地点</div>
                        <div class="col-md-2 float-left">{{item.fieldlocation}}</div>
                        <div class="col-md-2 float-left">外勤天数</div>
                        <div class="col-md-2 float-left">{{item.fieldDays}}天</div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 float-left">开始时间</div>
                        <div class="col-md-2 float-left">{{item.startTime}}</div>
                        <div class="col-md-2 float-left">结束时间</div>
                        <div class="col-md-2 float-left">{{item.endTime}}</div>
                    </div>
                    <div class="example">
                        <div class="col-md-2 float-left">外勤事由</div>
                        <div class="col-md-2 float-left">{{item.fieldwork}}</div>
                        <div class="col-md-2 float-left">附件</div>
                        <div class="col-md-2 float-left">{{item.department}}</div>
                    </div>
                    
                </div>
                <div class="panel col-md-12 col-lg-12">
                    <div class="caption" style="border:0;">
                        <h6 class="page-title pb-20" style="border-bottom:1px solid #ccc">审批流程</h6>
                        <div class="setp pt-20">
                            <div class="left col-md-2">
                                <em class="mr-10"><i class="md-check-circle pr-5" style="color:#4DAF50"></i></em>
                                <div class="left-cont">
                                    <b class="branch">泰洋系</b>
                                    <b class="type" style="color:#999;width:48px;">提交审批</b>
                                </div>
                            </div>
                            <div class="middle col-md-2">
                                <template v-if="item.type==0">
                                    <em><i class="md-check-circle pr-5" style="color:#4DAF50"></i></em>
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
                                        <i class="md-check-circle pr-5"></i>
                                        <b>审批通过</b>
                                    </div>
                                </template>
                                <template v-if="item.type==1">
                                    <div class="right-cont" style="color:#E0E0E0">
                                        <i class="md-check-circle pr-5"></i>
                                        <b>审批通过</b>
                                    </div>
                                </template>
                                <template v-if="item.type==2">
                                    <div class="right-cont">
                                        <i class="md-close-circle pr-5"></i>
                                        <b>已撤回</b>
                                    </div>
                                </template>
                                <template v-if="item.type==3">               
                                    <div class="right-cont">
                                        <i class="md-close-circle pr-5"></i>
                                        <b>已作废</b>
                                    </div>
                                </template>
                                <template v-if="item.type==4">
                                    <div class="right-cont" style="color:red">
                                        <i class="md-close-circle pr-5"></i>
                                        <b>已拒绝</b>
                                    </div>
                                </template>
                                
                            </div>
                        </div>
                    </div> 
                                
                </div>
                <div class="panel col-md-12 col-lg-12 py-10">
                    <div class="content" >
                        <div class="example" >
                            <div class="col-md-1 float-left">审批</div>
                            <em></em>
                            <div class="col-md-2 float-left">{{item.applicant}}</div>
                            <div class="col-md-1 float-left">操作</div>
                            <div class="col-md-2 float-left">同意审批</div>
                            <div class="col-md-2 float-left">审批时间</div>
                            <div class="col-md-2 float-left">2018-12-13</div>
                        </div>
                        <div class="example">
                            <div class="col-md-1 float-left">审批</div>
                            <em></em>
                            <div class="col-md-2 float-left">{{item.applicant}}</div>
                            <div class="col-md-1 float-left">操作</div>
                            <template v-if="item.type==0">
                                <div class="col-md-2 float-left">{{item.approval}}</div>
                            </template> 
                            <template v-if="item.type==1">
                                <div class="col-md-2 float-left">{{item.approval}}</div>
                            </template> 
                             <template v-if="item.type==2">
                                <div class="col-md-2 float-left">{{item.approval}}</div>
                            </template> 
                            <template v-if="item.type==3">
                                <div class="col-md-2 float-left">{{item.approval}}</div>
                            </template>   
                            <template v-if="item.type==4">
                                <div class="col-md-2 float-left">{{item.approval}}</div>
                            </template>          
                            <div class="col-md-2 float-left">审批时间</div>
                            <div class="col-md-2 float-left">2018-12-13</div>
                        </div>
                    </div>
                     <div class="notify pl-15">
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
.btn{
    padding: 0 10px;
    margin: 0 10px;
}
.title-status{
    position: relative;
   
}
.page-title{
    font-size: 1rem;
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
.example{
    position: relative;
}
.example em{
    position: absolute;
    left: 50px;
    top:-2px;
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
.nav-head{
    font-size: 26px;
}
</style>


