<template>
  <div class="department-item">
    <div class="name" :style="{paddingLeft: paddingLeft + 'px'}" @click="selectData()">
      <i v-show="visible" class="icon md-caret-down" @click.stop="showList" v-if="data.id"></i>
      <i v-show="!visible" class="icon md-caret-right" @click.stop="showList" v-if="data.id"></i>
      <img src="../assets/img/department@2x.png" v-if="data.id">
      {{ data.name }}
    </div>
    <ul v-if="showUser" v-show="visible">
        <li v-for="(_item, _index) in data.users.data" :key="_index" :style="{paddingLeft: paddingLeft + 40 + 'px'}" @click="selectData(_item)">
            {{ _item.name }}
            <!-- <i class="icon md-eye" style="float: right;line-height: 40px;" @click.stop></i> -->
        </li>
    </ul>
    <template v-for="(item, index) in data.departments.data">
      <Departments
        v-show="visible"
        :data="item"
        :change="change"
        :isEdit="isEdit"
        :left="paddingLeft"
        :key="index"
        :showUser="showUser"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "DepartmentItem",
  props: ["data", "bgColor", "left", "isEdit", "change", "showUser"], // showUser 是否展示部门成员
  data() {
    return {
      visible: false,
      count: 0,
      isDark: false
    };
  },
  computed: {
    paddingLeft() {
      return this.left || this.left === 0 ? this.left * 1 + 20 : 0;
    }
  },
  methods: {
    // 返回选中数据
    selectData(item) {
        if (item) {
            this.change({
                id: item.id,
                name: item.name,
                type: 'user'
            });
        } else {
            this.change({
                id: this.data.id,
                name: this.data.name,
                pId: this.data.department_pid,
                type: 'department'
            });
        }
    },
    showList () {
        this.visible = !this.visible
        if (this.dIndex || this.dIndex === 0) {
            this.$emit('changeIndex', this.dIndex)
        }
    },
  }
};
</script>

<style lang="scss" scoped>
.department-item {
  width: 100%;
}

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
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  &:hover {
    background: #f5f5f5;
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
  background: #f5f5f5;
  color: #3f51b5;
}

.drop {
  float: right;
}
</style>
