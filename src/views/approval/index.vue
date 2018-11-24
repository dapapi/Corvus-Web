<template>
<div class="page">
<Approval></Approval>
  <router-view/>
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
<style>

</style>


