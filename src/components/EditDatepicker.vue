<template>
    <div>
        <template v-if="isEditDatePicker">
            <datepicker ref="datepicker" @change="changeDate"></datepicker>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditDatepicker",
        props: ['is-edit', 'content'],
        data() {
            return {
                isEditDatePicker: false,
            }
        },

        mounted() {
        },

        watch: {
            isEdit(newValue) {
                this.isEditDatePicker = newValue;
                if (newValue) {
                    let _this = this;
                    setTimeout(function () {
                        _this.$refs.datepicker.setValue(_this.content)
                    }, 0)
                } else {
                    this.$refs.datepicker.destroy()
                }
            }
        },
        methods: {
            changeDate: function (value) {
                this.$emit('change', value);
            }
        }
    }
</script>

<style scoped>

</style>