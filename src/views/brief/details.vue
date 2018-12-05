<template>
    <!-- Page -->
<div class="page-main">
    <div class="page-header page-header-bordered">
        <h1 class="page-title">简报</h1>
        <div class="page-header-actions">
            <button type="button" class="btn btn-primary mr-20" @click="submitAnswer">提交</button>
            <button type="button" class="btn btn-default">保存草稿</button>
        </div>
        
    </div>
    <div class="page-content container-fluid">
        <div class="col-md-12 panel example clearfix p-20">
            <span class="float-left pr-10">评审人</span>
            <input-selectors :placeholder="'请选择负责人'" @change="changePrincipal"></input-selectors>
            <!-- <add-member class="float-left pr-20" @change="participantChange"></add-member> -->
            <!-- <span class="float-left pr-10 ml-20">谁可以看</span> -->
            <!-- <add-member @change="participantChange"></add-member> -->

        </div>
        <div class="panel col-md-12 p-20">
             <div class="panel-header clearfix">
                 <!-- <div class="float-left">
                      日历控件
                 </div> -->
                 <button type="button" class="btn btn-warning float-right" style="color:#fff">待评审</button>
             </div>
             <div class="panel-content">
                 <!--问题列表开始-->
                 <ul class="list-group mt-10">
                        <li class="list-group-item p-0 mb-10 pb-10" v-for="(item,index) in quesList" :key="item.id">
                            
                            <!--问题-->
                            <p v-if="item.type == 1">{{index+1}}.{{item.issues}}</p>
                            <p v-else-if="item.type == 2">{{index+1}}.{{item.issues}}</p>
                            <p v-else-if="item.type == 3">{{index+1}}.{{item.issues}}</p>
                             <p v-else-if="item.type == 4" class="list-group-item-heading mt-0 mb-5">{{index+1}}.{{item.issues}}<span style="color:#01BCD4;cursor:pointer" data-toggle="modal" data-target="#selectTask" class="px-5" @click="getTaskQuesId(item.id)">选任务</span></p>
                            <p v-else>{{index+1}}.{{item.issues}}</p>
                            
                            <!--填写答案-->
                            <div  v-show="item.type == 1" class="pt-10">
                                <input v-model="submitAnswerData[`answer[${item.id}]`]" type="text" placeholder="" class="form-control">
                            </div>
                            <div class="pt-10"  v-show="item.type == 2">
                                <numberinput :id="item.id" @click="changeNum" v-on:input="changeNum"></numberinput>
                            </div>
                            <div class="pt-10"  v-show="item.type == 3">
                                <Datepicker v-bind:changeKey="item.id" @select="datePickerChange"></Datepicker>
                            </div>
                            <div v-show="item.type == 4" class="taskList">
                                <div class="ml-15"  v-for="(item,index) in submitAnswerData[`answer[${item.id}]`]" :key="index">
                                    <i class="icon icon md-email-open"></i>
                                <router-link class="mr-10" :to="`/tasks/${item.id}`">{{item.title}}</router-link>
                                </div>
                            </div>
                            <div class="pt-10 uploadContent" v-show="item.type == 5" >
                                {{submitAnswerData[`answer[${item.id}]`]}}
                                <div v-for="(item,index) in submitAnswerData[`answer[${item.id}]`]" :key="index">{{item.name}}</div>
                                <!-- <span style="color:#01BCD4;cursor:pointer">上传附件</span> -->
                                <Upload v-bind:id="item.id" @change="uploadAttachment">上传附件</Upload>
                                <!-- <FileUploader class="upload" v-bind:id="item.id"  @change="uploadAttachment"></FileUploader> -->
                            </div>
                            
                        </li>
                    </ul>
                <!--问题列表结束-->
             </div>
        </div>
    </div>
    <!-- <div class="site-action" data-plugin="actionBtn" @click="redirectBriefAdd()">
        <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
            <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
            <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
        </button>
    </div> -->
    <div class="modal fade" id="selectTask" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="md-close"></i></button>
                    <h4 class="modal-title">任务</h4>
                </div>
                <div class="modal-body clearfix">
                     <ul class="list-group">
                        <CheckboxGroup :optionData="taskList" @change="getCheckbox">
                            <template slot-scope="scope">
                                <span>{{scope.row.title}}</span>
                            </template>
                        </CheckboxGroup>
                    </ul>
                </div>
                <div class="modal-footer pl-5">
                    <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal" @click="cancelTask()">取消</button>
                    <button class="btn btn-primary" type="submit" data-dismiss="modal">确定</button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'
