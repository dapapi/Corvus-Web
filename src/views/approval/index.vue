<template>
    <div class="page page-aside-left">
        <div class="page-aside">
            <Approval/>
        </div>
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


