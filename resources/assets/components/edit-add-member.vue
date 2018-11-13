<template>
    <div class="">
        <template v-if="isEditAdd">
            <add-member @change="changeMember"></add-member>
        </template>
        <template v-else>
            {{ selectedMember.join('、') }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "edit-add-member",
        props: ['is-edit'],
        data() {
            return {
                isEditAdd: false,
            }
        },

        mounted() {
        },

        computed: {
            selectedMember: function () {
                let flagArr = [];
                for (let i = 0; i < this.$store.state.participantsInfo.length; i++) {
                    flagArr.push(this.$store.state.participantsInfo[i].name)
                }
                return flagArr
            }
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