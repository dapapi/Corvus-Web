<template>
       <!-- Page -->
    <div class="page-main">
        <div class="page-header page-header-bordered">
            <h1 class="page-title">模版管理</h1>
        </div>
        <div class="page-content container-fluid">
            <div class="panel col-md-12 clearfix py-5"> 
                <div class="panel-body">
                    <div class="tab-content">
                        <table class="table table-hover" data-plugin="selectable" data-row-selectable="true">
                            <tr>
                                <th class="cell-50" scope="col"></th>
                                <th class="cell-300" scope="col">模版名称</th>
                                <th class="cell-300" scope="col">频率</th>
                                <th class="cell-300" scope="col">管理</th>
                            </tr>
                            <tr v-for="(item,index) in list" :key="item.id">
                                
                                <td>{{(index+1)*current_page}}</td>
                                <td>{{item.template_name}}</td>
                                <td>{{item.frequency|getFrequency(times,item.frequency)}}</td>
                                <td>
                                    <!--编辑模版-->
                                    <span class="pr-40 d-block float-left pointer-content" style="color: #b9b9b9;" data-toggle="modal" data-target="#addModelDetails" @click="changeModelType('edit')">
                                        <i class="icon md-edit color" aria-hidden="true"></i>
                                    </span>
                                    <!--编辑模版结束-->
                                    <!--删除模版-->
                                    <span class="pr-40 d-block float-left pointer-content" style="color: #b9b9b9" data-toggle="modal" data-target="#delModel" @click="getDelModelId(item.template_id,item.template_name)">
                                        <i class="icon md-delete color" aria-hidden="true"></i>
                                    </span>
                                    <!--删除模版结束-->
                                    
                                    <span class="d-block float-left pointer-content color" data-toggle="modal" data-target="#addQues">设置问题</span>
                                </td>
                            </tr>
                        </table>
                        <pagination :current_page="current_page" :method="getlist" :total_pages="total_pages"
                            :total="total"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" data-target="#addModelDetails" @click="changeModelType('add')">
            <button type="button" class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon md-plus animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon md-plus animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
        <!--添加模版弹框开始-->
        <div class="modal fade" ref="addModelDetails" id="addModelDetails" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="md-close"></i></button>
                        <h4 class="modal-title" v-if="modelType == 'add'">添加模版</h4>
                        <h4 class="modal-title" v-else>编辑模版</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">模版名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input v-model="addModelData.template_name" type="text" class="form-control" placeholder="字数不超过10个汉字或20个字母" @blur="isExist">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">模版对象</div>
                            <div class="col-md-10 float-left pl-0">
                                <add-member @change="participantChange"></add-member>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">模版频率</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors :options="times" placeholder="请选择频率" @change="changeFrequency"></selectors>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="changeModel()">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--添加模版弹框结束-->
        <!--添加模版添加问题弹框开始-->
        <div class="modal fade" id="addQues" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="md-close"></i></button>
                        <h4 class="modal-title">设置问题</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <table class="table table-hover" data-plugin="selectable" data-row-selectable="true">
                            <tr>
                                <th class="cell-100" scope="col"></th>
                                <th class="cell-300" scope="col">问题</th>
                                <th class="cell-300" scope="col">操作</th>
                                
                            </tr>
                            <tr>
                        
                                <td>1</td>
                                <td>问题问题问题</td>
                                <td>
                                    <span class="pr-20 d-block float-left pointer-content" style="color: #b9b9b9;" data-toggle="modal"
                                        data-target="#addQuesDetails">
                                        <i class="icon md-edit" aria-hidden="true"></i>
                                    </span>
                                    <span class="pr-20 d-block float-left pointer-content" style="color: #b9b9b9" data-toggle="modal"
                                        data-target="#delModel">
                                        <i class="icon md-delete" aria-hidden="true"></i>
                                    </span>
                                    <span class="pr-20 d-block float-left pointer-content" style="color: #b9b9b9">
                                        <i class="iicon md-caret-up-circle" aria-hidden="true"></i>
                                    </span>
                                    <span class="d-block float-left pointer-content" style="color: #b9b9b9">
                                        <i class="icon md-caret-down-circle" aria-hidden="true"></i>
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <!-- <pagination :current_page="current_page" :method="getlist" :total_pages="total_pages"
                            :total="total"></pagination> -->
                        <button class="btn btn-primary example" type="button" data-toggle="modal" data-target="#addQuesDetails">添加问题</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <!--添加模版添加问题弹框结束-->
        <!--添加问题二级弹框开始-->
        <div class="modal fade" id="addQuesDetails" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="md-close"></i></button>
                        <h4 class="modal-title">设置问题</h4>
                        <h4 class="modal-title">编辑问题</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">提问对象</div>
                            <div class="col-md-10 float-left pl-0">
                                <!-- <add-member @change="participantChange"></add-member> -->
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">问题描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" placeholder="" style="height: 80px;"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <selectors style="width: 100%;" :options="type" placeholder="请选择艺人来源"></selectors>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-primary">
                                    <input type="checkbox" id="inputForProject" name="for[]" value="project" required="" data-fv-field="for[]" class="is-valid">
                                    <label for="inputForProject">设置为必填问题</label>
                                </div>
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
        <!--添加问题二级弹框结束-->
        <!--删除模版弹框开始-->
        <div class="modal fade" id="delModel" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="md-close"></i></button>
                        <h4 class="modal-title">确认删除</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <p>确认删除简报模板 “{{delName}}” 吗？删除模板的同时，历史相关的简报信息会一并删除。</p>
                        </div>
        
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="deleteModel">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--删除模版弹框结束-->
    </div>
    <!-- End Page -->
