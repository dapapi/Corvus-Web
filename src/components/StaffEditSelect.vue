<template>
    <div>
        <input v-if="!isEdit" type="text" :value="value" placeholder="" disabled class="form-control">
        <template v-else>
            <selectors ref="mySelectors" :options="options" :changeKey="changeKey" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
        </template>
    </div>
</template>

<script>
export default {
    name: 'staffSelector',
    props: ['isEdit', 'value', 'options', 'changeKey', 'call', 'defaultValue'],
    watch: {
        isEdit (newVal) {
            const dom = this.$refs.mySelectors
            if (dom) {
                dom.hide()
            }
        }
    },
    methods: {
        changeState (name, val) {
            this.$emit('change', name, val)
        }
    }
}
</script>

<style lang="scss" scoped>
.form-control:disabled, .form-control[readonly] {
    background-color: #fff;
    opacity: 1;
    border: none;
}
</style>
