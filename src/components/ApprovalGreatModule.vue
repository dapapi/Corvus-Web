<template>
    <div>
        <div class="modal fade" id="approval-great-module" aria-labelledby="approval-great-module" role="dialog"
             tabindex="-1" data-backdrop="static">
            <div class="modal-dialog modal-simple">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title" id="exampleModalTitle">{{pageInfo.title}}</h4>
                    </div>
                    <div class="modal-body modal-greater ">
                        <div v-for="(item, index) in moduleInfo" :key="index" class="great-option example ">
                            <div :is='sortChecker(item)' :ref='item[0].control.data_dictionary_id'
                                 :consdata='item' :predata='sendData' class="container"
                                 :singlemode='singlemode' :clear='clearFlag' :directional-sender='directionalData'
                                 @change="changeHandler" @directional='directionalWatcher' is-selectable='true'
                                 :formid='form_id' :startDate="start_date"></div>
                            <!-- ⬆️核心模块 -->
                        </div>
                        <ApprovalProgress :formid='form_id' :trend='trendApprover.condition[0]?trendApprover:""'
                                          :free-progress='isFree'/>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round"
                                data-dismiss="modal" @click='clearSignal'>取消
                        </button>
                        <button type="button" class="btn btn-primary waves-effect waves-light waves-round"
                                @click='approvalSubmit'>提交
                        </button>
                    </div>
                </div>
            </div>
        </div>
      <DocPreview :url='$store.state.previewurl' :detailpage='detailpage' />

        
    </div>
</template>

