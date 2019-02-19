<template>
<!--
    功能：文本增删改查
    依赖：Flag.vue确认组件
    说明： By 王骁
    本组件可实现基本的弹出框增删改查文本内容
 -->
    <div>
        <div data-plugin="actionBtn" 
            data-toggle="modal" 
            data-target="#addNewBroadcast" 
            class="site-action"
            aria-hidden="true"
            data-backdrop="static"
            v-if="pageType === '发布'">
            <button type="button"  
                class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic"
                @click='setNote'>
                <i aria-hidden="true" 
                    class="front-icon iconfont icon-tianjia1 animation-scale-up" style="font-size:30px"></i>
                    <i aria-hidden="true" 
                    class="back-icon iconfont icon-tianjia1 animation-scale-up" style="font-size:30px"></i>
            </button>
        </div>
        <div id="addNewBroadcast" 
            class="bootbox modal fade modal-simple" 
            tabindex="-1" 
            role="dialog"
             data-backdrop="static"
            style="display: hidden">
            <div class="modal-dialog modal-lg modal-info">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" style="margin-top: 10px;" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16">
                                <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
                            </svg>
                        </button>
                        <!-- <button type="button" data-target="#confirmFlag" data-toggle="modal" class="bootbox-close-button close" aria-hidden="true" style="margin-top: 10px;" v-if="pageType === '修改'">
                            <svg width="12" height="16" viewBox="0 0 12 16">
                                <path fill-rule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"/>
                            </svg>
                        </button> -->
                        <div class="bootbox-body"><h4>{{pageType}}公告</h4></div>
                        <br/>
                        <div class="form-group row col-sm-12">
                            <label for="" class="col-sm-2 col-form-label"><strong>标题内容</strong></label>
                            <input type="text" class="form-control col-sm-10" id="" placeholder="输入标题" v-model="title">
                        </div>
                        <div class="form-group row col-sm-12">
                            <label for="" class="col-sm-2 col-form-label"><strong>公告范围</strong></label>
                            <selectors class="scopeSelector col-sm-4" ref='scopeSelector' :options="departments" @valuelistener="changeDepartments"  multiple='true' :placeholder='"请选择范围"'></selectors>
                            <label for="" class="col-sm-2 col-form-label text-right"><strong>选择分类</strong></label>
                            <selectors ref='classifySelector' class="col-sm-4" :options="classifyArr" @change="changeClassify" placeholder='请选择类型' ></selectors>
                        </div>
                        <div class="summernote" id="summernote"></div>
                        <File-Uploader class="upload" url="javascript:void()" @changePlus="fileUploaded" :givenfilename='givenfilename' @deleteAtachment='deleteAttachment' broadcast='true'>上传附件</File-Uploader>
                        <!-- <figure style="text-align:center;width:100px" v-for="(item, index) in items" :key="index" class="attachdetail ml-20"> 
                            <img src="@/assets/img/attachment.png" alt="" style="width:40px">
                            <p class="pt-10">{{fileName ||"未选择任何附件"}}</p>
                            <div class="img-control">
                                <div class="icon-control">
                                    <a :href="fileUrl" target="_blank">
                                        <i class="iconfont icon-liulan"></i>
                                    </a>
                                    <i class="iconfont icon-shanchu1" @click="imgDelete"></i>
                                </div>
                            </div>
                        </figure> -->
                        <br/>
                        <input type="checkbox" v-model="topFlag">
                        <span class="set-top-flag" >&nbsp;&nbsp;置顶</span>
                    </div>
                    
                    <div class="modal-footer">
                        <button data-bb-handler="confirm" type="button" class="btn btn-primary" @click="sendNote">发布</button>
                        <button data-bb-handler="cancel" type="button" class="btn btn-default" data-dismiss="modal" @click='getNote'>取消</button>
                    </div>
                </div>
            </div>
        </div>
        <Flag typeText="删除" @confirmFlag="confirmDelete" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import fetch from '@/assets/utils/fetch.js'
import config from '@/assets/js/config'

