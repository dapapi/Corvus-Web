<template>
    <div class="">
        <template v-if="isEditInput">
            <textarea class="form-control" v-model="textcontent"></textarea>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </div>
</template>

<script>
    export default {
        name: "editTextarea",
        props: ['content', 'is-edit'],
        data() {
            return {
                isEditInput: false,
                textcontent:''
            }
        },
        created(){
            this.textcontent = this.content 
        },
        mounted(){
           
        },
        watch: {
            isEdit(newValue) {
                this.isEditInput = newValue;
            },
            textcontent(newValue) {
                this.$emit('change', newValue)
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>