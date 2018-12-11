<template>
    <div class="department-item">
        <div class="name" :style="{paddingLeft: paddingLeft + 'px'}" @click="selectData">
            <i v-show="visible" class="icon md-caret-down" @click.stop="showList" v-if="data.id"></i>
            <i v-show="!visible" class="icon md-caret-right" @click.stop="showList" v-if="data.id"></i>
            <img src="../assets/img/department@2x.png" v-if="data.id"/>
            {{ data.name }}
        </div>
        <!-- <ul v-show="visible" v-if="!isEdit">
            <li v-for="(_item, _index) in data.users.data" :key="_index" :style="{paddingLeft: paddingLeft + 40 + 'px'}">
                {{ _item.name }}
                <i class="icon md-eye" style="float: right;line-height: 40px;" @click.stop></i>
            </li>
        </ul> -->
        <template v-for="(item, index) in data.departments.data">
            <Departments v-show="visible" :data="item" :change="change" :isEdit="isEdit" :left="paddingLeft"
                         :key="index"/>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'DepartmentItem',
        props: ['data', 'bgColor', 'left', 'isEdit', 'change'],
        data() {
            return {
                visible: false,
                count: 0,
                isDark: false
            }
        },
        computed: {
            paddingLeft() {
                return this.left || this.left === 0 ? this.left * 1 + 20 : 0
            },
        },
        // 返回选中数据
        selectData () {
            this.change({id: this.data.id, name: this.data.name, pId: this.data.department_pid})
        }
    }
</script>

<style lang="scss" scoped>
    .department-item {
        width: 100%;
    }

    // ul {
    //     padding: 0;
    //     margin: 0;
    //     li {
    //         height: 40px;
    //         line-height: 40px;
    //         list-style: none;
    //         i {
    //             margin: 0 11px;
    //             display: none;
    //         }
    //         &:hover {
    //             background: #F5F5F5;
    //             // color: #3f51b5;
    //             cursor: pointer;
    //             i {
    //                 margin: 0 11px;
    //                 display: block;
    //             }
    //         }
    //     }
    // }
    .name {
        color: #333;
        font-size: 16px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        &:hover {
            background: #F5F5F5;
            // color: #3f51b5;
            .edit {
                display: block;
            }
        }
        i {
            width: 20px;
            height: 20x;
            margin: 0 8px;
            // border: 1px solid red;
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
