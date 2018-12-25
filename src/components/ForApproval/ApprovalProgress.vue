<template>
    <div class="page-content container-fluid">
        <hr v-if="mode !== 'detail'">
        <div class="approver-row">
            <span>审批人</span>
            <div class="approver-container" v-for="(item, index) in approver" :key="index">
                <div class="approver-container">
                    <div class="splicer" v-if="index !== 0"></div>
                    <div class="approver" :style="randomColor()">{{item.name.slice(-1)}}</div>
                </div>
                <div class="approver_texts" v-if="item.change_state_obj">
                    <p class="approver_text">{{item.name}}</p>
                    <p class="approver_text">{{item.change_state_obj.changed_state}}</p>
                </div>
            </div>
            <div class="approver-container" v-if="formstatus">
                <div class="splicer"></div>
                <div class="status">{{formstatus}}</div>
            </div>
        </div>
        <div class="approval-detail-main example" v-if="formstatus">
            <div class="approval-detail-title col-md-12">
                <div class="col-md-3 ">审批</div>
                <div class="col-md-6">操作</div>
                <div class="col-md-3">审批时间</div>
            </div>
            <div class="col-md-12 approval-detail-container" v-for="(item, index) in approver" :key="index" v-if="item.approval_stage === 'done'">
                <div class="col-md-3">{{item.name}}</div>
                <div class="col-md-6">{{item.change_state_obj.changed_state}}</div>
                <div class="col-md-3">{{item.change_at}}</div>
            </div>  
        </div>
        <div class="approver-row">
            <span>知会人</span>
            <AddMember />
        </div>
    </div>
</template>

<script>
import config from '@/assets/js/config.js'
import fetch from '@/assets/utils/fetch.js'
export default {
    props:['formid','mode','formstatus'],
    data(){
        return{
            colorArr:['#F23E7C','#FF68E2','#FB8C00','#B53FAF','#27D3A8','#2CCCDA','#38BA5D','#3F51B5'],
            approver:[],
            cover:[],
            waitingFor:''
        }
    },
    computed:{
       
    },
    watch:{
        formid:function(value){
            this.getApprover(value)
        },
        formstatus:function(value){
            this.getApprover(this.formid)
        },
    },
    mounted(){
        this.getApprover(this.formid)
    },
    methods:{
          getApprover(value){
              if(!value){
                  return
              }
                let _this = this
                if(!this.mode){
                    fetch('get','/approvals/chains?form_id='+value+'&change_type=222&value').then((params) => {
                        _this.approver = params.data
                    })
                }else{
                    fetch('get','/approval_instances/'+value+'/chains').then((params) => {
                        _this.approver = params.data
                        _this.waitingFor = params.data.find(item=>item.approval_stage === "doing")
                        if(_this.waitingFor){
                            _this.$emit("waitingfor", _this.waitingFor)
                        }else{
                            _this.$emit("waitingfor", params.data[params.data.length-1])
                        }
                    })
                }
            },
        randomColor(){
            let n = Math.floor(Math.random()*5+1)
            return {backgroundColor:this.colorArr[n]}
        }
    }
}
</script>

<style scoped>
.approval-detail-title,.approval-detail-container{
    height: 40px;
    display: flex;
    line-height: 40px;
    border: 1px solid #eeeeee;
}
.approval-detail-container div,.approval-detail-title div{
    /* border: 1px solid #eeeeee; */
    
}
.approval-detail-title{
    background: #f5f5f5;
}
.approver_texts{
    margin-top: 5px;
}
.approver_text{
    margin-left: 5px;
    margin-bottom: 0;
    font-size: 5px;
}
.approver-row{
    display: flex;
    margin-top: 30px; 
    margin-left: 10%;  
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
    margin: 20px 20px 0 20px;
    background-color: #E0E0E0;
}
.approver{
    font-size: 18px;
    font-weight: 800;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    /* background-color: rgba(7, 17, 27, 0.2); */
    text-align: center;
    line-height: 40px;
}
.status{
    font-size: 16px;
    font-weight: 800;
    width: 80px;
    height: 40px;
    /* background-color: rgba(7, 17, 27, 0.2); */
    text-align: center;
    line-height: 40px;
}
</style>
