<template>
    <div class="">
        <template v-if="isEditInput">
            <input class="form-control" type="text" v-model="context">
        </template>
        <template v-else>
            {{ context }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "editinput",
        props: ['content', 'is-edit'],
        data() {
            return {
                isEditInput: false,
            }
        },
        computed: {
            context: {
                get() {
                    return this.content
                },
                set() {
                    return this.content
                }
            }
        },
        watch: {
            isEdit(newValue) {
                this.isEditInput = newValue;
            },

            context(newValue) {
                this.$emit('change', newValue)
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>