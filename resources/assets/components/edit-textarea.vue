<template>
    <div class="edit-wrap">
        <template v-if="isEditInput">
            <textarea class="form-control" v-model="this.content"></textarea>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-textarea",
        props: ['content', 'is-edit'],
        data() {
            return {
                isEditInput: false,
            }
        },
        watch: {
            isEdit(newValue) {
                this.isEditInput = newValue;
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>