</template>
<script>
import fetch from '@/assets/utils/fetch'
import config from '@/assets/js/config'

export default {
    data(){
        return {
            list:[],
            current_page:1,
            total_pages:1,
            total:0,
            times:[
                {
                    value:1,
                    name:'每天'
                },
                {
                    value:2,
                    name:'每周'
                },
                {
                    value:3,
                    name:'每月'
                },
                {
                    value:4,
                    name:'每季'
                },
                {
                    value:5,
                    name:'每年'
                },
            ],
            type:[
                {
                    value:1,
                    name:'文本'
                },
                {
                    value:2,
                    name:'数字'
                },
                {
                    value:3,
                    name:'日期'
                },
                {
                    value:4,
                    name:'附件'
                },
                {
                    value:5,
                    name:'任务'
                },
                
            ],
            modelType:'add',
            participants:[],
            addModelData:{
                template_name:'',
                colour:'白',
                frequency:1,
                department_id:'1718463094',
                member:'1994731356',
                department:'1'
            },
            editModelData:{
                template_id:0
            },
            delId:'',
            delName:''
        }
    },
    computed:{
        
    },
    mounted(){
       this.getlist()
    },
    methods:{
        //获取模版列表
        getlist:function(){
            fetch('get',`${config.apiUrl}/report`).then((res) => {
                    this.list = res.data
                    this.current_page = res.meta.pagination.current_page
                    this.total_pages = res.meta.pagination.total_pages
                    this.total = res.meta.pagination.total
                })
        },
        participantChange:function(){
            
            console.log(this.$store.state.newParticipantsInfo)
            
        },
        changeModelType:function(type){
            type == 'add'?this.modelType ='add':this.modelType = 'edit'
        },
        //编辑和添加模版
        changeModel:function(id){
            let data,url
            this.modelType == 'add'?url = '/report':url = '/edit'
            this.modelType == 'add'?data = this.addModelData:this.editModelData
            fetch('post',`${config.apiUrl}${url}`,data).then((res) =>{
                $('#addModelDetails').modal('hide')
                this.getlist();
            })
        },
        getDelModelId:function(id,name){
           this.delId = id
           this.delName = name
        },
        //删除模版
        deleteModel:function(){
            fetch('del',`${config.apiUrl}/ `,{template_id:this.delId}).then((res) =>{
                $('#delModel').modal('hide')
                this.getlist();
            })
        },
        //检查模版名称是否存在
        isExist:function(){
            fetch('get',`${config.apiUrl}/report/all`,{template_name:this.addModelData.template_name}).then((res) =>{
                if(res.data.length>0){
                    alert('简报名称重复，请重新输入')
                }
            })
        },
        //改变频次
        changeFrequency:function(value){
            this.addModelData.frequency = value;
        }
    },
    filters:{
        getFrequency:function(id,times){
            for (let i = 0; i <=times.length; i++) {
                if(times[i].value == id){
                    return times[i].name
                }
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-main{
        background-color:#f3f4f5 !important;
    }
</style>


