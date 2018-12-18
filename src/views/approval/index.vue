<template>
  <div class="page-container">
    <div class="page-aside">
      <Approval />
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
  .page-container{
    margin-left: 100px !important;
  }
  .page{
    margin-left: 260px !important;
  }
</style>


