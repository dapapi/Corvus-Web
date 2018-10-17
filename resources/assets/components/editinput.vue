<template>
    <input type="text" v-model="this.content" class="default input" readonly v-on:dblclick="editInput(this)"
           v-on:blur="disableInput">
</template>

<script>
    export default {
        name: "editinput",
        props: ['content'],
        methods: {
            editInput() {
                $(this.$el).removeAttr('readonly');

                $(this.$el).removeClass('input');
                $(this.$el).addClass('form-control')
            },

            disableInput() {
                $(this.$el).attr('readonly', 'readonly');

                $(this.$el).removeClass('form-control');
                $(this.$el).addClass('input');

                this.$emit('change', $(this.$el).val());
            }
        }
    }
</script>

<style scoped>

    .default {
        color: #868e96;
        text-align: right;
        font-weight: 300;
    }

    .input {
        border: none;
        background: white;
    }

</style>