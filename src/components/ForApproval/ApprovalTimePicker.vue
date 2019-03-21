<template>
    <div class="col-md-12 approval-text-container pl-0" >
        <span class="col-md-2 text-right pl-0" :class="consdata[0].required===1?'require':''">{{title || consdata[0].control_title || "时间选择器测试"}}</span>
        <datepicker class="col-md-6 time-picker " :disabled="isDisabled" :startDate="start_date" :infinite='consdata[0].indefinite_show===1' :class="consdata[0].control_data_select_format==94?'col-md-5 pl-0':'col-md-10'" :default='defaultDate' v-if="!duration" :placeholder="consdata[0].control_placeholder" @change='ymdPicker' :clear='clear' />
        <timepicker class="col-md-4 clearfix" :disabled="isDisabled" v-if="consdata[0].control_data_select_format==94" @change='hmsPicker'/>
    </div>
</template>

<script>
export default {
  props: ['duration', 'title', 'consdata', 'refresh', 'clear', 'defaultData', 'startDate'],
  data() {
    return {
      defaultDate: '',
      ymd: '',
      hms: '',
      start_date: '',
      isDisabled: false,
    };
  },
  mounted() {
    this.defaultDataChecker();
  },
  methods: {
    hmsPicker(params) {
      this.hms = params;
      this.change();
    },
    ymdPicker(params) {
      this.ymd = params;
      this.change();
    },
    defaultDataChecker() {
      if (this.consdata[0].control_value) {
        this.defaultDate = this.consdata[0].control_value;
        if (this.consdata[0].control_data_select_format !== 94) {
          this.ymd = this.consdata[0].control_value;
        }
        // for (const i in this.defaultData) {
        //     if (this.defaultData[i].key === this.consdata[0].control_title) {
        //         console.log(this.defaultData[i]);
        //         this.$nextTick((params) => {
        //             // $(this.$el).selectpicker('val', this.defaultData[i].values.data.value);
        //             this.defaultDate = this.defaultData[i]
        //         })
        //     }
        // }
      }
    },
    change() {
      const { id } = this.consdata[0];
      const { related_field } = this.consdata[0];
      this.$emit('change', { key: id, value: `${this.ymd} ${this.hms}`, type: related_field });
      this.$emit('changestarttime', { type: this.consdata[0].control_source.flag, value: `${this.ymd} ${this.hms}` });
    },
  },
  watch: {
    defaultDate(value) {
      console.log(value);
      this.change(value);
    },
    startDate(newValue) {
      if (this.consdata[0].control_source.flag === 'end_time') {
        this.start_date = newValue;
      }
    },
  },
};
</script>

<style scoped>
    .approval-text-container span{
        height: 30px;
    }
    .col-md-10{
        padding:0 !important;
    }
</style>
