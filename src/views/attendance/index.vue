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
                                <i class="icon md-file float-left" style="font-size:3rem"></i>
                                <i></i>
                                <p class="my-10">{{item.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--请假-->
         <div class="modal fade" id="modalLeave" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="md-close"></i></button>
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
                                <selectors class="" :options="leaveType"></selectors>
                            </div>
                        </div>
                        <div class="example" v-show="typeCheck==3||typeCheck == 4">
                            <div class="col-md-2 text-right float-left">{{name}}地点</div>
                            <div class="col-md-10 float-left pl-0">
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">开始时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker @change="changeStartTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <Timepicker :default="startMinutes" @change="changeStartMinutes"></Timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">结束时间</div>
                            <div class="col-md-5 float-left pl-0">
                                <Datepicker @change="changeStartTime"></Datepicker>
                            </div>
                            <div class="col-md-5 float-left pl-0">
                                <Timepicker :default="startMinutes" @change="changeStartMinutes"></Timepicker>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">{{name}}天数</div>
                            <div class="col-md-10 float-left pl-0">
                                <numberInput></numberInput>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">{{name}}事由</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" placeholder="请填写请假事由"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">附件</div>
                            <div class="col-md-10 float-left pl-0 uploadContent">
                                <span style="color:#01BCD4;cursor:pointer">上传附件</span>
                                <FileUploader class="upload"  @change="uploadAttachment"></FileUploader>
                            </div>
                        </div>
                        <div class="example clearfix">
                            <div class="col-md-2 text-right float-left">
                                审批人
                            </div>
                            <div class="col-md-10 float-left pl-0">
                                <addMember class=""></addMember>
                            </div>
                            
                        </div>
                        <div class="example clearfix">
                            <div class="col-md-2 text-right float-left">
                                知会人
                            </div>
                            <div class="col-md-10 float-left pl-0">
                                <addMember class=""></addMember>
                            </div>
                            
                        </div>
              
                    </div>
                    <div class="modal-footer pl-5">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit">确定</button>
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
            startMinutes:''

        }
    },
   
    mounted(){
        
    },
    methods:{
        changeStartMinutes:function(){

        },
        uploadAttachment:function(){

        },

        getType(type,name){
            this.typeCheck = type
            this.name = name
        },
        redirectBriefDetails:function(id){
            this.$router.push({path:'/brief/details',query:{id:id}})
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
        getlist:function(){
            fetch('get',`${config.apiUrl}/launch`).then((res) => {
                this.list = res.data
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




    
    






