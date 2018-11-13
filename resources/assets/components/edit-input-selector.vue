<!-- 选择负责人 -->
<template>
    <div class="">
        <template v-if="isEditSelect">
            <input-selectors @change="changeMember"></input-selectors>
        </template>
        <template v-else>
            {{ this.$store.state.principalInfo.name }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-input-selector",
        props: ['is-edit', 'selectType'],
        data() {
            return {
                isEditSelect: false,
            }
        },

        mounted() {
        },

        watch: {
            isEdit(newValue) {
                this.isEditSelect = newValue;
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