import numberinput from '@/components/numberInput'
import checkbox from '@/components/checkbox'
export default {
    data(){
        return {
            accessory:this.$route.query.id,
            quesList:[],
            birthday:'',
            isEdit:false,
            renderTaskData:{},
            renderUploadData:{},
            submitAnswerData:{
                reviewer_ids:'',
                accessory:'',

            },
            uploadList:{

            },
            taskList:[],
            selectTask:[],
            quesTaskId:'',
            modData:['node','hahah',{
                title:'测试',
                id:'1',
                color:'red'
                
            },{
                name:'张强',
                color:"黑色"
            }]
        }
    },
    components:{
        numberinput
    },
    mounted(){

        this.getAll()
        this.getTaskList()
        this.getDetails()
        console.log(this.arrayToUpParams(this.modData))
    },
    methods:{
         
        //获取所有的问题
        getAll:function(){
            fetch('get',`${config.apiUrl}/launch/all`,{accessory:this.accessory}).then((res) => {
                this.quesList = res.data
                this.isEdit = true
                this.getData()
            })
        },
        
        /*任务*/
        //取消选择任务
        canelTask:function(){
            this.submitAnswerData[`answer[${this.quesTaskId}]`] = []
        },
        //获取任务问题的id
        getTaskQuesId:function(id){
            this.quesTaskId = id
        },
        //获取选中的任务
        getCheckbox:function(value){
            let data={}
            this.submitAnswerData[`answer[${this.quesTaskId}]`] =[]
            for (let i = 0; i < value.length; i++) {
                
                data = {
                    id:value[i].id,
                    title:value[i].title
                }
                this.submitAnswerData[`answer[${this.quesTaskId}]`].push(data) 
            }
           
        },
        
        /*数字*/
        changeNum:function(value,id){
            this.submitAnswerData[`answer[${id}]`] = value
        },

        /*日期*/
        datePickerChange:function(key,value){
            this.submitAnswerData[`answer[${key}]`] = value
        },

        /*附件*/
        uploadAttachment:function(url,name,size,id){
            this.submitAnswerData[`answer[${id}]`] = []

            let data={
                url:url,
                name:name
            }
            this.submitAnswerData[`answer[${id}]`].push(data)
            this.updateAffix(url,name,size,id)
        },
        updateAffix:function(url,name,size,id){
            let data ={
                title:name,
                url:url,
                size:size,
                type:1
            }
            fetch('put',`${config.apiUrl}/reports/${id}/affix`,data).then((res) => {
                this.taskList = res.data
            })
        },
        participantChange:function(value){
        },
        changePrincipal:function(value){
            
           this.submitAnswerData.reviewer_ids = value.id
        },
        //获取任务列表
        getTaskList:function(){
            fetch('get',`${config.apiUrl}/tasks/my_all`).then((res) => {
                this.taskList = res.data
            })
        },

        //设置所有要提交的数据
        getData:function(){
           for (let i = 0; i < this.quesList.length; i++) {
                this.submitAnswerData[`answer[${this.quesList[i].id}]`]=''
           }
        },

        //提交
        submitAnswer:function(){
            this.submitAnswerData.accessory = this.$route.query.id
            for (const key in this.submitAnswerData) {
                if(Array.isArray(this.submitAnswerData[key])){
                    this.submitAnswerData[key] =JSON.stringify(this.submitAnswerData[key]) 
                }
            }
            fetch('post',`${config.apiUrl}/launch`,this.submitAnswerData).then((res) => {
               toastr.success('提交成功');
                
            })
        },
        getDetails:function(){
            fetch('get',`${config.apiUrl}/review/${this.$route.query.id}`).then((res) => {
            //    console.log(res)
                
            })
        },
        modify:function(){
            fetch('post',`${config.apiUrl}/launch`,this.submitAnswerData).then((res) => {
               toastr.success('提交成功');
                
            })
        },
        arrayToUpParams:function(arr){
           var count = arr.length
           for (var i = 0; i<count;i++) {
               var ele = arr[i]
               if(ele instanceof Object){
                   if(i+1<=count&&arr[i+1] instanceof Object){
                       var ele2 = arr[i+1]
                       for(var key in ele){
                           for(var key1 in ele2){
                               if(key1 == key){
                                   ele2[key1] = ele[key]+','+ele2[key1]
                               }
                           }
                       }
                   }
               }
               
           }
           var modfiyEnd = arr[arr.length-1]
           return modfiyEnd
        }
    }
}
</script>


<style lang="scss" scoped>
    .page-main{
        background-color:#f3f4f5 !important;
    }
    .list-group-item{
        border-bottom:1px solid #f4f4f4;
    }
</style>
