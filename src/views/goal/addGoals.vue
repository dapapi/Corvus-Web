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
                                <Selectors ref="trails" :options='selectorData.goalRanger' @change='(params)=>changeHandeler(params,"goalRange")'
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix" v-if="goalRange == 2">
                            <div class="col-md-2 text-right float-left px-0 require">选择部门</div>
                            <div class="col-md-10 float-left">
                                <DropDepartment :data="selectorData.department" @change='(params)=>changeHandeler(params,"department")'/>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标周期</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" @change='(params)=>changeHandeler(params,"interval")'
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标名称</div>
                            <div class="col-md-10 float-left">
                                <input ref="trails" class="form-control" @change='(params)=>changeHandeler(params.target.value,"goalName")'>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标类型</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" :options='selectorData.goalSort' @change='(params)=>changeHandeler(params,"goalSort")'
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                         <div class="col-md-12 example clearfix" v-if="goalSort == 1">
                            <div class="col-md-2 text-right float-left px-0 require">金额类型</div>
                            <div class="col-md-4 float-left">
                                  <Selectors ref="trails" :options='selectorData.countSort' @change='(params)=>changeHandeler(params,"countSort")'
                                        selectable="true"></Selectors>
                            </div>
                            <div class="col-md-2 text-right float-left px-0 require">目标金额/元</div>
                            <div class="col-md-4 float-left">
                                <input  class="form-control" @change='(params)=>changeHandeler(params.target.value,"goalCount")'/>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix" v-if="goalSort">
                            <div class="col-md-2 text-right float-left px-0 require">维度</div>
                            <div class="col-md-4 float-left">
                                  <Selectors ref="trails" :options='selectorData.Dimensions' @change='(params)=>changeHandeler(params,"Dimensions")'
                                        selectable="true"></Selectors>
                            </div>
                            <div class="col-md-2 text-right float-left px-0 require" v-if="Dimensions == 2">艺人级别</div>
                            <div class="col-md-4 float-left" v-if="Dimensions == 2">
                                  <Selectors ref="trails" :options='selectorData.levelArr' @change='(params)=>changeHandeler(params,"starLevel")'
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">目标级别</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" :options='selectorData.levelArr' @change='(params)=>changeHandeler(params,"goalLevel")'
                                        selectable="true"></Selectors>
                            </div>
                        </div>
                       
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0 require">负责人</div>
                            <div class="col-md-10 float-left">
                                <InputSelectors @change='(params)=>changeHandeler(params,"participant")'
                                        ></InputSelectors>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0">目标描述</div>
                            <div class="col-md-10 float-left">
                                <textarea class="form-control" @change='(params)=>changeHandeler(params.target.value,"targetDescription")'
                                        ></textarea>
                            </div>
                        </div>
                        <div class="col-md-12 example clearfix">
                            <div class="col-md-2 text-right float-left px-0">父目标</div>
                            <div class="col-md-10 float-left">
                                <Selectors ref="trails" @change='(params)=>changeHandeler(params,"parentGoal")'
                                        selectable="true"></Selectors>
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
                         <button type="button" class="btn btn-primary waves-effect waves-light waves-round"
                                >确定
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
        }
    },
    computed:{
         ...mapState([
            'department',
        ]),
        _department () {
            return this.department
        }
    },
    methods:{
        changeHandeler(params,value){
            if(params){
                console.log(params,value);
                if(value==='goalRange'){
                    this.goalRange = params
                }else if(value === 'goalSort'){
                    this.goalSort = params
                }else if(value === 'Dimensions'){
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
</style>
