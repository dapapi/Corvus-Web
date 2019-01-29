<template>
    <div>
        <template v-if="isEditDatePicker">
            <Timepicker ref="timepicker" @change="changeDate"></Timepicker>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditTimepicker",
        props: ['is-edit', 'content'],
        data() {
            return {
                isEditDatePicker: false,
            }
        },

        watch: {
            isEdit(newValue) {
                this.isEditDatePicker = newValue;
                if (newValue) {
                    setTimeout(() => {
                        this.$refs.timepicker.setValue(this.content)
                    }, 0)
                } else {
                    this.$refs.timepicker.destroy()
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