<template>
    <div class="" v-if="info.approval">
        <div class="loader-overlay" v-if="isLoading">
            <div class="loader-content">
                <div class="loader-index">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <div class="" style="background-color:#f3f4f5">
            <div class="page-header  page-header-bordered mb-0" >
                <h6 class="page-title nav-head" v-if="info">
                    <i class="iconfont icon-zuojiantou"></i>{{list.title}}
                    <template v-if="info.approval[0].form_status==232">
                        <button class="btn btn-success py-5">已审批</button>
                    </template>
                    <template v-if="info.approval[0].form_status==231">
                        <button class="btn btn-warning py-5">待审批</button>
                    </template>
                    <template v-if="info.approval[0].form_status==234">
                        <button class="btn py-5">已撤销</button>
                    </template>
                    <template v-if="info.approval[0].form_status==235">
                        <button class="btn py-5">已作废</button>
                    </template>
                    <template v-if="info.approval[0].form_status==233">
                        <button class="btn btn-danger py-5 ">已拒绝</button>
                    </template>
                </h6>
            </div>
            <div class="page-header  page-header-bordered m-20 pl-10" >
                <h6 class="page-title title-status">当前状态<em></em><span>{{currentStatus}}</span>
                <div v-if="!isApproverMode">
                    <i v-if="info.approval[0].form_status==232">
                        <button class="btn btn-primary" @click='approvalHandler("discard")'>作废</button>
                    </i>
                    <i v-if="info.approval[0].form_status==231">
                        <button class="btn btn-primary" @click='approvalHandler("cancel")'>撤销</button>
                        <button class="btn btn-danger" type="submit"
                                data-toggle="modal" >提醒
                        </button>
                    </i>
                    <i v-if="info.approval[0].form_status==234">
                        <button class="btn btn-primary" @click="addProjectTimeout(list.type)">重新提交</button>
                    </i>
                    <i v-if="info.approval[0].form_status==235">
                        <button class="btn btn-primary" @click="addProjectTimeout(list.type)" >重新提交</button>
                    </i>
                    <i v-if="info.approval[0].form_status==233">
                        <button class="btn btn-primary">作废</button>
                    </i>
                </div>
                <div v-if="isApproverMode">
                    <i v-if="info.approval[0].form_status==231">
                        <button class="btn btn-success" @click='approvalHandler("agree")'>同意</button>
                        <button class="btn btn-danger" @click='approvalHandler("refuse")'>拒绝</button>
                        <button class="btn btn-primary" @click='approvalHandler("transfer")'>转交</button>

                    </i>
                    <i v-if="info.approval[0].form_status==232">
                        <button class="btn btn-info" @click='approvalHandler("discard")' >作废</button>
                    </i>
                </div>
                </h6>
            </div>
            <div class="page-content container-fluid mt-20" v-if="info">
                <div class="panel col-md-12 col-lg-12 pb-10">
                    <div class="caption">
                        <h6 class="page-title">{{list.title}}</h6>
                        <span>编号：{{info.approval[0].project_number}}</span>
                    </div>
                    <div class="example">
                        <div class="col-md-3 float-left">申请人</div>
                        <div class="col-md-3 float-left">{{info.approval[0].name}}</div>
                        <div class="col-md-3 float-left">部门</div>
                        <div class="col-md-3 float-left">{{info.approval[0].department_name }}</div>
                    </div>
                    <div class="example">
                        <div class="col-md-3 float-left">部门</div>
                        <div class="col-md-3 float-left">{{info.approval[0].department_name}}</div>
                        <div class="col-md-3 float-left">申请时间</div>
                        <div class="col-md-3 float-left">{{info.approval[0].created_at}}</div>
                    </div>
                    <div class="example pt-20" style="border-top:1px solid #ccc">

                    </div>
                    <div class="example">
                        <div >审批详情</div>
                        <div class="col-md-12 detail-container px-0" v-for="(item, index) in detailData" :key="index" v-if="item.values">
                            <div class="col-md-3 float-left detail-key mx-0">{{item.key}}</div>
                            <div class="col-md-9 float-left detail-value" v-if="item.values">{{item.values.data.value || ''}}</div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="panel col-md-12 col-lg-12">
                    <div class="caption" style="border:0;">
                        <h6 class="page-title pb-20" style="border-bottom:1px solid #ccc">审批流程</h6>
                        <div class=" pt-20">
                            <ApprovalProgress mode='detail' :formid='info.approval[0].project_number' :formstatus='currentStatus' />
                        </div>
                    </div>
                </div>
            </div>
        <BuildProject :project-type="projectType" :project-fields-arr="projectFieldsArr" 
        :default-data='{fields:info.fields.data,list:list,trailInfo:trailInfo}'></BuildProject>
        <ApprovalGoModal :mode='approvalMode' :id='this.info.approval[0].project_number' @approvaldone='getData()' />
    </div>

