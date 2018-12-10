<template>
    <div class="department-item">
        <div class="name" :class="visible && bgColor ? 'dark': ''" :style="{paddingLeft: paddingLeft + 'px'}">
            <span @click="showList">
                <i v-show="visible" class="icon md-caret-down showList"></i>
                <i v-show="!visible" class="icon md-caret-right showList"></i>
                <img src="../../assets/img/department@2x.png" />
                {{ data.name }} <span>({{count}})</span> {{principal ? principal.name:'无负责人'}}
            </span>
            <i v-if="!isEdit" class="icon md-plus edit" style="float: right;line-height: 40px;" @click.stop="addMember"></i>
            <div class="drop" v-else>
                 <i class="icon md-more font-size-24" aria-hidden="true" id="org-dropdown"
                    data-toggle="dropdown" aria-expanded="false" style="cursor: pointer; float: right;line-height: 40px;">
                </i>
                <div class="dropdown-menu dropdown-menu-left" aria-labelledby="org-dropdown" role="menu" x-placement="bottom-start" style="min-width: 0">
                    <a class="dropdown-item" role="menuitem" @click="edit(data)">编辑部门</a>
                    <a class="dropdown-item" role="menuitem">选择成员</a>
                    <a class="dropdown-item" role="menuitem">移动部门到</a>
                    <a class="dropdown-item" role="menuitem">添加子部门</a>
                    <a class="dropdown-item" role="menuitem">删除部门</a>
                </div>
            </div>
        </div>
        <ul v-show="visible" v-if="!isEdit">
            <li v-for="(_item, _index) in data.users.data" :key="_index" :style="{paddingLeft: paddingLeft + 40 + 'px'}">
                {{ _item.name }}
                <i class="icon md-eye" style="float: right;line-height: 40px;" @click.stop></i>
            </li>
        </ul>
         <template v-for="(item, index) in data.departments.data">
            <Department v-show="visible" :data="item" :isEdit="isEdit" :left="paddingLeft" :key="index" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'DepartmentItem',
    props: ['data', 'bgColor', 'left', 'isEdit', 'editDepartment'],
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
        // 添加部门成员
        addMember (id) {
            alert('添加成员')
        },
        // 编辑部门
        edit (data) {
            this.editDepartment(data)
            // alert(1)
        },
        // 删除
        delDepartment () {
            // 
        },
        // 选择成员
        chooseMember () {
            // 
        },
        // 移动部门
        moveDepartment () {
            // 
        },
        // 添加子部门
        addChildDepartment () {

        }
    }
}
</script>


<style lang="scss" scoped>
ul {
    padding: 0;
    margin: 0;
    li {
        height: 40px;
        line-height: 40px;
        list-style: none;
        i {
            margin: 0 11px;
            display: none;
        }
        &:hover {
            background: #F5F5F5;
            // color: #3f51b5;
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
    font-size: 16px;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
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
</style>
