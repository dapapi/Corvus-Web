<template>
    <div class="modal fade" ref="addModelDetails" id="submitReport" aria-hidden="true" aria-labelledby="addLabelForm" role="dialog" tabindex="-1" data-backdrop="static">
        <div class="modal-dialog modal-simple">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" aria-hidden="true" data-dismiss="modal" class="close" @click="modalclose"><i aria-hidden="true" class="iconfont icon-guanbi"></i></button>
                        <h4 class="modal-title">简报</h4> 
                </div>
                <div class="modal-body clearfix">
                    <div class="row example">
                         <div class="col-md-4">
                            <p>{{tempName}}</p>
                            <p>{{temDetails.updated_at}}</p>
                         </div>
                         <div class="col-md-8 clearfix text-right mb-20">
                            <div class="right mb-10">
                                <span class="pr-10">创建人</span>
                                <span>{{temDetails.creator_id}}</span>
                                <span class="pr-10 pl-30">当前状态</span>
                                <span v-show="templateStatus == 1">待{{temDetails.reviewer_id}}评审</span>
                                <span v-show="templateStatus == 2">{{temDetails.reviewer_id}}已评审</span>
                            </div>
                            <button class="btn btn-primary" v-show="templateStatus == 1" @click="review(2)">评审</button>
                            <div v-show="templateStatus == 2" style="color:#4DAF50">评审通过</div>
                         </div>
                    </div>
                    <!--问题列表开始-->
                    <ul class="list-group mt-10">
                        <li class="list-group-item p-0 mb-10 pb-10 clearfix" v-for="(item,index) in list" :key="item.id">
                            
                            <!--问题-->
                            <div class="float-left">
                                
                                
                                <p v-if="item.type == 4" class="list-group-item-heading mt-0 mb-5">{{index+1}}.{{item.issues}}</p>
                                <p v-else>{{index+1}}.{{item.issues}}</p>

                                <div v-if="item.type == 4" class="taskList">
                                    <div class="ml-15"  v-for="(item2,index) in item.answer" :key="index">
                                        <i class="icon icon md-email-open"></i>
                                    <router-link class="mr-10" :to="`/tasks/${item2.id}`">{{item2.title}}</router-link>
                                    </div>
                                </div>
                                <div class="pt-10 uploadContent" v-else-if="item.type == 5" >
                                
                                <div v-for="(item3,index) in item.answer" :key="index"><a :href="item3.url">{{item3.name}}</a></div>
                                
                                </div>
                                <div class="pt-10"  v-else>{{item.answer}}</div>
                            </div>
                            <div class="float-right">
                            
                                    <i class="iconfont icon-bianji21"></i>
                             
                            </div>
                            <!--填写答案-->
                        </li>
                    </ul>
                    
                    <div id="selctStaff" v-show="isIf">
                         <select-staff :multiple="true" :member-type="'participant'" 
                            @change="changeSelectedMember"></select-staff>
                    </div>
                    
                </div>
                    <!--问题列表结束-->
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .list-group-item{
        border-bottom:1px solid #f4f4f4;
    }
</style>
<script>
import fetch from '@/assets/utils/fetch'
import env from '@/assets/js/env'
export default {
    props:{
       templateId:'',//添加问题之后新生成的id
       templateStatus:'',
       quesId:'',
       tempName:''
    },
    data(){
        return {
           list:[],
           isIf:false,
           flagId:'',
           temDetails:{}
        }
    },
    watch:{
        templateId:function(){
            this.getDetails()
        },
        
    },
    mounted(){
        this.globalClick(this.closeStaff);
    },
    methods:{
        getId:function(id){        
            //给人员选择设置位置
            let top = $(`#id_${id}`).offset().top - $('.modal-body').offset().top+20;
            $('#selctStaff').css({
                'right':'30px',
                'top':top
            })
            this.flagId = id
            this.isIf = true
            
        },
        //获取简报详情
        getDetails:function(){
            
            fetch('get',`${env.apiUrl}/review/${this.templateId}?include=issues`).then((res) => {
                this.temDetails= res.data
                this.list = res.data.issues.data
                for (let i = 0; i < this.list.length; i++) {
                    if(this.list[i].type == 4||this.list[i].type == 5){
                        this.list[i].answer = JSON.parse(this.list[i].answer)
                    }
                    
                }
            })
        
        },
        modalclose(){
           $('.modal-backdrop').remove()
        },
        //提交评审
        review:function(status){
            
            fetch('put',`${env.apiUrl}/review/${this.templateId}`,{status:status}).then((res) => {
                toastr.success('评审成功');
                $('#submitReport').modal('hide')
                this.$emit('refresh')
            })
        },
        //跟进  ---接口有问题
        changeSelectedMember:function(){
           
           this.isIf = true
           let id = this.$store.state.newParticipantsInfo[0].id
           fetch('post',`${env.apiUrl}/issues/${id}/follow_up`,{content:'跟进'}).then((res) => {
                toastr.success('跟进成功');
                this.$store.state.newParticipantsInfo = []
                this.getDetails()
            })
           
        },
        closeStaff:function(event){
            let tag = document.getElementById('selctStaff')
            let tag2 = document.getElementById(`id_${this.flagId}`)
            if (tag&&tag2) {
                if (!tag.contains(event.target)&&!tag2.contains(event.target)) {
                    this.isIf = false;
                }
            }
        }
    }
}
</script>

<style scoped>
    .show{
        display: none
    }
    #selctStaff{
        position: absolute;
        width: 20rem;
        height: 400px;
    }

</style>


