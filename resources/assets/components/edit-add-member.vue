<template>
    <div class="">
        <template v-if="isEditAdd">
            <add-member @change="changeMember"></add-member>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-add-member",
        props: ['is-edit', 'content'],
        data() {
            return {
                isEditAdd: false,
            }
        },

        mounted() {
        },

        watch: {
            isEdit(newValue) {
                this.isEditAdd = newValue;
            },
        },
        methods: {
            changeMember: function (value) {
                this.$emit('change', value)
            }
        }
    }
</script>

<style scoped>

</style>