<template>
    <div>
        <template v-if="isEditDatePicker">
            <GroupDatepicker ref="datepicker" @change="changeDate"></GroupDatepicker>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditGroupDatePicker",
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
                        let contents = _this.content.split('|');
                        _this.$refs.datepicker.setValue(contents[0], contents[1])
                    }, 0)
                } else {
                    this.$refs.datepicker.destroy()
                }
            },
        },
        methods: {
            changeDate: function (start, end) {
                this.$emit('change', start, end);
            }
        }
    }
</script>

<style scoped>

</style>