</template>
<script>
import fetch from '@/assets/utils/fetch.js'
import config from '@/assets/js/config'
import {PROJECT_CONFIG} from '@/views/approval/project/projectConfig.js'
import ApprovalProgress from '@/components/ForApproval/ApprovalProgress'
export default {
    name:'approvalDetail',
    components:{
        ApprovalProgress
    },
    data(){
        return{
           list:{},
           info:{},
           detailData:{},
           projectType:'',
           projectFieldsArr:[],
           trailInfo:{},
           firstFlag:true,
           isLoading:false,
           approvalMode:'',
        }
    },

    mounted(){
        this.getData()
        // this.isApproverMode()
    },
    computed:{
         isApproverMode(){
            if(this.$route.query.mode === 'approver'){
                console.log('ture');
                return true
            }else{
                console.log('false');
                return false
            }
        },
         currentStatus(){
            // console.log(this.info.approval[0].form_status);
            switch(this.info.approval[0].form_status){
                case 232:
                    return '已审批'
                case 231:
                    return '待审批'
                case 233:
                    return '已拒绝'
                case 234:
                    return '已撤销'
                case 235:
                    return '已作废'
            }
        }
    },
    methods:{
        // approverTrans(){
        //     let _this = this
        //         fetch('put','/approval_instances/'+this.info.approval[0].project_number+'/transfer',{next_id:383780212}).then((params) => {
        //             console.log(params);
        //         }
        //     )
        // },
        addProjectTimeout(params){
            this.isLoading = true
            if(this.firstFlag === true){
                setTimeout(() => {
                    this.addProject(params)
                    this.firstFlag = false
                    this.isLoading = false
            }, 3000);
            }else{
                this.addProject(params)
                this.isLoading = false
            }
           
        },
        addProject(value) {
                console.log(value);
                this.projectType = value;
                this.selectProjectType(function () {
                    $('#addProject').modal('show')
                });
            },

            selectProjectType(callback) {
                fetch('get', '/project_fields', {
                    type: this.projectType,
                    status: 1,
                }).then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].field_type === 2 || response.data[i].field_type === 6) {
                            response.data[i].contentArr = [];
                            for (let j = 0; j < response.data[i].content.length; j++) {
                                response.data[i].contentArr.push({
                                    value: response.data[i].content[j],
                                    name: response.data[i].content[j]
                                })
                            }
                        }
                    }
                    this.projectFieldsArr = response.data;
                    console.log(this.projectFieldsArr);
                    callback();
                });
            },
        approvalHandler(params){
            this.approvalMode = params
            $('#approvalGo').modal('show')
        },
        getData(){
            let _this = this
            fetch('get','/approvals_project/detail/'+this.$route.params.id+'?include=principal,creator,fields,trail').then((params) => {
                // _this.list = params
                let {meta}=params
                _this.list = params.data
                _this.projectType = params.data.type
                _this.info = meta
                let {fields:{data}} = meta
                _this.detailData = data
                _this.trailInfo = params.data.trail
            })
        },
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
 .loader-overlay {
        margin-left: 320px;
        background-color: rgba(7, 17, 27, 0.2)
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
.detail-container{
    border: 1px solid #eeeeee;
    height: 40px;
    line-height: 40px;
}
.detail-key{
    height: 40px;
    background: #f5f5f5;

}
</style>


