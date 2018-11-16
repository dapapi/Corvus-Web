<template>
    <div class="upload">
        <input type="file" />
        <slot></slot>
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
.upload {
    position: relative;
    display: inline-block;
    input[type="file"] {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        min-height: 10px;
        left: 0;
        top: 0;
        cursor: pointer;
    }
    &:before {
        width: 100%;
        height: 100%;
    }
}
</style>

