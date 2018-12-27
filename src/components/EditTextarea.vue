<template>
    <div class="">
        <template v-if="isEditInput">
            <textarea class="form-control" v-model="context" title=""></textarea>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditTextarea",
        props: ['content', 'is-edit'],
        data() {
            return {
                isEditInput: false,
                context: ''
            }
        },

        mounted() {
            this.context = this.content
        },

        watch: {
            isEdit(newValue) {
                this.isEditInput = newValue;
            },

            context(newValue) {
                this.$emit('change', newValue)
            },
            content () {
                this.context = this.content
            }
        },
    }
</script>

<style scoped>

</style>