<script>
    import fetch from '@/assets/utils/fetch.js'
    import ApprovalDiv from '@/components/ForApproval/ApprovalDiv'
    import ApprovalSummerNote from '@/components/ForApproval/ApprovalSummerNote'
    import ApprovalUploader from '@/components/ForApproval/ApprovalUploader'
    import ApprovalImageUploader from '@/components/ForApproval/ApprovalImageUploader'
    import ApprovalMultiple from '@/components/ForApproval/ApprovalMultiple'
    import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker'
    import ApprovalText from '@/components/ForApproval/ApprovalText'
    import ApprovalTextArea from '@/components/ForApproval/ApprovalTextArea'
    import ApprovalSelector from '@/components/ForApproval/ApprovalSelector'
    import ApprovalNumber from '@/components/ForApproval/ApprovalNumber'
    import ApprovalProgress from '@/components/ForApproval/ApprovalProgress'
    import ApprovalDouble from '@/components/ForApproval/ApprovalDouble'
    import ApprovalMultipleSelector from '@/components/ForApproval/ApprovalMultipleSelector'
    import ApprovalChainReaction from '@/components/ForApproval/ApprovalChainReaction'

    export default {
        props: ['formData', 'singlemode', 'defaultData', 'contract_id', 'defaultValue','detailpage'],
        data() {
            return {
                importData: '',
                pageInfo: {
                    title: '',
                    description: '',
                },
                moduleInfo: [],
                item: {type: 1},
                sendData: {
                    values: []
                },
                form_id: '',
                trendApprover: {
                    condition: [],
                    ready: false,
                },
                clearFlag: false,
                directionalData: {},
                start_date:''
            }
        },
        created() {

        },
        mounted() {
            let _this = this
            this.refresh()
        },
        components: {
            ApprovalMultiple,
            ApprovalText,
            ApprovalSelector,
            ApprovalTimePicker,
            ApprovalImageUploader,
            ApprovalUploader,
            ApprovalSummerNote,
            ApprovalTextArea,
            ApprovalNumber,
            ApprovalProgress,
            ApprovalDouble,
            ApprovalDiv,
            ApprovalMultipleSelector,
            ApprovalChainReaction
        },
        watch: {
            formData: function (oldVal, newVal) {
                this.clearSignal()
                this.$nextTick(() => {
                    this.getFormContractor()
                })
            }
        },
        update() {

        },
        computed: {
            isFree() {
                if (this.formData) {
                    if (this.formData.change_type.id === 223) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        },
        methods: {
            defaultValueChecker() {
                if (this.defaultValue) {
                    for (const key in this.defaultValue.value) {
                        if (this.moduleInfo.find(item => item[0].control_title === key)) {
                            Object.assign(this.moduleInfo.find(item=>item[0].control_title === key)[0],{control_value:{id:this.defaultValue.id,name:this.defaultValue.value[key]}})
                        }
                    }
                }
            },
            directionalWatcher(params) {
                this.directionalData = params
            },
            clearSignal() {
                this.trendApprover = {
                    condition: [],
                    ready: false,
                },
                    this.sendData = {
                        values: []
                    }
                this.clearFlag = true
                setTimeout(() => {
                    this.clearFlag = false
                }, 1);
            },
            getRequiredArr() {
                for (const key in this.moduleInfo) {
                    if (this.moduleInfo[key][0].required == 1 && !this.sendData.values.find(item => item.key == this.moduleInfo[key][0].id)) {
                        console.log(this.moduleInfo[key][0].id)

                        toastr.error(this.moduleInfo[key][0].control_title + '为必填')
                        return false
                    }
                }
                return true
            },
            approvalSubmit() {
                let _this = this
                for (const key in this.sendData.values) {
                    console.log(this.sendData.values[key]);
                    if (this.sendData.values[key].value || this.sendData.values[key].value[0]) {
                        
                    }else{
                        this.sendData.values.splice(key,1)
                    }
                }
                if (this.getRequiredArr()) {
                    Object.assign(this.sendData, {notice: this.$store.state.newParticipantsInfo})
                    Object.assign(this.sendData, {chains: this.$store.state.otherSlot})
                    fetch('post', '/approvals/' + this.formData.form_id, this.sendData).then((params) => {
                        toastr.success('提交成功')
                        $('#approval-great-module').modal('hide')
                        _this.clearSignal()
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    })
                }
            },
            trendApproverChecker(params) {
                if (this.formData.condition.includes(params.key)) {
                    let tempData = this.formData.condition.indexOf(params.key)
                    this.trendApprover.condition.splice(tempData, 1, params.value)
                }
                if (this.formData.condition.length === this.trendApprover.condition.length) {
                    this.trendApprover.ready = true
                } else {
                    this.trendApprover.ready = false

                }
            },
            getFormContractor() {
                let _this = this
                if (this.formData.form_id) {
                    fetch('get', '/approvals/' + this.formData.form_id + '/form_control?include=approval_form_controls&number=' + this.contract_id).then((params) => {
                        _this.importData = params.data
                        _this.dataInit()
                        _this.$emit('done')
                    })
                }
            },
            changeHandler(params) {
                if (this.formData.condition) {
                    this.trendApproverChecker(params)
                }
                if(params.type === 'contract_start_date'){
                    this.start_date = params.value
                }
                if (!this.sendData.values.find(item => item.key === params.key)) {
                    this.sendData.values.push(params)
                } else {
                    Object.assign(this.sendData.values.find(item => item.key === params.key), params)
                }
            },
            refresh() {
                $('.selectpicker').selectpicker('render');
                $('.selectpicker').selectpicker('refresh');
            },
            dataInit() {
                let {name, description, approval_form_controls, form_id} = this.importData
                this.form_id = form_id
                try {
                    var controlArr = Array.from(approval_form_controls.data)

                } catch (error) {

                }
                this.pageInfo.title = name
                let descriptionArr = []
                let tempArr = []
                for (const key in controlArr) {
                    if (controlArr[key].form_control_pid === 0) {
                        if (key > 0) {
                            descriptionArr.push(tempArr)
                        }
                        tempArr = []
                        tempArr.push(controlArr[key])
                    } else {
                        tempArr.push(controlArr[key])
                    }
                }
                descriptionArr.push(tempArr)
                this.moduleInfo = descriptionArr
                this.defaultValueChecker()
                this.$nextTick((params) => {
                    this.refresh()
                })
            },
            sortChecker(params) {
                if (params.length > 1) {
                    return this.$options.components.ApprovalMultiple
                } else {
                    switch (params[0].control.data_dictionary_id) {
                        case 78 :
                            return this.$options.components.ApprovalText
                        case 79 :
                            return this.$options.components.ApprovalTextArea
                        case 80 :
                            return this.$options.components.ApprovalTimePicker
                        case 82 :
                            return this.$options.components.ApprovalSelector
                        case 83 :
                            return this.$options.components.ApprovalNumber
                        case 86 :
                            return this.$options.components.ApprovalTextArea
                        // case 88 :
                        //     return this.$options.components.ApprovalText
                        case 89 :
                            return this.$options.components.ApprovalDiv
                        case 91 :
                            return this.$options.components.ApprovalImageUploader
                        case 92 :
                            return this.$options.components.ApprovalUploader
                        case 200 :
                            return this.$options.components.ApprovalDouble
                        case 310 :
                            return this.$options.components.ApprovalMultipleSelector
                        case 391 :
                            return this.$options.components.ApprovalChainReaction
                        default :
                            return this.$options.components.Approvaltext
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        align-items: center;
    }

    .require {
        padding-right: 0;
    }

    .modal-greater {
        /* margin-top: 20px !important; */
        height: 100%;
    }

    .great-option {
        display: flex;
        margin: 20px 5px;
    }
</style>
