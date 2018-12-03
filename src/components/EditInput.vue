<template>
    <div class="">
        <template v-if="isEditInput">
            <input class="form-control" type="text" v-model="context" :disabled='disabled' />
        </template>
        <template v-else>
            {{ context }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "EditInput",
        props: ['content', 'is-edit','disabled'],
        data() {
            return {
                isEditInput: false,
                context:''
            }
        },

        mounted() {
            this.context = this.content // 此时获取不到值 ，所以改为监听
        },
        computed: {

        },

        watch: {
            isEdit(newValue) {
                this.isEditInput = newValue;
            },

            context(newValue) {
                this.$emit('change', newValue)
            },
            content () {
                this.$nextTick(() => {
                    this.context = this.content
                })
            }
        }
    }
</script>

<style scoped>

</style>