export default {
    props:['notedata','givenfilename'],
    data(){
        return{
            title:'',               //标题内容
            range:[],               //公告范围
            type:'',                //公告类型
            topFlag:1,              //置顶标示
            text:'',                //富文本代码
            newFlag:true,           //未读标示
            pageType:'发布',         //组件模式
            accessory:'',           //附件内容
            is_accessory:false,     //是否携带附件
            departments:{},         //公告范围
            classifyArr:config.classifyArr, 
            scope:[],
            accessory_name:'',
            whoamiid:'',
            creator_id:'',
            affix:[],
        }
    },
    created(){
        if (this.department.length > 0) {
            this.departments = this.department
        }
    },
    mounted(){
        this.noteInit()
        this.getSummernote()
        this.setNote()
        this.modalInit()
    },
    computed: {
        ...mapState([
            'department',
        ]),
        _department () {
            return this.department
        },
    },
    watch:{
        notedata:function(value){
            let {creator:{data:{id = '-'}}} = value
            this.creator_id = id
            this.noteInit()
            this.setNote()
        },
        accessory:function(){
            if(this.accessory){
                this.is_accessory = true
            }else{
                this.is_accessory = false
            }
        },
        _department () {
            this.departments = this.department
        }
    },
    methods:{
        deleteAttachment(){
            this.accessory_name = ''
            this.accessory = ''
        },
        //数据初始化
        noteInit(){
            if(this.notedata){
                this.pageType = '修改'
                this.title = this.notedata.title
                this.range = this.notedata.scope
                this.type = this.notedata.classify
                this.topFlag = this.notedata.stick
                this.text = this.notedata.desc
            }
            this.scope = []
            if(this.range){
                for (const key in this.range.data) {
                    this.scope.push(this.range.data[key].department_id)
                }
            }
            this.$nextTick(() => {
                this.$refs.scopeSelector.setValue(this.scope)            //设置默认值
                this.$refs.classifySelector.setValue(this.type)
            })
        },
    
        //修复富文本编辑器多层弹窗bug
        modalInit(){
            $('.summernoteUploadModal').click(() => {
                $('.summernoteUploadModal').modal('hide');
            })
        },
        //公告范围选择（数组）
        changeDepartments(value){
            this.scope = value
        },
        //公告类型选择
        changeClassify(value){
            this.type = value
        },
        //富文本编辑器初始化
        getSummernote(){
            $('#summernote').summernote({
                tabsize: 2,
                height: 300,
                
            });
        },
        
        //清空数据并关闭窗口
        confirmDelete(){
            this.title = ''
            this.range = []
            this.type = ''
            this.text = ''
            let currentId = this.$route.params.id
            fetch('delete','/announcements/'+currentId)
            toastr.success('删除成功')
            $('#addNewBroadcast').modal('hide')
            this.$router.push('/broadcast/')
        },
        //富文本内容初始化
        setNote(){
            if(this.text){
                $('#summernote').summernote('code', this.text);
            }else{
                // $('#summernote').summernote('code', "输入内容...");
            }
        },
        //获取富文本代码
        getNote(){
            var markupStr = $('#summernote').summernote('code');
            this.text = markupStr
        },
        // 发送数据
        sendNote(){
            let _this = this
             var markupStr = $('#summernote').summernote('code');
                this.text = markupStr
                let currenttime = Date.now()
                let topflag = Number(this.topFlag)
                this.sendData = {
                    title:this.title,                       //标题内容
                    scope:this.scope,                       //公告范围
                    classify : this.type,                   //公告类型
                    stick:topflag,                          //置顶标示
                    desc:this.text,                         //富文本代码
                    is_accessory : this.is_accessory,       //是否带附件
                    // accessory : this.accessory,             //附件内容
                    readflag : 0, 
                    // accessory_name : this.accessory_name            
                    affix:this.affix      
            }
            //发布模式
            if(this.pageType === '发布'){
                fetch('post','/announcements/',this.sendData).then((params) => {
                    $('#addNewBroadcast').modal('hide');
                    _this.$emit('refresh')
                })
            //修改模式
            }else{
                let currentId = this.$route.params.id
                fetch('put','/announcements/'+currentId,this.sendData).then((params) => {
                    $('#addNewBroadcast').modal('hide');
                    _this.title = ''
                    _this.range = []
                    _this.type = ''
                    _this.text = ''
                    _this.$emit('refresh')
                })
                
            }
        },
        //上传
        fileUploaded(value){
            let currentId = this.$route.params.id
            let attachData = {
                title:value.fileName,
                url:value.fileUrl,
                size:value.fileSize,
                type:1
            }
            this.affix.push(attachData)
            // fetch('post','/announcements/'+currentId+'/affix',attachData).then((params) => {
                
            // })
            // console.log(value);
            // this.accessory_name = value.fileName
            // this.accessory = value.fileUrl
        }
    }
}
</script>

<style scoped>
/* .upload{
    width:88px;
    height:30px;
    font-weight:400;
    color:rgba(50,152,220,1);
} */
.set-top-flag{
    width:44px;
    height:30px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:30px;
}
.bootbox-close-button{
    margin-left:20px;
}


</style>
