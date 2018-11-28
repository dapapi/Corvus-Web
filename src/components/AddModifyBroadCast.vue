<template>
<!--功能：文本增删改查
    依赖：Flag.vue确认组件
    说明： By 王骁
    本组件可实现基本的弹出框增删改查文本内容
    因目前无后台api支持
    暂时只有视觉效果，无后台交互 -->
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
                    class="front-icon md-plus animation-scale-up"></i>
                    <i aria-hidden="true" 
                    class="back-icon md-plus animation-scale-up"></i>
            </button>
        </div>
        <div id="addNewBroadcast" 
            class="bootbox modal fade modal-simple" 
            tabindex="-1" 
            role="dialog" 
            style="display: hidden">
            <div class="modal-dialog modal-lg modal-info">
                <div class="modal-content">
                    <div class="modal-body">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" style="margin-top: 10px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16">
                                <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
                            </svg>
                        </button>
                        <button type="button" data-target="#confirmFlag" data-toggle="modal" class="bootbox-close-button close" aria-hidden="true" style="margin-top: 10px;">
                            <svg width="12" height="16" viewBox="0 0 12 16">
                                <path fill-rule="evenodd" d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"/>
                            </svg>
                        </button>
                        <div class="bootbox-body"><h4>{{pageType}}公告</h4></div>
                        <br/>
                        <div class="form-group row col-sm-12">
                            <label for="" class="col-sm-2 col-form-label"><strong>标题内容</strong></label>
                                <input type="text" class="form-control col-sm-10" id="" placeholder="输入标题" v-model="title">
                        </div>
                        <div class="form-group row col-sm-12">
                            <label for="" class="col-sm-2 col-form-label"><strong>公告范围</strong></label>
                            <select id="broadcastRangeSelector" class="col-sm-3 show-menu-arrow form-control selectpicker" multiple data-selected-text-format="count > 4" title="请选择" v-model="range">
                                <option>技术团队</option>
                                <option>安全团队</option>
                            </select>
                            <label for="" class="offset-sm-2 col-sm-2 col-form-label"><strong>选择分类</strong></label>
                            <select id="broadcastTypeSelector" class="col-sm-3 selectpicker show-menu-arrow form-control" :title="type?type:'请选择'" v-model="type">
                                <option>升级</option>
                                <option>漏洞预警</option>
                            </select>
                        </div>
                        <div class="summernote" id="summernote"></div>
                        <Upload class="upload" url="javascript:void()">上传附件</Upload>
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
export default {
    props:['noteData'],
    data(){
        return{
            title:'',       //标题内容
            range:[],       //公告范围
            type:'',        //公告类型
            topFlag:false,  //置顶标示
            text:'',        //富文本代码
            newFlag:true,   //未读标示
            pageType:'发布'
        }
    },
    created(){
        this.noteInit()
    },
    mounted(){
        this.getSummernote()
        this.setNote()
        this.modalInit()
    },
    methods:{
        noteInit(){
            if(this.noteData){
                this.pageType = '修改'
                this.title = this.noteData.title
                this.range = this.noteData.range
                this.type = this.noteData.type
                this.topFlag = this.noteData.topflag
                this.text = this.noteData.text
            }
            this.$nextTick(() => {
                $('#broadcastRangeSelector').selectpicker('render');
                $('#broadcastRangeSelector').selectpicker('refresh');
                $('#broadcastTypeSelector').selectpicker('render');
                $('#broadcastTypeSelector').selectpicker('refresh');
            })
        },
        //修复富文本编辑器多层弹窗bug
        modalInit(){
            $('.summernoteUploadModal').click(() => {
                $('.summernoteUploadModal').modal('hide');
            })
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
            $('#addNewBroadcast').modal('hide')
        },
        //富文本内容初始化
        setNote(){
            if(this.text){
                $('#summernote').summernote('code', this.text);
            }else{
                $('#summernote').summernote('code', "输入内容...");
            }
        },
        //获取富文本代码
        getNote(){
            var markupStr = $('#summernote').summernote('code');
            this.text = markupStr
        },
        sendNote(){
            if(this.type){
                var markupStr = $('#summernote').summernote('code');
                this.text = markupStr
                let currenttime = Date.now()
                let sendData = {
                    title:this.title,       //标题内容
                    range:this.range,       //公告范围
                    type:this.type,        //公告类型
                    topFlag:this.topflag,  //置顶标示
                    text:this.text,        //富文本代码
                    newFlag:1,             //未读标示
                    time:currenttime
            }
            this.$emit('sendnote',sendData)
             $('#addNewBroadcast').modal('hide');
            }else{
                alert('请选择分类')
            }
        }
    }
}
</script>

<style scoped>
.upload{
    width:88px;
    height:30px;
    font-weight:400;
    color:rgba(50,152,220,1);
}
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
