<template>
    <div class="page page-aside-left">
        <briefleft></briefleft>
        <router-view/>
    </div>
</template>
<script>

import briefleft from '@/components/briefLeft.vue'
export default {
     components:{
       briefleft
     }
}
</script>


