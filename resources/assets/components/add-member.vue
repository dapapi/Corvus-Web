<template>
    <div class="addMember">
        <ul class="addMember-items">
            <li class="addMember-item mb-5" v-for="member in selectMemberArr">
                <img onerror="noneAvatar(this)" class="avatar" :src="member.avatar" title="Herman Beck" src="">
                <span class="addMember-remove" @click="removeMember(member.id)">
                    <i class="md-minus-circle"></i>
                </span>
            </li>
        </ul>
        <div class="addMember-trigger" :class="this.isMemberShow ? 'addMember-active': ''" id="selectStaff">
            <div class="addMember-trigger-button" @click="showMember"><i class="md-plus"></i></div>
            <div class="addMember-trigger-dropdown">
                <select-staff :multiple="true" @change="changeSelectMember"
                              member-type="participant"></select-staff>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['selected-members'],
        data() {
            return {
                isMemberShow: false,
            }
        },
        mounted() {
            this.globalClick(this.removeSelect);
        },

        computed: {
            selectMemberArr: function () {
                return this.$store.state.participantsInfo
            }
        },

        methods: {

            showMember: function () {
                this.isMemberShow = true;
            },

            removeSelect: function (event) {
                let tag = document.getElementById("selectStaff");
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.isMemberShow = false;
                    }
                }
            },

            changeSelectMember: function (value) {
                // this.selectMemberArr = value
            },

            removeMember: function (userId) {
                // let data = this.selectMemberArr.find(item => item.id == userId);
                // let index = this.selectMemberArr.indexOf(data);
                // this.selectMemberArr.splice(index, 1);
                // this.selectMemberIdArr = [];
                // for (let i = 0; i < this.selectMemberArr.length; i++) {
                //     this.selectMemberIdArr.push(this.selectMemberArr[i].id)
                // }
            }

        }
    }

</script>

<style scoped>

</style>