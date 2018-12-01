<template>
    <div class="">
        <template v-if="isEditInput">
            <input class="form-control" type="text" v-model="context" />
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditInput",
        props: ['content', 'is-edit'],
        data() {
            return {
                isEditInput: false,
                context:''
            }
        },
        mounted(){
            this.context = this.content
        },
        computed: {

        },

        watch: {
            isEdit(newValue) {
                this.isEditInput = newValue;
            },

            context(newValue) {
                this.$emit('change', newValue)
            }
        }
    }
</script>

<style scoped>

</style>