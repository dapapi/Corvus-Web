<template>
    <div class="department-item">
        <!-- <ul> -->
            <!-- <li v-for="(item, index) in departmentList" :key="index">
                <div class="name" :class="bgColor && index === showIndex ?'dark':''" @click="show(index)" :style="{paddingLeft: marginLeft + 'px'}">
                    <i v-show="index === showIndex" class="icon md-caret-down"></i>
                    <i v-show="index !== showIndex" class="icon md-caret-right"></i>
                    <img src="../../assets/img/department@2x.png" />
                    {{ item.name }} <span>({{count}})</span>
                </div>
                <ul v-show="index === showIndex">
                    <li v-for="(_item, _index) in item.users.data" :key="_index" :style="{paddingLeft: marginLeft + 20 + 'px'}">
                        {{ _item.name }}
                    </li>
                </ul>
                <Department v-show="index === showIndex" :left="marginLeft" v-if="item.departments.data.length > 0" :departmentList="item.departments.data" :key="index" />
            </li> -->
            <!-- <li v-for="(item, index) in departmentList" :key="index">
                <div class="name" :class="bgColor && index === showIndex ?'dark':''" @click="show(index)" :style="{paddingLeft: marginLeft + 'px'}">
                    <i v-show="index === showIndex" class="icon md-caret-down"></i>
                    <i v-show="index !== showIndex" class="icon md-caret-right"></i>
                    <img src="../../assets/img/department@2x.png" />
                    {{ data.name }} <span>({{count}})</span>
                </div>
            </li> -->
        <!-- </ul> -->
        <div class="name" :style="{paddingLeft: paddingLeft + 'px'}" @click="showList">
            <i v-show="visible" class="icon md-caret-down"></i>
            <i v-show="!visible" class="icon md-caret-right"></i>
            <img src="../../assets/img/department@2x.png" />
            {{ data.name }} <span>({{count}})</span>
        </div>
        <ul v-show="visible">
            <li v-for="(_item, _index) in data.users.data" :key="_index" :style="{paddingLeft: paddingLeft + 40 + 'px'}">
                {{ _item.name }}
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
        &:hover {
            background: #F5F5F5;
            color: #3f51b5;
            cursor: pointer;
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
}
.dark {
    background: #F5F5F5;
    color: #3f51b5;
}
</style>
