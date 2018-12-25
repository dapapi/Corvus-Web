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
                                <td>
                                    {{index+(current_page-1)*per_page+1}}
                                </td>
                                <td>{{item.template_name}}</td>
                                <td>{{item.frequency|getFrequency(times,item.frequency)}}</td>
                                <td>
                                    <!--编辑模版-->
                                    <span class="pr-40 d-block float-left pointer-content" style="color: #b9b9b9;" data-toggle="modal" data-target="#addModelDetails" @click="changeModelType('edit',item.member,item.template_name,item.frequency,item.id)">
                                        <i class="iconfont icon-bianji2 color" aria-hidden="true"></i>
                                    </span>
                                    <!--编辑模版结束-->
                                    <!--删除模版-->
                                    <span class="pr-40 d-block float-left pointer-content" style="color: #b9b9b9" data-toggle="modal" data-target="#delModel" @click="getDelModelId(item.id,item.template_name)">
                                        <i class="iconfont icon-shanchu1 color" aria-hidden="true"></i>
                                    </span>
                                    <!--删除模版结束-->
                                    
                                    <span class="d-block float-left pointer-content color" data-toggle="modal" data-target="#addQues" @click="getQuesList(item.id)">设置问题</span>
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
                <i class="front-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
                <i class="back-icon iconfont icon-tianjia1 animation-scale-up" aria-hidden="true" style="font-size:30px"></i>
            </button>
        </div>
        <!--添加模版弹框开始-->
        <div class="modal fade" ref="addModelDetails" id="addModelDetails" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title" v-if="modelType == 'add'">添加模版</h4>
                        <h4 class="modal-title" v-else>编辑模版</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">模版名称</div>
                            <div class="col-md-10 float-left pl-0">
                                <input v-model="addModelData.template_name" type="text" class="form-control" placeholder="字数不超过10个汉字或20个字母">
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">模版对象</div>
                            <add-member @change="participantChange"></add-member>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">模版频率</div>
                            <div class="col-md-10 float-left pl-0">
                                <EditSelector :content="addModelData.frequency" :is-edit="isEdit"
                                                      :options="times" @change="changeFrequency"></EditSelector>
                                <!-- <selectors :options="times" placeholder="请选择频率" @change="changeFrequency"></selectors> -->
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
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">设置问题</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <table class="table table-hover" data-plugin="selectable" data-row-selectable="true">
                            <tr>
                                <th class="cell-100" scope="col"></th>
                                <th class="cell-300" scope="col">问题</th>
                                <th class="cell-300" scope="col">操作</th>
                                
                            </tr>
                            <tr v-for="(item,index) in quesList" :key="item.id">
                        
                                <td>{{index+(current_page-1)*per_page+1}}</td>
                                <td>{{item.issues}}</td>
                                <td>
                                    <span class="pr-20 d-block float-left pointer-content" style="color: #b9b9b9;" data-toggle="modal"
                                        data-target="#addQuesDetails" @click="changeQuesType('edit',item.issues,item.type,item.accessory,item.required,item.id)">
                                        <i class="iconfont icon-bianji2" aria-hidden="true"></i>
                                    </span>
                                    <span class="pr-20 d-block float-left pointer-content" style="color: #b9b9b9" data-toggle="modal"
                                        data-target="#delQues" @click="getDelQuesId(item.id)">
                                        <i class="iconfont icon-shanchu1" aria-hidden="true"></i>
                                    </span>
                                    <span class="pr-20 d-block float-left pointer-content" style="color: #b9b9b9" @click="quesUpDown('top',item.id)">
                                        <i class="iicon md-caret-up-circle" aria-hidden="true"></i>
                                    </span>
                                    <span class="d-block float-left pointer-content" style="color: #b9b9b9" @click="quesUpDown('bottom',item.id)">
                                        <i class="md-caret-down-circle" aria-hidden="true"></i>
                                    </span>
                                </td>
                            </tr>
                        </table>
                        <!-- <pagination :current_page="current_page" :method="getlist" :total_pages="total_pages"
                            :total="total"></pagination> -->
                        <button class="btn btn-primary example" type="button" data-toggle="modal" data-target="#addQuesDetails" @click="changeQuesType('add')">添加问题</button>
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
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">
                            <template v-if="modelType == 'add'">设置问题</template>
                            <template v-else>编辑问题</template>
                        </h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <div class="col-md-2 text-right float-left">提问对象</div>
                            <div class="col-md-10 float-left pl-0">
                               <EditAddMember :is-edit="isEdit" @change="participantChange"></EditAddMember>  
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">问题描述</div>
                            <div class="col-md-10 float-left pl-0">
                                <textarea class="form-control" v-model="addQuesData.issues" placeholder="" style="height: 80px;"></textarea>
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left">类型</div>
                            <div class="col-md-10 float-left pl-0">
                                <EditSelector :content="addModelData.type" :is-edit="isEdit"
                                                      :options="type" @change="changeType"></EditSelector>
                                <!-- <selectors style="width: 100%;"  :options="type" placeholder=""></selectors> -->
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 text-right float-left"></div>
                            <div class="col-md-10 float-left pl-0">
                                <div class="checkbox-primary">
                                    <input type="checkbox" v-model="required" id="inputForProject" name="for[]" value="project" required="" data-fv-field="for[]" class="is-valid">
                                    <label class="ml-5" for="inputForProject">设置为必填问题</label>
                                </div>
                            </div>
                        </div>
              
                    </div>
                    <div class="modal-footer pl-5">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="changeQues">确定</button>
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
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="iconfont icon-guanbi"></i></button>
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
        <!--删除问题弹框开始-->
        <div class="modal fade" id="delQues" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" aria-hidden="true" data-dismiss="modal" class="close"><i aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">确认删除</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div class="example">
                            <p>确认删除模版问题吗？删除问题的同时，历史相关的简报信息会一并删除。</p>
                        </div>
        
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white btn-pure" data-dismiss="modal">取消</button>
                        <button class="btn btn-primary" type="submit" @click="deleteQues">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--删除问题弹框结束-->
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
            per_page:20,
            times:config.briefTime,
            type:config.briefType,
            modelType:'add',
            participants:[],
            addModelData:{
                template_name:'',
                colour:'白',
                frequency:1,
                member:'',
            },
            delId:0,
            delName:'',
            isEdit:false,
            editId:'',
            addQuesData:{
               issues:'',
               task_id:'',
               type:1,
               required:false,
               member_id:'',
               accessory:''//添加问题--模版id
            },
            quesList:[],
            required:true,//问题是否为必填
            delQuesId:'',
            editQuesId:''
        }
    },
    computed:{
        
    },
    mounted(){
       this.getlist()
    },
    methods:{
        redirectBriefDetails:function(id){
            
            this.$router.push({path:'/brief/details',query:{id:id}})
        },
        redirectBriefAdd:function(){
            this.$router.push({path:'/brief/add'})
        },
        //获取模版列表
        getlist:function(pageNum = 1){
            
            let data ={
                page:pageNum
            }
            fetch('get',`${config.apiUrl}/report`,data).then((res) => {
                this.list = res.data
                this.current_page = res.meta.pagination.current_page
                this.total_pages = res.meta.pagination.total_pages
                this.total = res.meta.pagination.total
                this.per_page = res.meta.pagination.per_page
            })
        },
        participantChange:function(){
            
            console.log(this.$store.state.participantsInfo)
            
        },


        //模版


        changeModelType:function(type,member,template_name,frequency,id){
            this.isEdit = true
            if(type == 'edit'){
                //获取编辑内容
                this.modelType = 'edit'
                this.$store.state.newParticipantsInfo = member.split(',')
                this.addModelData.template_name =template_name
                this.addModelData.frequency = frequency
                this.editId = id
            }else{
                //清空上次显示弹框填写的内容
                this.modelType ='add'
                this.$store.state.newParticipantsInfo = []
                this.addModelData.template_name =''
                this.addModelData.frequency = 1
            }
            
        },
        //编辑和添加模版
        changeModel:function(){
            let url,type
            let aUser = []
            if(this.$store.state.newParticipantsInfo.length<=0){
                toastr.error('请选择评审人');
                return false
            }
            if(!this.addModelData.template_name){
                toastr.error('请输入模版名称');
                return false
            }
            for (let i = 0; i < this.$store.state.newParticipantsInfo.length; i++) {
                if(this.$store.state.newParticipantsInfo[i].id){
                    aUser.push(this.$store.state.newParticipantsInfo[i].id)
                }else{
                    aUser.push(this.$store.state.newParticipantsInfo[i])
                }
                
            }
            
            this.addModelData.member = aUser.join(',')
            this.modelType == 'add'?url = '/report':url = `/report/${this.editId}`
            this.modelType == 'add'?type = 'post':type='put'
            
            fetch(type,`${config.apiUrl}${url}`,this.addModelData).then((res) =>{
                $('#addModelDetails').modal('hide')
                this.getlist()
            })
        },
        getDelModelId:function(id,name){
           this.delId = id
           this.delName = name
        },
        //删除模版
        deleteModel:function(){
            let _this = this
            let data ={
                template_id:this.delId
            }
            fetch('delete',`${config.apiUrl}/report?all=${this.delId}`).then((res) =>{
                $('#delModel').modal('hide')
                _this.getlist()
            })
        },
        //检查模版名称是否存在
        // isExist:function(){
        //     fetch('get',`${config.apiUrl}/report/all`,{template_name:this.addModelData.template_name}).then((res) =>{
        //         if(res.data.length>0){
        //             alert('简报名称重复，请重新输入')
        //         }
        //     })
        // },
        //改变频次
        changeFrequency:function(value){
            this.addModelData.frequency = value;
        },

        //问题
        getQuesList:function(id,pageNum = 1){
            this.addQuesData.accessory = id
            fetch('get',`${config.apiUrl}/report/issues`,{id:id}).then((res) => {
                
                this.quesList = res.data
                this.current_page = res.meta.pagination.current_page
                this.total_pages = res.meta.pagination.total_pages
                this.total = res.meta.pagination.total
                this.per_page = res.meta.pagination.per_page
            })
        },
        changeQuesType:function(type,issues,quesType,accessory,required,id){
            this.isEdit = true
            if(type == 'edit'){
                this.modelType = 'edit'
                this.addQuesData.issues = issues
                this.addQuesData.type = quesType
                this.addQuesData.required = required
                this.editQuesId = id
            }else{
                this.$store.state.participantsInfo = []
                this.addQuesData.issues =''
                this.modelType = 'add'
            }
        },
        //添加和修改问题  
        changeQues:function(){
            let url,type
            let aUser = []
            
            if(!this.addQuesData.issues){
                toastr.error('请输入问题描述');
                return false
            }
            for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                if(this.$store.state.participantsInfo[i].id){
                    aUser.push(this.$store.state.participantsInfo[i].id)
                }else{
                    aUser.push(this.$store.state.participantsInfo[i])
                }
                
            }
            this.required == true?this.addQuesData.required = 1:this.addQuesData.required = 2
            this.addQuesData.member_id = aUser.join(',')
            this.modelType == 'add'?url = '/report/issues':url = `/report/issues/${this.editQuesId}`
            this.modelType == 'add'?type = 'post':type='put'
            fetch(type,`${config.apiUrl}${url}`,this.addQuesData).then((res) =>{
                $('#addQuesDetails').modal('hide')
                this.getQuesList(this.addQuesData.accessory)
            })
        },
        changeType:function(value){
            this.addQuesData.type = value
        },
        getDelQuesId:function(id){
           this.delQuesId = id
        },
        //删除问题
        deleteQues:function(){

           fetch('delete',`${config.apiUrl}/report/issues?all=${this.delQuesId}`).then((res) =>{
                $('#delQues').modal('hide')
                this.getQuesList(this.addQuesData.accessory);
            })
        },
        //问题的上移和下移
        quesUpDown:function(operation,id){
            let other_id,t
            for (let i = 0; i <this.quesList.length; i++) {
                if(this.quesList[i].id == id){
                    if(i==0||i == this.quesList.length-1){
                        return false
                    }else{
                        if(operation = 'top'){
                            t = i-1
                        }else{
                            t = i+1
                        }
                       
                        other_id = this.quesList[t].id
                    }
                }
                
            }
            let data={
                id:id,
                operation:operation,
                other_id:other_id

            }
            fetch('put',`${config.apiUrl}/report/issues/order/template`,data).then((res) =>{
               
                this.getQuesList(this.addQuesData.accessory);
            })
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


