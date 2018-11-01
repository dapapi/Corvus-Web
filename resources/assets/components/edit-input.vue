<template>
    <input type="text" v-model="this.content" class="default input" readonly>
</template>

<script>
    export default {
        name: "editinput",
        props: ['content', 'is-edit'],
        watch: {
            isEdit(newValue) {
                if (newValue) {
                    this.editInput()
                } else {
                    this.disableInput()
                }
            }
        },
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
        color: #757575;
        font-weight: 400;
    }

    .input {
        border: none;
        background: white;
    }

    .form-control {
        display: inline;
        /*width: auto;*/
        width: calc(100% - 2rem);
        /*padding: 0 1rem;*/
    }

</style>