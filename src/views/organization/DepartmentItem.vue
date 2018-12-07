<template>
    <div class="department-item">
        <div class="name" :style="{paddingLeft: paddingLeft + 'px'}" @click="showList">
            <i v-show="visible" class="icon md-caret-down"></i>
            <i v-show="!visible" class="icon md-caret-right"></i>
            <img src="../../assets/img/department@2x.png" />
            {{ data.name }} <span>({{count}})</span> {{principal ? principal.name:'无负责人'}} 
            <i class="icon md-plus add-member" style="float: right;line-height: 40px;" @click.stop="addMember"></i>
        </div>
        <ul v-show="visible">
            <li v-for="(_item, _index) in data.users.data" :key="_index" :style="{paddingLeft: paddingLeft + 40 + 'px'}">
                {{ _item.name }}
                <i class="icon md-eye" style="float: right;line-height: 40px;" @click.stop></i>
            </li>
        </ul>
         <template v-for="(item, index) in data.departments.data">
            <Department v-show="visible" :data="item" :left="paddingLeft" :bgColor="true" :key="index" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'DepartmentItem',
    props: ['data', 'bgColor', 'left'],
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
            color: #3f51b5;
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
        color: #3f51b5;
        .add-member {
            display: block;
        }
    }
    i {
        margin: 0 14px;
    }
    img {
        position: relative;
        top: -2px;
        width: 14px;
        height: 12px;
        margin-right: 2px;
    }
    .add-member {
        display: none;
    }
}
.dark {
    background: #F5F5F5;
    color: #3f51b5;
}
</style>
