<!-- 选择负责人 -->
<template>
    <div class="">
        <template v-if="isEditSelect">
            <input-selectors @change="changeMember" :type="'change'"></input-selectors>
        </template>
        <template v-else>
            {{ this.$store.state.principalInfo.name }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditInputSelector",
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
                console.log(this.$store.state.principalInfo.id)
                this.$emit('change', this.$store.state.principalInfo.id)
            }
        }
    }
</script>

<style scoped>

</style>