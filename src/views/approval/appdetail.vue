<template>
    <div class="page-main" style="background-color:#f3f4f5">
        <!-- <Loading :is-loading="isLoading"></Loading> -->
        <div class="loader-overlay" v-if="isLoading">
                <div class="loader-content">
                    <div class="loader-index">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    </div>
                </div>
            </div>
        <div>
            <div class="page-header page-header-bordered mb-0">
                <h6 class="page-title nav-head" v-if="info">
                    {{list.title}}
                    <template v-if="list.form_status==232">
                        <button class="btn btn-success">已审批</button>
                    </template>
                    <template v-if="list.form_status==231">
                        <button class="btn btn-warning">待审批</button>
                    </template>
                    <template v-if="list.form_status==234">
                        <button class="btn" style='color:rgba(7,17,27,0.4)'>已撤销</button>
                    </template>
                    <template v-if="list.form_status==235">
                        <button class="btn" style='color:rgba(7,17,27,0.4)'>已作废</button>
                    </template>
                    <template v-if="list.form_status==233">
                        <button class="btn btn-danger ">已拒绝</button>
                    </template>
                </h6>
            </div>
            <div class="page-header  page-header-bordered m-20 pl-10">
                <h6 class="page-title title-status">当前状态
                    <div class="approver"
                         :style="{backgroundImage:'url('+pending.icon_url+')',backgroundColor:String(pending.icon_url).split('|')[0]}">
                        {{String(pending.icon_url).split('|')[1]}}
                    </div>
                    <span v-if="list.form_status=== 231">&nbsp;{{currentStatus.slice(0,1)}}{{pending.name}}{{currentStatus.slice(1)}}</span>
                    <span v-if="list.form_status !== 231">{{pending.name}}{{currentStatus}}</span>
                    <i v-if="list.form_status==232 && (info.approval.user_id === currentId || (list.creator && list.creator.data.id === currentId)) && !info.contract_archive  ">
                        <button class="btn btn-success" v-if="info.contract" @click='approvalHandler("archive")'>归档</button>
                        <button class="btn btn-primary" @click='approvalHandler("discard")'>作废</button>
                    </i>
                    <i v-if="list.form_status==231 && (info.approval.user_id === currentId || (list.creator && list.creator.data.id === currentId)) ">
                        <button class="btn btn-primary" v-if="list.approval_begin === 0" @click='approvalHandler("cancel")'>撤销</button>
                        <button class="btn btn-danger" type="submit"
                                data-toggle="modal" @click='approvalReminder()'>提醒
                        </button>
                    </i>
                    <i v-if="[233,234,235].includes(list.form_status) && (info.approval.user_id === currentId || (list.creator && list.creator.data.id === currentId)) ">
                        <button class="btn btn-primary" @click="addProjectTimeout(list.form_id)">重新提交</button>
                    </i>
                     <template v-if="list.form_status==232" >
                        <img src="@/assets/img/approval.jpg" style="width:50px;margin-left:20px;" alt="">
                    </template>
                    <template v-if="list.form_status==231">
                        <img src="@/assets/img/pending.jpg" style="width:50px;margin-left:20px;" alt="">
                    </template>
                    <template v-if="list.form_status==234">
                        <img src="@/assets/img/withdraw.jpg" style="width:50px;margin-left:20px;" alt="">
                    </template>
                    <template v-if="list.form_status==235">
                        <img src="@/assets/img/wasted.jpg" style="width:50px;margin-left:20px;" alt="">
                    </template>
                    <template v-if="list.form_status==233">
                        <img src="@/assets/img/denide.jpg" style="width:50px;margin-left:20px;" alt="">
                    </template>
                    <i v-if="list.form_status==231 && isCurrentApprover && $route.query.mode === 'approver'">
                        <button class="btn btn-success" @click='approvalHandler("agree")'>同意</button>
                        <button class="btn btn-danger" @click='approvalHandler("refuse")'>拒绝</button>
                        <button class="btn btn-primary" @click='approvalHandler("transfer")'>转交</button>
                    </i>
                </h6>
            </div>
            <div  class="page-content container-fluid" v-if="info" style="height: 100%;">
                <div class="panel col-md-12 col-lg-12 pb-10">
                    <div class="caption">
                        <h6 class="page-title mx-15">{{list.title}}</h6>
                        <span class="mx-15">编号：{{list.form_instance_number}}</span>
                    </div>

                    <div class="col-md-10">
                        <div class="example">
                            <div class="col-md-2 float-left text-right">申请人</div>
                            <div class="col-md-4 float-left">{{(list && list.name) || (info.approval &&
                                info.approval.name)}}
                            </div>
                            <div class="col-md-2 float-left text-right">职位</div>
                            <div class="col-md-4 float-left">{{(list && list.position) || (info.approval &&
                                info.approval.position && info.approval.position.name)}}
                            </div>
                        </div>
                        <div class="example">
                            <div class="col-md-2 float-left text-right">部门</div>
                            <div class="col-md-4 float-left">{{list.department_name || (info.approval &&
                                info.approval.department_name)}}
                            </div>
                            <div class="col-md-2 float-left text-right">申请时间</div>
                            <div class="col-md-4 float-left">{{common.timeProcessing(list.created_at) || (info.approval &&
                                common.timeProcessing(info.approval.created_at))}}
                            </div>
                        </div>
                    </div>
                    <div class="example pt-20" v-if="detail_control" >
                        <div v-for="(item, index) in detail_control" :key="index">
                            <div>
                                <div style='color:#00bcd4'>{{list.title}}详情{{index+1}}
                                    <hr>
                                </div>
                            </div>
                            <div v-for="(subitem, index) in item" :key="index" class="col-md-6 my-5 px-0 float-left">
                                 <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                    {{subitem.key}}
                                </div>
                                <div class="col-md-8 float-left detail-value">
                                    {{subitem.values.data.value}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <h6 class="page-title pb-20 mx-15" style="border-bottom: 1px solid rgb(227, 227, 227);">审批详情</h6>
                        <!-- <hr> -->
                        <div class="row px-20">
                            <div class="col-md-10 mt-20" >
                                <div class="col-md-6 my-5 px-0 float-left" v-if="info.contract">
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect">
                                        合同编号
                                    </div>
                                    <div class="col-md-8 float-left detail-value">
                                        {{info.contract}}
                                    </div>
                                </div>
                                <div class="col-md-6 my-5 px-0 float-left"
                                     v-for="(item, index) in detailData" :key="index" style='align-item:center'>
                                    <div class="col-md-4 float-left text-right detail-key mx-0 noselect" v-if="(item.key !== '提示：若艺人选择用工作室与我司签约，则输入工作室名称，否则不用输入')">{{item.key}}
                                    </div>

                                    <div class="col-md-8 float-left detail-value"
                                         v-if="item.values && !String(item.values.data.value).includes('http') && (item.key !== '提示：若艺人选择用工作室与我司签约，则输入工作室名称，否则不用输入')">{{(item.values
                                        && item.values.data.value) || ''}}
                                    </div>
                                    <div class="col-md-8 float-left detail-value"
                                         v-if="item.values && String(item.values.data.value).includes('http')"
                                         @click='previewHandler(item.values.data.value)'>
                                        <figure style="text-align:center" class="float-left">
                                            <img src="@/assets/img/attachment.png" alt="" style="width:20px">
                                            <p>点击查看</p>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <div class="caption" v-if="canShow && info.contract_archive">
                        <h6 class="page-title mx-15">归档信息</h6>
                    </div>

                    <div class="col-md-10" v-if="canShow && info.contract_archive">
                        <div class="example">
                            <div class="col-md-2 float-left text-right">归档描述</div>
                            <div class="col-md-4 float-left">{{info.contract_archive.comment}}
                            </div>

                            <div class="col-md-2 float-left text-right">附件</div>
                             <div class=" float-left detail-value"
                                    @click='previewHandler(archivesArr)'>
                                <figure style="text-align:center" class="float-left">
                                    <img src="@/assets/img/attachment.png" alt="" style="width:20px">
                                    <p>点击查看</p>
                                </figure>
                            </div>
                            <!-- <div class="col-md-4 float-left">{{(list && list.position) || (info.approval &&
                                info.approval.position && info.approval.position.name)}}
                            </div> -->
                        </div>
                        <!-- <div class="example">
                            <div class="col-md-2 float-left text-right">部门</div>
                            <div class="col-md-4 float-left">{{list.department_name || (info.approval &&
                                info.approval.department_name)}}
                            </div>
                            <div class="col-md-2 float-left text-right">申请时间</div>
                            <div class="col-md-4 float-left">{{list.created_at || (info.approval &&
                                info.approval.created_at)}}
                            </div>
                        </div> -->
                    </div>
                        <div class=" col-md-12 col-lg-12">
                            <div class="caption" style="border:0;">
                                <h6 class="page-title pb-20" style="border-bottom:1px solid #e3e3e3">审批流程</h6>
                                <div class="mb-20">
                                    <ApprovalProgress mode='detail'
                                                      :formid='list.form_instance_number'
                                                      :formstatus='currentStatus'
                                                      @waitingfor='waitingFor'
                                                      :notice="info.participant || (info.notice && info.notice.data)"
                                                      ref='approvalProgress'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="canShow" class="panel">
                    <div class="card col-md-12">
                        <div class="card-header card-header-transparent card-header-bordered">
                            <h5>审批跟进</h5>
                        </div>
                        <div class="card-block">
                            <div class="col-md-5 pl-0">
                                <TaskFollowUp :follow-type="'审批'" trail-type="approval_instances" :trail-id="list.form_instance_number"  ></TaskFollowUp>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         <DocPreview  v-if="canShow" :url='$store.state.previewurl' :detailpage='isDetail' />
        </div>
        <BuildProject  :project-type="projectTypeTemp" :project-fields-arr="projectFieldsArr" mode='detail'
                      :default-data='{fields:(info.fields && info.fields.data),list:list,trailInfo:trailInfo}' v-if="canShow && list.form_status !== 231" :formstatus='list.form_status' ></BuildProject>
        <ApprovalGreatModule :form-data='formData' singlemode='true' :default-data='detailData' :contract_id='$route.params.id' :detailpage='isDetail' v-if="canShow && list.form_status !== 231"/>
        <ApprovalGoModal :mode='approvalMode' :id='list.form_instance_number' @approvaldone='approvalDone'/>
        <div v-if="canShow" class="modal fade  bootbox" id="docPreviewSelector" aria-labelledby="docPreviewPositionCenter" data-backdrop="static"
             role="dialog" tabindex="-1">
            <div class="modal-dialog modal-simple modal-center modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="modal-title">请选择要预览的文件</h4>
                    </div>
                    <div class="modal-body">
                        <div v-for="(item, index) in previewUrlArr" :key="index" @click='previewHandler(item)'>
                            {{item}}
                            <!-- <figure>
                                <img class="ml-20 mt-20 float-left" :src="item" style='max-width:400px;border:1px solid rgba(7,17,27,0.5)' :alt="item" >
                            </figure> -->
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-default btn-pure waves-effect waves-light waves-round" data-dismiss="modal">关闭</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import fetch from '@/assets/utils/fetch';
import { PROJECT_CONFIG } from '@/views/approval/project/projectConfig';
import ApprovalGreatModule from '@/components/ApprovalGreatModule';
import ApprovalProgress from '@/components/ForApproval/ApprovalProgress';
import common from '../../assets/js/common';

export default {
  name: 'approvalDetail',
  components: {
    ApprovalProgress, ApprovalGreatModule,
  },
  data() {
    return {
      common,
      list: {},
      info: {},
      detailData: {},
      projectType: '',
      projectFieldsArr: [],
      trailInfo: {},
      firstFlag: true,
      isLoading: true,
      approvalMode: '',
      pending: {},
      currentId: '',
      isCurrentApprover: undefined,
      roleUser: [],
      indexData: [],
      formData: {},
      previewUrl: '',
      previewUrlArr: [],
      projectTypeTemp: '',
      detail_control: {},
      msg: '',
      archivesArr: '',
      isDetail: true,
      indexDataCommon: [],
      waitingForFlag:true,
      canShow:false,
    };
  },

  mounted() {
    this.getData();
  },
  computed: {
    isApproverMode() {
      if (this.$route.query.mode === 'approver') {
        return true;
      }
      return false;
    },
    currentStatus() {
      switch (this.list.form_status) {
        case 232:
          return '已审批';
        case 231:
          return '待审批';
        case 233:
          return '已拒绝';
        case 234:
          return '已撤销';
        case 235:
          return '已作废';
      }
    },

  },
  methods: {
    approvalReminder() {
      fetch('put', `/approval_instances/${this.$route.params.id}/remind`).then((params) => {
        toastr.success('提醒成功');
      });
    },
    previewHandler(params) {
      this.$store.dispatch('changePreview', params);
      $('#docPreviewSelector').modal('hide');
      this.previewUrlArr = String(params).split(',');
      if (this.previewUrlArr.length === 1) {
        $('#docPreview').modal('show');
        this.previewUrl = this.previewUrlArr[0];
      } else {
        $('#docPreviewSelector').modal('show');
      }
    },
    getFormList() {
      const _this = this;
      fetch('get', '/approvals/contracts').then((params) => {
        _this.indexData = params.data;
        _this.isLoading = false;
      });
      fetch('get', '/approvals/').then((params) => {
        _this.indexDataCommon = params.data;
        _this.isLoading = false;
      });
    },
    pullUp(params) {
      this.formData = params;
      this.$nextTick((params) => {
        $('#approval-great-module').modal('show');
      });
    },
    approvalDone(params = '审批成功') {
      if (this.list.project_number) {
        this.$refs.approvalProgress.getApprover(this.list.project_number);
      } else {
        this.$refs.approvalProgress.getApprover(this.list.form_instance_number);
      }
      this.getData();
      toastr.success(params);
      this.$emit('unreadupdate');
    },
    getCurrentApprover() {
      const _this = this;
      this.roleUser = [];
      fetch('get', '/users/my?include=roleUser').then((params) => {
        _this.currentId = params.data.id;
        for (const key in params.data.roleUser.data) {
          _this.roleUser.push(params.data.roleUser.data[key].role_id);
        }
        // _this.roleUser = params.data.roleUser.data[0].role_id
        if (_this.currentId === _this.pending.id || _this.roleUser.includes(_this.pending.id)) {
          _this.isCurrentApprover = true;
        } else {
          _this.isCurrentApprover = false;
        }
      });
      //  this.roleUser = [];
      // console.log(JSON.parse(Cookies.get('user')));
      // this.currentId = JSON.parse(Cookies.get('user')).id
      // for (const key in JSON.parse(Cookies.get('user')).role_user.data) {
      //     this.roleUser.push(JSON.parse(Cookies.get('user')).role_user.data[key].role_id);
      // }
      //   if (this.currentId === this.pending.id || this.roleUser.includes(this.pending.id)) {
      //     this.isCurrentApprover = true;
      //   } else {
      //     this.isCurrentApprover = false;
      //   }
    },
    waitingFor(params) {
      if (params && this.waitingForFlag === true) {
        this.waitingForFlag = false
        this.pending = params;
        this.getCurrentApprover();
      }
    },
    addProjectTimeout(params) {
      this.isLoading = true;
      if (this.firstFlag === true) {
        setTimeout(() => {
          this.addProject(params);
          this.firstFlag = false;
          this.isLoading = false;
        }, 3000);
      } else {
        this.addProject(params);
        this.isLoading = false;
      }
    },
    addProject(value) {
      // console.log(value);
      this.projectType = value;
      const _this = this;
      if (!this.list.id) {
        const Temp1 = this.indexData.find(item => item.form_id === this.projectType);
        let TempArr = [],
          Temp2;
        for (const key in this.indexDataCommon) {
          for (const zed in this.indexDataCommon[key].forms.data) {
            TempArr.push(this.indexDataCommon[key].forms.data[zed]);
          }
        }
        Temp2 = TempArr.find(item => item.form_id === this.projectType);
        const formData = Temp1 || Temp2;
        // console.log(formData);
        this.pullUp(formData);
      } else {
        this.selectProjectType(() => {
          _this.projectTypeTemp = _this.projectType;
          $('#addProject').modal('show');
        });
      }
    },

    selectProjectType(callback) {
      fetch('get', '/project_fields', {
        type: this.projectType,
        status: 1,
      }).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].field_type === 2 || response.data[i].field_type === 6) {
            response.data[i].contentArr = [];
            for (let j = 0; j < response.data[i].content.length; j++) {
              response.data[i].contentArr.push({
                value: response.data[i].content[j],
                name: response.data[i].content[j],
              });
            }
          }
        }
        this.projectFieldsArr = response.data;
        callback();
      });
    },
    approvalHandler(params) {
      this.approvalMode = params;
      $('#approvalGo').modal('show');
    },
    getData() {
      const _this = this;
      fetch('get', `/approval_instances/${this.$route.params.id}?include=principal,creator,fields,trail,detail_control`).then((params) => {
        this.canShow = true
        const { meta } = params;
        // console.log(params);
        _this.list = params.data;
        _this.projectType = params.data.type;
        _this.info = meta;
        const { fields: { data } } = meta;
        _this.detailData = data;
        _this.trailInfo = params.data.trail;
        _this.detail_control = params.meta.detail_control;
        const tempArr = [];
        if (meta.contract_archive) {
          for (const key in meta.contract_archive.archives.data) {
            tempArr.push(meta.contract_archive.archives.data[key].url);
          }
          _this.archivesArr = tempArr.join(',');
        }
        _this.isLoading = false
      if(_this.list.form_status !== 231){
      _this.getFormList();
      }
      });
    },
    participantChange(value) {
      const flagArr = [];
      for (let i = 0; i < value.length; i++) {
        flagArr.push(value[i].id);
      }
      this.participants = flagArr;
    },
  },
};
</script>
<style scoped>
    * {
        list-style: none;
        font-style: normal;
        font-weight: normal;
    }

    .nav-head button {
        color: white;
        /* transform: scale(0.7) */
    }

    .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .approver {
        display: inline-block;
        font-size: 12px;
        font-weight: 800;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-size: 30px;
        text-align: center;
        line-height: 30px;
        vertical-align: middle;
    }

    .loader-overlay {
        margin-left: 300px;
        background-color: rgba(7, 17, 27, 0.2)
    }

    .btn {
        padding: 0 10px;
        margin: 0 10px;
    }

    .title-status {
        position: relative;

    }

    .page-title {
        font-size: 1.2rem;
    }

    .title-status em, .content em, .setp em {
        width: 25px;
        height: 25px;
        display: inline-block;
        background-image: url('../../assets/head.jpg');
        background-size: 25px;
        border-radius: 50%;
        margin: 0 10px;
        vertical-align: middle;
    }

    .title-status i {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .caption {
        padding: 20px 0;
        position: relative;
        border-bottom: 1px solid #e3e3e3;
    }

    .caption span {
        position: absolute;
        right: 10px;
        top: 20px;
    }

    .page-content {
        padding: 0 20px;
    }

    .left, .middle {
        display: flex;
        vertical-align: middle;
        position: relative;
    }

    .left::before, .middle::before {
        content: '';
        width: 40px;
        height: 1px;
        background: #e0e0e0;
        display: inline-block;
        position: absolute;
        top: 15px;
        left: 130px;
    }

    .example {
        position: relative;
    }

    .example em {
        position: absolute;
        left: 50px;
        top: -2px;
    }

    .left-cont, .middle-cont {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        font-weight: bold;
    }

    .setp {
        display: flex;
    }

    .setp em {
        width: 35px;
        height: 35px;
    }

    .right {
        display: flex;
        align-items: center;
    }

    .middle em, .left em {
        position: relative;
    }

    .middle em i, .left em i {
        position: absolute;
        bottom: -3px;
        right: -6px;
    }

    .panel {
        margin-bottom: 20px;
    }

    .nav-head {
        font-size: 26px;
    }

    .detail-container {
        /* border: 1px solid #eeeeee; */
        min-height: 40px;
        line-height: 40px;
    }

    .detail-key {
        min-height: 40px;
        /* background: #f5f5f5; */

    }
</style>
