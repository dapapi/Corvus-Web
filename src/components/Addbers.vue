<template>
    <div class="addMember">
        <ul class="addMember-items">
            <li class="addMember-item mb-5" v-for="(member,index) in selectMemberArr" :key="index">
                <Avatar style="cursor:pointer;" :imgUrl="member.icon_url" />
                <span class="addMember-remove" @click="removeMember(member.id)">
                    <i class="md-minus-circle"></i>
                </span>
                <span class="divider">
                    <hr>
                    <span class="circle">
                        <span class="circle-bg"></span>
                    </span>
                </span>
            </li>
        </ul>
        <div class="addMember-trigger" :class="isMemberShow ? 'addMember-active': ''" :id="'selectStaff' + this._uid">
            <div class="addMember-trigger-button" @click="showMember"><i class="icon-tianjia"></i></div>
            <div class="addMember-trigger-dropdown">
                <select-staff :multiple="true" :member-type="'participant'" :type="type"
                              @change="changeSelectedMember"></select-staff>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ["type"],
        data() {
            return {
                isMemberShow: false
            };
        },
        mounted() {
            this.globalClick(this.removeSelect);
        },

        computed: {
            selectMemberArr: function () {
                if (this.type === "change") {
                    return this.$store.state.participantsInfo;
                } else {
                    return this.$store.state.newParticipantsInfo;
                }
            }
        },

        methods: {
            showMember: function () {
                this.isMemberShow = true;
            },

            removeSelect: function (event) {
                let tag = document.getElementById("selectStaff" + this._uid);
                if (tag) {
                    if (!tag.contains(event.target)) {
                        this.isMemberShow = false;
                    }
                }
            },

            removeMember: function (userId) {
                let participantInfo = "";
                if (this.type === "add") {
                    participantInfo = this.$store.state.newParticipantsInfo;
                } else {
                    participantInfo = this.$store.state.participantsInfo;
                }
                participantInfo.splice(
                    participantInfo.map(item => item.id).indexOf(userId),
                    1
                );
                let params = {
                    type: this.type,
                    data: participantInfo
                };
                this.$store.dispatch("changeParticipantsInfo", params);
            },

            changeSelectedMember: function () {
                this.$emit("change", false);
            }
        }
    };
</script>

<style scoped>
    .addMember-trigger-button {
        margin-left: 10px;
    }

    .addMember-item {
        margin-left: 10px;
        margin-right: 0;
    }

    hr {
        border-top: 1px dotted #c4c4c4;
        width: 30px;
        margin-top: 15px;
    }

    .circle {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
    }

    .circle-bg {
        width: 5px;
        height: 5px;
        display: inline-block;
        border-radius: 50%;
    }
</style>