<template>
    <div class="addMember">
        <ul class="addMember-items">
            <li class="addMember-item">
                <img class="avatar" src="https://res.papitube.com/no-icon.png" title="Herman Beck">
                <span class="addMember-remove">
                    <i class="md-minus-circle"></i>
                </span>
            </li>
            <li class="addMember-item">
                <img class="avatar" src="https://res.papitube.com/no-icon.png" title="Caleb Richards">
                <span class="addMember-remove">
                    <i class="md-minus-circle"></i>
                </span>
            </li>
        </ul>
        <div class="addMember-trigger" :class="this.isMemberShow ? 'addMember-active': ''" id="selectStaff">
            <div class="addMember-trigger-button" @click="showMember"><i class="md-plus"></i></div>
            <div class="addMember-trigger-dropdown">
                <select-staff></select-staff>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: [],
        data() {
            return {
                isMemberShow: false,
            }
        },
        mounted() {
            this.globalClick(this.removeSelect);
        },

        methods: {

            showMember: function () {
                this.isMemberShow = true;
            },

            removeSelect(event) {
                let tag = document.getElementById("selectStaff");
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.isMemberShow = false;
                    }
                }
            },

        }
    }

</script>

<style scoped>

</style>