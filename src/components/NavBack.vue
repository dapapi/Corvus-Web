<template>
    <div class="page-header page-header-bordered">
        <h1 class="page-title">
            <!-- <i class="icon angle-left"></i> -->
            <router-link :to="href?href:''"><i class="icon md-chevron-left" @click="goPrevious"></i></router-link>
            {{ title }}
        </h1>

        <!-- <div class="page-header-actions">
        </div> -->
    </div>
</template>

<script>
export default {
    props: ['title', 'href'],

    data () {
        return {
            // visible: false,
        }
    },

    mounted () {
    },

    methods: {
        goPrevious () {
            if (!this.href) {
                this.$router.go(-1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

