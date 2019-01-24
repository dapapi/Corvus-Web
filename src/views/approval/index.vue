<template>
    <div class="page page-aside-left">
        <div class="page-aside">
            <SecondLeft :leftData="leftData"/>
        </div>
        <router-view/>
    </div>
</template>

<script>
import {APPROVAL_CONFIG} from '@/components/ForApproval/config.js'
    import Approval from '@/components/Approval.vue'
    import SecondLeft from '@/components/SecondLeft.vue'
    export default {
        components: {
            Approval,SecondLeft
        },
        data(){
            return{
                leftData:APPROVAL_CONFIG.leftData
            }
        }
    }
</script>


