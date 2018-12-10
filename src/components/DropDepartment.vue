<template>
    <div class="department-item">
        <button type="button" class="btn btn-outline btn-default dropdown-toggle"
                id="departmentDropdown" data-hover="dropdown" data-close-others="false"
                data-toggle="dropdown" aria-expanded="false">
            {{ text ? text : '选择部门' }}
        </button>
        <div class="dropdown-menu dropdown-menu-left" aria-labelledby="departmentDropdown" role="menu"
             x-placement="bottom-end" style="min-width: calc(100% - 30px)">
            <template v-for="(item, index) in data">
                <Departments :data="item" :change="select" :key="index"/>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DropDepartment',
        props: ['data', 'bgColor', 'left', 'isEdit', 'name'],
        data() {
            return {
                text: this.name
            }
        },
        methods: {
            select(val) {
                this.$emit('change', val)
                this.text = val.name
            }
        }
    }
</script>


<style lang="scss" scoped>
    #departmentDropdown {
        width: 100%;
        text-align: left;
        &:after {
            float: right;
            margin-top: 10px;
        }
    }
</style>
