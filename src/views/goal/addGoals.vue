<template>
    <div>
        <div class="modal fade" id="goals-add" aria-labelledby="approval-great-module" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalTitle">新建目标</h4>
                    </div>
                    <div class="modal-body modal-greater ">
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标范围</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" :options='selectorData.goalRanger' @change='(params)=>changeHandeler(params,"range")'
                                :default='defaultHandler("range")'       selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix" v-if="goalRange == 2">
                            <div class="col-md-2 text-right float-left px-0 require">选择部门</div>
                            <div class="col-md-10 float-left">
                                <DropDepartment :data="selectorData.department" @change='(params)=>changeHandeler(params,"department_id")'/>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标周期</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" :options='goalperiod' @change='(params)=>changeHandeler(params,"period_id")'
                                 :default='defaultHandler("period_id")'       selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标名称</div>
                            <div class="col-md-10 float-left">
                                <input ref="trails" class="form-control" :value='sendData.tile || defaultHandler("title")' @change='(params)=>changeHandeler(params.target.value,"title")'>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标类型</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" :options='selectorData.goalSort' @change='(params)=>changeHandeler(params,"type")'
                                 :default='defaultHandler("type")'       selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix" v-if="goalSort == 1">
                            <div class="col-md-2 text-right float-left px-0 require">金额类型</div>
                            <div class="col-md-4 float-left">
                                  <Selectors ref="trails" :options='selectorData.countSort' @change='(params)=>changeHandeler(params,"amount_type")'
                                     :default='defaultHandler("amount_type")'     selectable="true"></Selectors>
                            </div>
                            <div class="col-md-2 text-right float-left px-0 require">目标金额/元</div>
                            <div class="col-md-4 float-left">
                                <input  class="form-control" @change='(params)=>changeHandeler(params.target.value,"amount")'/>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix" v-if="goalSort">
                            <div class="col-md-2 text-right float-left px-0 require">维度</div>
                            <div class="col-md-4 float-left">
                                  <Selectors ref="trails" :options='selectorData.Dimensions' @change='(params)=>changeHandeler(params,"position")'
                                    :default='defaultHandler("position")'     selectable="true"></Selectors>
                            </div>
                            <div class="col-md-2 text-right float-left px-0 require" v-if="Dimensions == 2">艺人级别</div>
                            <div class="col-md-4 float-left" v-if="Dimensions == 2">
                                  <Selectors ref="trails" :options='selectorData.levelArr' @change='(params)=>changeHandeler(params,"talent_level")'
                                     :default='defaultHandler("talent_level")' selectable="true"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标级别</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" :options='selectorData.levelArr' @change='(params)=>changeHandeler(params,"aim_level")'
                                 :default='defaultHandler("aim_level")'       selectable="true"></Selectors>
                            </div>
                        </div>
                       
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors @change='(params)=>changeHandeler(params,"principal")'
                                 :propSelectMemberName='(defaultdata && defaultdata.principal_name)|| ""' :propSelectMemberId='(defaultdata && defaultdata.principal_id) || ""'       ></InputSelectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0">目标描述</div>
                            <div class="col-md-10 float-left">
                                <textarea class="form-control" @change='(params)=>changeHandeler(params.target.value,"desc")'
                                 :value="sendData.desc || defaultHandler('desc')"       ></textarea>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0">父目标</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" @change='(params)=>changeHandeler(params,"parents_ids")'
                                :options='allGoals' :default='defaultHandler("parents")' :multiple='true'   selectable="true"></Selectors>
                            </div>
                        </div>
                        <!-- <div v-for="(item, index) in moduleInfo" :key="index" class="great-option example ">
                            <div :is='sortChecker(item)' :ref='item[0].control.data_dictionary_id'
                                 :consdata='item' :predata='sendData' class="container"
                                 :singlemode='singlemode' :clear='clearFlag' :directional-sender='directionalData'
                                 @change="changeHandler" @directional='directionalWatcher' is-selectable='true'
                                 :formid='form_id' :startDate="start_date"></div>
                        </div> -->
                    </div>
                    <div class="modal-footer">
                         <button type="button" class="btn btn-primary waves-effect waves-light waves-round" style="overflow:hidden" :disabled='submitLoading' @click='goalSubmit'
                                >{{submitLoading?'':'确定'}}<CircleLoading style="" v-if="submitLoading"/>
                        </button>
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round"
                                data-dismiss="modal" >取消
                        </button>
                       
                    </div>
                </div>
            </div>
        </div>       

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import fetch from "../../assets/utils/fetch.js";
import config from '../../assets/js/config'

export default {
    
    props:['goalperiod','defaultdata'],
    data(){
        return {
            selectorData:{
                levelArr:config.taskLevelArr,
                goalRanger:config.goalRanger,
                goalSort:config.goalSort,
                countSort:config.countSort,
                Dimensions:config.Dimensions,
            },
            sendData:{},
            goalSort:'',
            goalRange:'',
            Dimensions:'',
            submitLoading:false,
            allGoals:[],
        }
    },
    created(){
    },
    computed:{
         ...mapState([
            'department',
        ]),
        _department () {
            return this.department
        },
        defaultHandler(){
            return (params)=>{
                if(!this.defaultdata){
                    return ''
                }else if(params === 'parents'){
                    return this.defaultdata.parents.data.flatMap((x)=>[String(x.id)])
                }
                else{
                    return this.defaultdata[params]
                }
            }
            
        }
    },
    watch: {
        defaultdata:function(){
            // this.sendData =  this.defaultdata
            let key = ['title','range','department_id','period_id','type','amount_type','amount','position','aim_level','talent_level','desc']
            for (const iterator of key) {
                if(this.defaultdata[iterator]){
                    this.sendData[iterator] = this.defaultdata[iterator]
                }
                
            }
            this.sendData.principal={
                id:this.defaultdata.principal_id,
                name:this.defaultdata.principal_name
            }
        }
    },
    mounted() {   
        this.getAllGoals()
    },
    methods:{
        getAllGoals(){
            fetch('get','/aims/all').then((params) => {
                this.allGoals = params.data
            })

        },
        goalSubmit(){
            this.submitLoading = true
            fetch('post','aims',this.sendData).then((params) => {
                this.submitLoading = false
                toastr.success('提交成功')
                this.$emit('submitDone')
            }).catch((params) => {
                this.submitLoading = false                
            })
        },
        changeHandeler(params,value){
            if(params){
                console.log(params,value);
                if(value==='range'){
                    this.goalRange = params
                }else if(value === 'type'){
                    this.goalSort = params
                }else if(value === 'position'){
                    this.Dimensions = params
                }
                this.sendData[value] = params
            }
        }
    }
}
</script>

<style scope>
.modal-body .example {
        display: flex;
        align-items: center;

    }
/* button{
    height: 50px;
    overflow: hidden;
} */
</style>
