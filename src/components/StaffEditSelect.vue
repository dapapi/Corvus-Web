<template>
    <div>
        <input v-if="!isEdit" type="text" :value="value" placeholder="" disabled class="form-control">
        <template v-else>
            <selectors ref="mySelectors" :options="options" :value="value" :changeKey="changeKey" @select="changeState" placeholder="请选择" :defaultValue="0"></selectors>
        </template>
    </div>
</template>

<script>
export default {
    name: 'staffSelector',
    props: ['isEdit', 'value', 'options', 'changeKey', 'defaultValue'],
    watch: {
        isEdit (newVal) {
            const dom = this.$refs.mySelectors
            if (dom) {
                this.$refs.mySelectors.destroy()
            } else {
                setTimeout(() => {
                    this.$refs.mySelectors.setValue(this.value)
                }, 0)
            }
        }
    },
    mounted () {
    },
    methods: {
        changeState (name, val, keyName) {
            this.$emit('change', name, val, keyName)
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
