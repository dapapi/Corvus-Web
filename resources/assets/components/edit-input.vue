<template>
    <div class="">
        <template v-if="isEditInput">
            <input class="form-control" type="text" v-model="this.content">
        </template>
        <template v-else>
            {{ content }}
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