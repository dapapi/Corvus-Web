<template>
  <div class="page-container">
    <div class="page-aside">
      <Approval />
      <ApprovalGreatModule />
    </div>
    <div class="page">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Approval from '@/components/Approval.vue'
import ApprovalGreatModule from '@/components/ApprovalGreatModule'
export default {
        components: {
            Approval,ApprovalGreatModule
        },
}
</script>
<style scoped>
  .page-container{
    margin-left: 100px !important;
  }
  .page{
    margin-left: 260px !important;
  }
</style>


