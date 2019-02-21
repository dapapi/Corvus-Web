<template>
    <div>
        <template v-if="isEditNumberSpinner">
            <number-spinner ref="number" @change="changeNumber" :min="0" :max="1000000000" :precision="2" :value="0"></number-spinner>
        </template>
        <template v-else>
            {{ content ? content : 0 }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-number-spinner",
        props: ['is-edit', 'content'],
        data() {
            return {
                isEditNumberSpinner: false,
            }
        },

        mounted() {
        },

        watch: {
            isEdit(newValue) {
                this.isEditNumberSpinner = newValue;
                if (newValue) {
                    let _this = this;
                    setTimeout(function () {
                        _this.$refs.number.setValue(_this.content)
                    }, 0)
                } else {
                    this.$refs.number.destroy()
                }
            }
        },
        methods: {
            changeNumber: function (value) {
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>