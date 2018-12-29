<template>
    <div class="addMember">
        <ul class="addMember-items">
            <li class="addMember-item" v-for="member in selectMemberArr" :key="member.id">
                <!-- <img onerror="noneAvatar(this)" class="avatar" :src="member.avatar" title="Herman Beck" src=""> -->
                <Avatar :imgUrl="member.icon_url"/>
                <span class="addMember-remove" @click="removeMember(member.id)">
                    <i class="md-minus-circle"></i>
                </span>
            </li>
        </ul>
        <div class="addMember-trigger" :class="isMemberShow ? 'addMember-active': ''" :id="'selectStaff' + this._uid">
            <div class="addMember-trigger-button" :class="selectMemberArr.length > 0 ? 'addMember-trigger-left' : ''"
                 @click="showMember"><i class="iconfont icon-tianjia"></i></div>
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
        props: ['type'],
        data() {
            return {
                isMemberShow: false,
            }
        },
        mounted() {
            this.globalClick(this.removeSelect);
        },

        computed: {
            //collectInfo:[],//收款金额
            //payInfo:[],//付款金额
            //contractInfo:[],//合同类型
            //divisionInfo:[],//分成比例
            //incubationInfo:[],//孵化期
            //billInfo:[],//账单
            selectMemberArr: function () {
                if (this.type === 'change') {
                    return this.$store.state.participantsInfo
                }else if(this.type ==='collect'){
                    return this.$store.state.collectInfo
                }else if(this.type === 'pay'){
                    return this.$store.state.payInfo
                }else if(this.type === 'contract'){
                    return this.$store.state.contractInfo
                }else if(this.type === 'division'){
                    return this.$store.state.divisionInfo
                }else if(this.type === 'incubation'){
                    return this.$store.state.incubationInfo
                }else if(this.type === 'bill'){
                    return this.$store.state.billInfo
                }
                
                else {
                    return this.$store.state.newParticipantsInfo
                }
            }
        },

        methods: {

            showMember: function () {
                this.isMemberShow = true;
            },

            removeSelect: function (event) {
                // alert(9999)
                let tag = document.getElementById("selectStaff" + this._uid);
                if (tag) {
                    // alert(222)
                    if (!tag.contains(event.target)) {
                        // alert(333)
                        this.isMemberShow = false;
                    }
                }
            },

            removeMember: function (userId) {
                //collectInfo:[],//收款金额
                //payInfo:[],//付款金额
                //contractInfo:[],//合同类型
                //divisionInfo:[],//分成比例
                //incubationInfo:[],//孵化期
                //billInfo:[],//账单
                let participantInfo = '';
                if (this.type === 'add') {
                    participantInfo = this.$store.state.newParticipantsInfo;
                }else if(this.type === 'collect'){
                    participantInfo = this.$store.state.collectInfo;
                }else if(this.type === 'pay'){
                    participantInfo = this.$store.state.payInfo;
                }else if(this.type === 'contract'){
                    participantInfo = this.$store.state.contractInfo;
                }else if(this.type === 'division'){
                    participantInfo = this.$store.state.divisionInfo;
                }else if(this.type === 'incubation'){
                    participantInfo = this.$store.state.incubationInfo;
                }else if(this.type === 'bill'){
                    participantInfo = this.$store.state.billInfo;
                }
                    
                else {
                    participantInfo = this.$store.state.participantsInfo;
                }
                participantInfo.splice(participantInfo.map(item => item.id).indexOf(userId), 1);
                let params = {
                    type: this.type,
                    data: participantInfo
                };
                this.$store.dispatch('changeParticipantsInfo', params);
                this.$emit('change', userId)
            },

            changeSelectedMember: function () {
                this.$emit('change', false)
            }

        }
    }

</script>
<style scoped>
    .addMember-trigger-left {
        margin-left: 10px;
    }

    .addMember-item {
        margin-left: 10px;
        margin-right: 0;
        vertical-align: middle;
    }

    .addMember-item:first-child {
        margin-left: 0;
    }
</style>