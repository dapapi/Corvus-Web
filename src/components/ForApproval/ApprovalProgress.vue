<template>
    <div class="page-content container-fluid progress-container pt-0">
        <hr v-if="mode !== 'detail'">
        <div class="approver-row col-md-12 clearfix">
            <div style='min-width:50px;' class="float-left mt-20 ">审批人</div>
            <div class="float-left col-md-10">
                <div class="approver-container float-left mt-20 ml-0" v-for="(item, index) in approver" :key="index">
                    <div class=" noselect" style="display:flex ">
                        <div class="approver-logo" style='font-size:12px; min-width:50px'>
                            <div class="approver" :style="{backgroundImage:'url('+randomColor(item.icon_url).color+')',backgroundColor:randomColor(item.icon_url).color,margin:'0 auto'}">{{randomColor(item.icon_url).name}}</div>
                            <div v-if="!mode" :class="mode?'approver-name':''" style='text-align:center;'>{{item.name}}</div>
                            <i v-if="item.change_state_obj" class="iconfont iconfont-logo" :class="item.change_state_obj.changed_icon.split('|')[0]" :style='{color:item.change_state_obj.changed_icon.split("|")[1]}'></i>
                        </div>
                        <div class="splicer" v-if="index < (approver.length-1)">{{item.length}}</div>

                    </div>
                    <div class="approver_texts" v-if="item.change_state_obj">
                        <p class="approver_text">{{item.name}}</p>
                        <p class="approver_text">{{item.change_state_obj.changed_state}}</p>
                    </div>
                </div>
                <div class="approver-container float-left mt-20" v-if="formstatus">
                    <div class="splicer"></div>
                    <i class="iconfont issueicon" :class="iconSelector.split('|')[0]" :style='{color:iconSelector.split("|")[1]}'></i>
                    <div class="status">{{formstatus}}</div>
                </div>
            </div>
        </div>
        <div class="approval-detail-main example" v-if="formstatus">
            <div class="approval-detail-title col-md-12">
                <div class="col-md-2 ">审批</div>
                <div class="col-md-3">操作</div>
                <div class="col-md-3">审批时间</div>
                <div class="col-md-4">审批意见</div>
            </div>
            <div class="col-md-12 approval-detail-container" v-for="(item, index) in approver" :key="index" v-if="item.approval_stage === 'done'">
                <div class="col-md-2">{{item.name}}</div>
                <div class="col-md-3">{{item.change_state_obj.changed_state}}</div>
                <div class="col-md-3">{{item.change_at}}</div>
                <div class="col-md-4">{{item.comment}}</div>
            </div>  
        </div>
        <div class="col-md-12 mt-20 mb-50" >
            <span v-if="notice || !mode" style='min-width:50px;' class="float-left ">知会人</span>
            <div class="approver ml-10 float-left noselect" :style="{backgroundImage:'url('+randomColor(item.icon_url).color+')',backgroundColor:randomColor(item.icon_url).color}" v-if="mode" v-for="(item, index) in notice" :key="index">{{randomColor(item.icon_url).name}}</div>
            <AddMember v-if="!mode"/>
        </div>
    </div>
</template>

