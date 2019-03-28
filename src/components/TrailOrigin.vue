<template>
    <div class="">
        <div class="text-right float-left pl-0"
             :class="[detailPage? 'col-md-3': 'col-md-2',isEdit || alwaysShow ? 'line-fiexd-height': '','trail-origin-title']">
            {{typeName}}来源
        </div>
        <div v-if="isEditSituation || alwaysShow">
            <!-- ⬆️判断是否永久显示 -->
            <div :class="detailPage?'col-md-9 float-left font-weight-bold expfee':'col-md-10 float-left pl-0'">
                <!-- ⬆️启用详情页样式 -->
                <div class="float-left col-md-6 px-0" v-if="trailOriginArr.length > 0">
                    <selectors :options="trailOriginArr" @change="changeTrailOriginType" ref='contentType'
                               :placeholder="'请选择线索来源'"></selectors>
                </div>
                <template v-if="trailOrigin == 1 || trailOrigin == 2 || trailOrigin == 3">
                    <div class="col-md-6 float-left pr-0">
                        <input type="text" class="form-control" title="" v-model="email" ref="focus" @blur="editInput">
                    </div>
                </template>
                <template v-else-if="(trailOrigin == 4 || trailOrigin == 5)">
                    <div class="col-md-6 float-left pr-0" style="z-index:500">
                        <input-selectors @change="changeTrailOrigin" :placeholder='memberFinder' type="selector"
                                         class="test" :submit='submit'
                                         :propSelectMemberName='trailOriginPerson.name'></input-selectors>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="!isEditSituation  && (trailOrigin == 1 || trailOrigin == 2 || trailOrigin == 3)"
             class="float-left font-weight-bold expfee" :class="detailPage? 'col-md-9' : 'col-md-10'">
            <span>{{typeFinder}}</span>
            <span v-if="content"> - {{content.value || content}}</span>
        </div>
        <div v-if="!isEditSituation && (trailOrigin == 4 || trailOrigin == 5)"
             class="float-left font-weight-bold expfee" :class="detailPage? 'col-md-9' : 'col-md-10'">
            <span>{{typeFinder}}  {{memberFinder}}</span>
        </div>
        <div v-if="!isEditSituation  && (trailOrigin != 1 && trailOrigin != 2 && trailOrigin != 3 && trailOrigin != 4 && trailOrigin != 5)"
             class="float-left font-weight-bold expfee" :class="detailPage? 'col-md-9' : 'col-md-10'">
            <span>{{typeFinder}}</span>
        </div>
    </div>
</template>

<script>
import config from '@/assets/js/config';
import verify from '@/assets/utils/verify';
import { mapState } from 'vuex';

export default {
  // 线索类型   {{什么}}线索  编辑状态   详情页样式  当前线索值    当前线索来源     永久显示           为了一个莫名其妙的需求加的
  props: ['trailType', 'typeName', 'isEdit', 'detailPage', 'content', 'contentType', 'alwaysShow', 'submit'],
  data() {
    return {
      trailOriginArr: '', // 线索类型列表
      trailOrigin: '', // 线索类型
      trailOriginPerson: '', // 人员
      email: '', //
      isEditSituation: '', // 编辑状态
      members: [],
      tempStore: '',
      inputFocus: false,
    };
  },
  mounted() {
    if (this.contentType) {
      this.trailOrigin = Number(this.contentType);
    }
    const organization_id = JSON.parse(Cookies.get('user')).organization_id;
    if (organization_id == 412) {
      this.trailOriginArr = config.trailBloggerOrigin;
    } else {
      this.trailOriginArr = config.trailOrigin;
    }
  },
  computed: {
    typeFinder() {
      if (this.contentType && this.trailOriginArr) {
        return this.trailOriginArr.find(item => item.value == this.contentType).name;
      }
      return '';
    },
    memberFinder() {
      if (this.members && this.content) {
        if (this.contentType == 4 || this.contentType == 5) {
          return this.members.find(item => item.id == this.content).name;
        }
      }
      return '';
    },
    ...mapState([
      'userList',
    ]),
    _userList() {
      this.members = this.userList;
      return this.userList;
    },
    contentAndUserList() {
      return this.members.length > 0 && this.content;
    },
  },
  watch: {
    _userList() {
      this.members = this.userList;
    },
    // 当userList和content同时存在时执行
    contentAndUserList() {
      if (this.contentAndUserList) {
        if (this.members.find(item => item.id == this.content)) {
          this.tempStore = this.content;
        }
      }
    },
    // 监听获取当前类型
    contentType(value) {
      this.trailOrigin = Number(value);
    },
    // 监听获取编辑状态
    isEdit(value) {
      this.isEditSituation = value;
      if (value == true) {
        this.$nextTick(() => {
          this.$refs.contentType.setValue(this.contentType); // 设置默认值
          this.email = this.content;
        });
      }
    },
    // 线索类型提交
    trailOrigin() {
      this.$emit('changeTrailOrigin', this.trailOrigin);
    },
    //
    email() {
      this.$emit('changeEmail', this.email);
    },
    //
    trailOriginPerson() {
      this.$emit('changeTrailOriginPerson', this.trailOriginPerson);
    },
  },
  methods: {
    changeTrailOriginType(value) {
      this.trailOriginPerson = '';
      this.email = '';
      this.trailOrigin = value;
    },
    //
    changeTrailOrigin(value) {
      this.trailOriginPerson = value;
    },

    editInput() {
                if ((this.trailOrigin == 1 || this.trailOrigin == 2) && !verify.email(this.email)) {
                    this.$refs.focus.focus();
                    
                }

            },
  },
};
</script>

<style>
    .line-fiexd-height {
        line-height: 34px;
    }

    /* .assistor{
        width: 100%;
    } */
</style>
