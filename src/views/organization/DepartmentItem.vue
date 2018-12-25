<template>
    <div class="department-item">
        <div class="name" :class="bgColor ? 'dark': ''" :style="{paddingLeft: paddingLeft + 'px'}">
            <span @click="showList">
                <i v-show="visible" class="md-caret-down showList"></i>
                <i v-show="!visible" class="md-caret-right showList"></i>
                <img src="../../assets/img/department@2x.png" />
                {{ data.name }} <span>({{count}})</span> <span class="principal">{{principal ? principal.name:'无负责人'}}</span>
            </span>
            <i v-if="!isEdit" class="iconfont icon-tianjia edit" style="float: right;line-height: 50px;" @click.stop="check(data)"></i>
            <div class="drop" v-else>
                 <i class="iconfont icon-gengduo1 font-size-24" aria-hidden="true" id="org-dropdown"
                    data-toggle="dropdown" aria-expanded="false" style="cursor: pointer; float: right;line-height: 50px;">
                </i>
                <div class="dropdown-menu dropdown-menu-left" aria-labelledby="org-dropdown" role="menu" x-placement="bottom-start" style="min-width: 0">
                    <a class="dropdown-item" role="menuitem" @click="edit(data)">编辑部门</a>
                    <a class="dropdown-item" role="menuitem" @click="check(data)">选择成员</a>
                    <a class="dropdown-item" role="menuitem" @click="move(data)">移动部门到</a>
                    <a class="dropdown-item" role="menuitem" @click="addChild(data)">添加子部门</a>
                    <a class="dropdown-item" role="menuitem" @click="del(data)">删除部门</a>
                </div>
            </div>
        </div>
        <ul v-show="visible" v-if="!isEdit">
            <li v-for="(_item, _index) in data.users.data" :key="_index" :style="{paddingLeft: paddingLeft + 40 + 'px'}">
                <Avatar :imgUrl="_item.icon_url" style="margin-right: 10px; vertical-align: unset" />{{ _item.name }}
                <router-link :to="`/staff/detail/${_item.id}`"><i class="icon md-eye" style="float: right;line-height: 50px;" @click.stop></i></router-link>
            </li>
        </ul>
         <template v-for="(item, index) in data.departments.data">
            <Department 
                v-show="visible" 
                :data="item" 
                :editDepartment="editDepartment" 
                :delDepartment="delDepartment" 
                :checkMember="checkMember"
                :addChildDepartment="addChildDepartment"
                :moveDepartment="moveDepartment"
                :isEdit="isEdit" :left="paddingLeft" :key="index" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'DepartmentItem',
    props: ['data', 'bgColor', 'left', 'isEdit', 'editDepartment', 'delDepartment', 'checkMember', 'addChildDepartment', 'moveDepartment', 'dIndex'],
    data () {
        return {
            visible: false,
            count: 0,
        }
    },
    beforeMount () {
        this.count = this.countNum(this.data)
    },
    computed: {
        paddingLeft () {
            return this.left || this.left === 0 ? this.left * 1 + 20 : 0
        },
        // 负责人
        principal () {
            return this.data.users.data.find(item => item.is_department_principal === 1)
        }
    },
    methods: {
        // 列表展示
        showList () {
            this.visible = !this.visible
            if (this.dIndex || this.dIndex === 0) {
                this.$emit('changeIndex', this.dIndex)
            }
        },
        // 计算人数
        countNum (data) {
            let count = 0
            if (data.departments.data) {
                data.departments.data.map(item => {
                    count = count + this.countNum(item)
                })
            }
            return data.users.data.length + count
        },
        // 编辑部门
        edit (data) {
            this.editDepartment(data)
            const item = data.users.data.find(item => item.is_department_principal === 1)
            this.$store.commit('changeNewPrincipal', {
                name: item.name,
                id: item.id
            })
        },
        // 删除
        del (data) {
            this.delDepartment(data)
        },
        // 选择成员
        check (data) {
            this.checkMember(data)
            // 
        },
        // 移动部门
        move (data) {
            this.moveDepartment(data)
        },
        // 添加子部门
        addChild (data) {
            this.addChildDepartment(data)
        }
    }
}
</script>


<style lang="scss" scoped>
ul {
    padding: 0;
    margin: 0;
    li {
        height: 50px;
        line-height: 50px;
        list-style: none;
        i {
            margin: 0 11px;
            display: none;
        }
        &:hover {
            background: #F5F5F5;
            cursor: pointer;
            i {
                margin: 0 11px;
                display: block;
            }
        }
    }
}
.name {
    color: #333;
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    padding-right: 14px;
    &:hover {
        background: #F5F5F5;
        .edit {
            display: block;
        }
    }
    .showList {
        width: 30px;
        height: 20px;
        text-align: center;
    }
    img {
        position: relative;
        top: -2px;
        width: 14px;
        height: 12px;
        margin-right: 2px;
    }
    .edit {
        display: none;
    }
}
.dark {
    background: #F5F5F5;
    color: #3f51b5;
}
.drop {
    float: right;
}
.principal {
    position: absolute;
    left: 300px;
}

</style>
