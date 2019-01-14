<template>
    <div class="input-wraper" :class="showButton ? 'focus-border' : ''" id="changeSizeInput">
        <textarea class="" name="" id="" rows="3" title="" @focus="showTaskFollow"
                  v-model="taskFollowText"></textarea>
        <div class="text-right pt-5" v-show="showButton">
            <button class="btn btn-sm btn-white btn-pure" @click="cancelTaskFollow">取消</button>
            <button class="btn btn-primary" @click="addTaskFollow">确定</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:['addcomment'],
        name: "change-size-input",
        data() {
            return {
                showButton: false,
                taskFollowText: '',
            }
        },

        mounted() {
            this.globalClick(this.removeFocus);
        },
        watch:{
            addcomment:function(value){
                this.showTaskFollow()
            }
        },
        methods: {
            showTaskFollow: function () {
                this.showButton = true
            },

            cancelTaskFollow: function () {
                this.showButton = false
            },

            addTaskFollow: function () {
                this.showButton = false;
                this.$emit('change', this.taskFollowText);
                this.taskFollowText = '';
            },
            removeFocus: function (event) {
                let tag = document.getElementById("changeSizeInput");
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.showButton = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .input-wraper {
        border: 1px solid #E0E0E0;
        padding: 15px 15px 12px;
    }

    .focus-border {
        border: 1px solid #3f51b5;
    }

    .input-wraper textarea {
        width: 100%;
        border: none;
        outline: none;
        resize: none;
    }

</style>