<script>
import config from '@/assets/js/config.js'
import fetch from '@/assets/utils/fetch.js'
export default {
        //这是啥    提交页/详情页   231/232...   知会人
    props:['formid','mode','formstatus','notice','trend'],
    data(){
        return{
            colorArr:['#F23E7C','#FF68E2','#FB8C00','#B53FAF','#27D3A8','#2CCCDA','#38BA5D','#3F51B5'],
            approver:[],
            cover:[],
            waitingFor:'',
            informer:{},
        }
    },
    computed:{
       iconSelector(){
           switch (this.formstatus) {
                case '已审批':
                    return 'icon-tongguo|#4daf50'
                    break;
                case '待审批':
                    return 'icon-tongguo|#e0e0e0'
                    break;
                case '已拒绝':
                    return 'icon-jujue|#fa5a5a'
                    break;
                case '已撤销':
                    return 'icon-chehui|#cacaca'
                    break
           }
       }
    },
    watch:{
        formid:function(value){
            console.log(value);
            this.getApprover(this.formid)
        },
        formstatus:function(value){
            this.getApprover(this.formid)
        },
        'trend.ready':function(value){
            let _this = this
            if(value == true){
                fetch('get','/approvals/chains?form_id='+this.formid+'&change_type=224&value='+this.trend.condition.join(',')).then((params) => {
                    _this.approver = params.data
                    let {meta:{notice:{data}}} = params
                     _this.informer = data
                    _this.$store.dispatch('changeParticipantsInfo',{data:Array.from(_this.informer)});
                    // _this.$store.state.newParticipantsInfo = Array.from(_this.informer)
                })
            }
        },
        'trend':{
            handler:function(newValue,oldValue){
                if(this.trend.ready==true && this.trend.condition[0].length !== 0){
                    var _this = this
                    fetch('get','/approvals/chains?form_id='+this.formid+'&change_type=224&value='+this.trend.condition.join(',')).then((params) => {
                    _this.approver = params.data
                    let {meta:{notice:{data}}} = params
                    _this.informer = data
                    _this.$store.dispatch('changeParticipantsInfo',{data:Array.from(_this.informer)});
                    // _this.$store.state.newParticipantsInfo = Array.from(_this.informer)
                    })
                }
                
            },
            deep:true,
        }
    },
    mounted(){
        this.getApprover(this.formid)
        if(this.notice){
            // this.$store.state.newParticipantsInfo = Array.from(this.notice)
            this.$store.dispatch('changeParticipantsInfo',{data:Array.from(this.notice)});
        }
    },
    methods:{
        getApprover(value){
            if(!this.mode){
                if(!value ){
                    return
                }else if(this.trend){
                    if(this.trend.condition.length === 0){
                        return
                    }
                }

            }
            let _this = this
            if(!this.mode){
                fetch('get','/approvals/chains?form_id='+value+'&change_type=222').then((params) => {
                    _this.approver = params.data
                    let {meta:{notice:{data}}} = params
                    _this.informer = data
                    console.log(data);
                    _this.$store.dispatch('changeParticipantsInfo',{data:Array.from(_this.informer)});
                    // _this.$store.state.newParticipantsInfo = Array.from(_this.informer)
                })
            }else{
                fetch('get','/approval_instances/'+value+'/chains').then((params) => {
                    _this.approver = params.data
                    _this.waitingFor = params.data.find(item=>item.approval_stage === "doing")
                    if(_this.waitingFor){
                        _this.$emit("waitingfor", _this.waitingFor)
                    }else{
                        params.data.reverse()
                        _this.waitingFor = params.data.find(item=>item.approval_stage === "done")
                        _this.$emit("waitingfor", _this.waitingFor)
                        params.data.reverse()
                    }
                })
            }
        },
        randomColor(params){
            if(params){
                let tempArr = params.split('|')
                    return {color:tempArr[0],name:tempArr[1]}

            }else{
                let n = Math.floor(Math.random()*5+1)
                return {backgroundColor:this.colorArr[n]}
            }
        },
    }
}
</script>

<style scoped>
.progress-container{
    padding: 0 45px;

}
.noselect{
     -webkit-touch-callout: none;
     -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     user-select: none;
}
.iconfont-logo{
    position: relative;
    z-index: 1288;
    bottom: 15px;
    left: 30px;
}
.approver-logo{
    padding: 0 auto;
}
.approval-detail-title,.approval-detail-container{
    height: 40px;
    display: flex;
    line-height: 40px;
    border: 1px solid #eeeeee;
}
.approval-detail-title{
    background: #f5f5f5;
}

.approver_text{
    margin-left: 5px;
    margin-bottom: 0;
    font-size: 5px;
    min-width: 50px;
}
*::-webkit-scrollbar {
        width: 3px !important;
        height: 3px !important;
        -webkit-appearance: none;
    }

    *::-webkit-scrollbar-thumb {
        background: #ddd !important;
        border-radius: 10px !important;
    }

    *::-webkit-scrollbar-track-piece {
        background: #eee !important;
        border-radius: 3px !important;
    }
.approver-row span{
    margin-right: 20px;
    line-height: 40px;
}

.approver-container{
    display: flex;
    
}
.splicer{
    width: 60px;
    height: 2px;
    margin: 20px 10px 0 10px;
    background-color: #E0E0E0;
}
.approver{
    background-size: 30px;
    font-size: 12px;
    font-weight: 800;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    /* background-color: rgba(7, 17, 27, 0.2); */
    text-align: center;
    line-height: 30px;
}
.approver-name{
    font-size: 8px;
    min-width: 200px;
}
.status{
    font-size: 16px;
    font-weight: 800;
    width: 60px;
    height: 40px;
    /* margin-left: -5px; */
    /* background-color: rgba(7, 17, 27, 0.2); */
    text-align: center;
    line-height: 40px;
}
.issueicon{
    font-size: 20px;
    line-height: 45px;
}
</style>
