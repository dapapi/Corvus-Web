<template>
    <!-- Page -->
    <div class="page-main" style="background-color:##f3f4f5">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">提交申请</h1>
            
        </div>
        <div class="page-content container-fluid">
            <div class="">
                <div class="row py-5">
                    <div class="col-lg-4" v-for="item in type" :key="item.id"  data-toggle="modal" data-target="#modalLeave" @click="getType(item.value,item.name)">
                        <div class="card">
                            <div class="card-block">
                                <i class="md-file float-left mr-10" style="font-size:3rem"></i>
                                <i></i>
                                <p class="mt-20">{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--请假-->
         <div class="modal fade" id="modalLeave" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">
                            <template v-if="typeCheck == 1">请假申请</template>
                            <template v-else-if="typeCheck ==2">加班申请</template>
                            <template v-else-if="typeCheck ==3">出差申请</template>
                            <template v-else>外勤申请</template>
                        </h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example" v-show="typeCheck == 1">
                            <div class="col-md-2 text-right float-left">请假类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors class="" :options="leaveType" @change="changeLeaveType"></selectors>
                            </div>
                        </div>
                        <div class="example" v-show="typeCheck==3||typeCheck == 4">
                            <div class="col-md-2 text-right float-left">{{name}}地点</div>
                            <div class="col-md-10 float-left pl-0">
                                <input v-model="addData.place" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker :placeholder="'选择开始时间'" @change="changeStartDate"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <Timepicker :default="startMinutes" @change="changeStartTime"></Timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">结束时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker :placeholder="'选择结束时间'" @change="changeEndDate" :startDate="startDate"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <Timepicker :default="endMinutes" @change="changeEndTime"></Timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">{{name}}天数</div>
                            <div class="col-md-10 float-left pl-0">
                                <NumberSpinner @change="getNumber"></NumberSpinner>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">{{name}}事由</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea v-model="addData.cause" class="form-control" placeholder="请填写请假事由"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">附件</div>
                            <div class="col-md-10 float-left pl-0 uploadContent">
                                <span class="mr-5" v-for="(item,index) in addData.affixes" :key="index">{{item.name}}</span>
                                <span style="color:#01BCD4;cursor:pointer">上传附件</span>
                                <FileUploader class="upload"  @change="uploadAttachment"></FileUploader>
                            </div>
                        </div>
                        <div class="example clearfix">
                            <div class="col-md-2 text-right float-left">
                                审批人
                            </div>
                            <div class="col-md-10 float-left pl-0">
                                <addMember></addMember> <!--newParticipantsInfo-->
                            </div>
                            
                        </div>
                        <div class="example clearfix">
                            <div class="col-md-2 text-right float-left">
                                知会人
                            </div>
                            <div class="col-md-10 float-left pl-0">
                                <addMember :type="'change'"></addMember> <!--participantsInfo-->
                            </div>
                            
                        </div>
              
                    </div>
                    <div class="modal-footer pl-5">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="add">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--请假-->
    </div>
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
import numberInput from '@/components/numberInput'

export default {
    components:{
       numberInput
    },
    data(){
        return {
            list:[], 
            type:[
                {
                    value:1,
                    name:'请假'
                },
                {
                    value:2,
                    name:'加班'
                },
                {
                    value:3,
                    name:'出差'
                },
                {
                    value:4,
                    name:'外勤'
                }
            ],
            typeCheck:0,//申请类型
            name:'',//申请类型名称
            leaveType:[
                {
                    value:1,
                    name:'事假'
                },
                {
                    value:2,
                    name:'病假'
                },
                {
                    value:3,
                    name:'调休'
                },
                {
                    value:4,
                    name:'年假'
                },
                {
                    value:5,
                    name:'婚假'
                },
                {
                    value:6,
                    name:'产假'
                },
                {
                    value:7,
                    name:'陪产假'
                },
                {
                    value:8,
                    name:'丧假'
                },
                {
                    value:9,
                    name:'其他'
                },
                
            ],
            startDate:'',//开始时间
            startTime:'',
            endDate:'',//结束时间
            endTime:'',
            startMinutes: '00:00',
            endMinutes:'00:00',
            addData:{
                type:this.typeCheck,
                start_at:'',
                end_at:'',
                number:0,//天数
                cause:'',//事由
                approval_flow:'12121',//审批流id -- 审批人
                notification_person:'',//知会人
                leave_type:'',//请假类型
                place:'',//出差 外勤地点
                affixes:[],//附件
            },
            fileName:''
            
        }
    },
   
    mounted(){
        
    },
    methods:{
        changeStartDate:function(value){
            this.startDate = value
        },
        changeEndDate:function(value){
            this.endDate = value
        },
        changeStartTime:function(value){
            this.startTime = value
        },
        changeEndTime:function(value){
            this.endTime = value
        },
        getNumber:function(value){
            this.addData.number =value
        },
        uploadAttachment:function(url,name,size){
            this.addData.affixes.push ({
                'size':size,
                'url':url,
                'name':name
            }) 
        },
        tell:function(){
            console.log(this.$store.state.participantsInfo)
        },
        //获取
        changeLeaveType:function(value){
            this.addData.leave_type = value
        },
        //获取类型 --重置数据
        getType(type,name){
            this.typeCheck = type
            this.name = name
            this.addData={
                type:type,
                start_at:'',
                end_at:'',
                number:0,
                cause:'',//事由
                approval_flow:'',//审批流id
                notification_person:'',//知会人
                leave_type:'',//请假类型
                place:'',//出差 外勤地点
                affixes:[],//附件
            }
            this.$store.state.participantsInfo = []
            this.$store.state.newParticipantsInfo =[]

        },
        add:function(){
            let _this = this
            this.addData.start_at = `${this.startDate} ${this.startTime}:00`
            this.addData.end_at = `${this.endDate} ${this.endTime}:00`
            let approval = []
            let notification = []
            for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                approval.push(this.$store.state.participantsInfo[i].id)
                
            }
            this.addData.approval_flow = approval.join(',')
            for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                notification.push(this.$store.state.newParticipantsInfo[i].id)
                
            }
            this.addData.notification_person = notification.join(',')

            if(this.addData.type == 1){
                delete this.addData.place
            }else if(this.addData.type ==2){
                delete this.addData.leave_type
                delete this.addData.place
            }else{
                delete this.addData.leave_type
            }

            fetch('post', '/attendance',this.addData).then(function (response) {
                toastr.success('提交成功');
                _this.addData={
                    type:0,
                    start_at:'',
                    end_at:'',
                    number:0,//天数
                    cause:'',//事由
                    approval_flow:'12121',//审批流id -- 审批人
                    notification_person:'',//知会人
                    leave_type:'',//请假类型
                    place:'',//出差 外勤地点
                    affixes:[],//附件
                },
                $('#modalLeave').modal('hide');
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-main{
        background-color:#f3f4f5 !important;
    }
    .uploadContent{
        position: relative;
    }
    .upload{
        position: absolute;
        top:0px;
        left:0px;
        opacity: 0;

    }
</style>




    
    






