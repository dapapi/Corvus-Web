<template>
    <div class="col-md-12 pl-0 pr-0 multiple-container container">
            <span>{{consdata[0].control_title}}({{n}})</span>
            <button type="button" class="close" v-if="total>1" @click='formMinus(n)'><span aria-hidden="true">×</span></button>
            <hr>
            <div :is='sortChecker(item)' class="approval-multiple-option"
                v-for="(item, index) in consdata" ref='selectpicker'
                :key="index+Math.random()"
                :index = "index"
                :title='item.control_title'
                :options='item.control_enums'
                :placeholder='item.control_placeholder'
                :consdata='consdataHandler(item,index)'
                @change='changeHandler'></div>
    </div>
</template>

<script>
import ApprovalDiv from '@/components/ForApproval/ApprovalDiv';
import ApprovalSummerNote from '@/components/ForApproval/ApprovalSummerNote';
import ApprovalUploader from '@/components/ForApproval/ApprovalUploader';
import ApprovalImageUploader from '@/components/ForApproval/ApprovalImageUploader';
import ApprovalMultiple from '@/components/ForApproval/ApprovalMultiple';
import ApprovalTimePicker from '@/components/ForApproval/ApprovalTimePicker';
import ApprovalText from '@/components/ForApproval/ApprovalText';
import ApprovalTextArea from '@/components/ForApproval/ApprovalTextArea';
import ApprovalSelector from '@/components/ForApproval/ApprovalSelector';
import ApprovalNumber from '@/components/ForApproval/ApprovalNumber';
import ApprovalProgress from '@/components/ForApproval/ApprovalProgress';
import ApprovalDouble from '@/components/ForApproval/ApprovalDouble';
import ApprovalMultipleSelector from '@/components/ForApproval/ApprovalMultipleSelector';
import ApprovalChainReaction from '@/components/ForApproval/ApprovalChainReaction';

export default {
  name: 'ApprovalMultiple',
  props: ['consdata', 'singlemode', 'n', 'total', 'defaultData'],
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
    ApprovalChainReaction,
  },
  data() {
    return {
      changeData: [],
      isShow: { 0: false, 1: true },
      emitData: [],
    };
  },
  computed: {
    // isShow(params) {
    //     return (params)=>{
    //         if(this.data[params].form_control_pid == 1 && this.singlemode == 'true' && this.changeData[0] == 1){
    //             return false
    //         }else{
    //             return  true
    //         }
    // }
    // },
  },
  mounted() {
    this.refresh();
  },
  methods: {
    consdataHandler(params, index) {
      if (this.defaultData[this.n - 1] && this.defaultData[this.n - 1].find(item => item.key === params.id)) {
        const tempData = this.defaultData[this.n - 1].find(item => item.key === params.id);
        return [Object.assign(this.consdata[index], { control_value: tempData.value })];
      }
      return [this.consdata[index]];
    },
    formMinus(params) {
      this.$emit('formMinus', params);
    },
    changeHandler(params) {
      if (!this.emitData.find(item => item.key === params.key)) {
        this.emitData.push(params);
      } else {
        Object.assign(this.emitData.find(item => item.key === params.key), params);
      }
      this.$emit('change', { n: this.n, data: this.emitData });
    },
    saveChangeData(params, index) {
      this.changeData[index] = params;
      this.isShowhandler(1);
    },
    isShowhandler(params) {
      if (this.consdata[params].form_control_pid == 1 && this.singlemode == 'true' && this.changeData[0] == 1) {
        this.isShow[1] = false;
      } else {
        this.isShow[1] = true;
      }
      // this.$nextTick(() => {
      //     this.refresh()
      // })
    },
    refresh() {
      // $('.selectpicker').selectpicker('render');
    },
    sortChecker(params) {
      switch (Number(params.control.data_dictionary_id)) {
        case 78:
          return this.$options.components.ApprovalText;
        case 79:
          return this.$options.components.ApprovalTextArea;
        case 80:
          return this.$options.components.ApprovalTimePicker;
        case 82:
          return this.$options.components.ApprovalSelector;
        case 83:
          return this.$options.components.ApprovalNumber;
        case 86:
          return this.$options.components.ApprovalTextArea;
          // case 88 :
          //     return this.$options.components.ApprovalText
        case 89:
          return this.$options.components.ApprovalDiv;
        case 91:
          return this.$options.components.ApprovalImageUploader;
        case 92:
          return this.$options.components.ApprovalUploader;
        case 200:
          return this.$options.components.ApprovalDouble;
        case 310:
          return this.$options.components.ApprovalMultipleSelector;
        case 391:
          return this.$options.components.ApprovalChainReaction;
        default:
          return this.$options.components.Approvaltext;
      }
    },
  },
};
</script>

<style scoped>
.container{
    display: block !important;
}

.approval-multiple{
    margin-bottom: 20px ;
}
.approval-multiple-option{
    margin-bottom: 20px;
    width: 100% !important;
}
.add-option{
    cursor: pointer;
    color:royalblue;
    margin-left: 50px;
}
.close{
    transform: scale(0.6);
    color: rgba(7, 17, 27, 0.7)
}

</style>
