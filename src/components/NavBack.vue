<template>
    <div class="page-header page-header-bordered">
        <h1 class="page-title">
            <!-- <i class="icon angle-left"></i> -->
            <a :href="href"><i class="icon md-chevron-left"></i></a>
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
    }
}
</script>

<style lang="scss" scoped>

</style>

