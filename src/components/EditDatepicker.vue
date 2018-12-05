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
                        // 设置时间可以设置 yyyy-mm-dd格式的 但是 yyyy-mm-dd hh-mm-ss不可以 所以截取前10位 by:bqx
                        let tempDate = _this.content
                        if (tempDate && tempDate.length > 10) {
                            tempDate = tempDate.substr(0, 10)
                        }
                        _this.$refs.datepicker.setValue(tempDate)
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