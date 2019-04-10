<template>
  <div class="row">
    <div class="float-left col-md-6 pl-0">
      <select id="father" class="selectpicker show-tick form-control"
                :data-live-search="true">
        <option v-for="(item, index) in firstData" v-bind:id="item.id" :value="item.value" :key="index">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="float-left col-md-6 pl-0">
      <select id="child" class="selectpicker show-tick form-control" :data-live-search="true">
        <option v-for="(item, index) in lastData" v-bind:id="item.id" :value="item.value" :key="index">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinkResource',
  props: ['fatherData', 'childData', 'resource', 'resourceable'],
  data () {
    return {
      firstData: this.fatherData,
      lastData: this.childData,
      tempResourceable: this.resourceable
    }
  },
  watch: {
    fatherData (newVal) {
      this.firstData = newVal
      this.$nextTick(() => {
        if (this.resource) {
          $('#father').selectpicker('val', this.resource);
        }
        $('#father').selectpicker('refresh');
      })
    },
    childData (newVal) {
      this.lastData = newVal
      this.$nextTick(() => {
        if (this.tempResourceable) {
          $('#child').selectpicker('val', this.tempResourceable);
          this.tempResourceable = ''
        }
        $('#child').selectpicker('refresh');
      })
    },
  },
  mounted () {
    const self = this
    $('#father').selectpicker().on('hidden.bs.select', function () {
      self.$emit('change', 'father', $(this).val(), $(this)[0].selectedOptions[0].id);
    });
    $('#child').selectpicker().on('hidden.bs.select', function () {
      self.$emit('change', 'child', $(this).val(), $(this)[0].selectedOptions[0].id);
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
