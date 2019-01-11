<template>
    <div class="page page-aside-left">
    <div class="page-aside">
      <Approval class="" />
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Approval from '@/components/Approval.vue'
export default {
        components: {
            Approval
        },
}
</script>
<style scoped>
  /* .page-container{
    margin-left: 100px !important;
  }
  .page{
    height: 100% !important;
    margin-left: 260px !important;
  }
  .page-aside{
    height: 100% !important;
  } */
</style>


