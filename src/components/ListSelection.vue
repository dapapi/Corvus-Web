<template>
    <div class="list">
        <div class="left">
            <div class="left-header pb-10">{{ listName }}</div>
            <div class="left-cont">
                <ul class="pointer-content">
                    <li v-for="(item,index) in list" :key="item.id" @click="handleClick(index)">{{item.text}}</li>
                </ul>
            </div>
        </div>
        <div class="middle">
            <div class="middle-icon">
                <i class="icon md-caret-right"></i>
            </div>
        </div>
        <div class="right">
            <div class="right-header pb-10">{{ selectName }}</div>
            <div class="right-cont">
                <ul @click="back" class="pointer-content">
                    <li v-for="(item,index) in listright" :key="index" @click="back(index)">{{item.text}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "ListSelection",
        props: ['listName', 'selectName'],
        data() {
            return {
                list: [
                    {
                        id: 1,
                        text: "申请事件"
                    },
                    {
                        id: 2,
                        text: "申请人"
                    },
                    {
                        id: 3,
                        text: "审批状态"
                    },
                    {
                        id: 4,
                        text: "审批人"
                    },
                    {
                        id: 5,
                        text: "申请事件"
                    },
                    {
                        id: 6,
                        text: "申请人"
                    },
                    {
                        id: 7,
                        text: "审批状态"
                    },
                    {
                        id: 8,
                        text: "审批人"
                    }
                ],
                listright: []
            };
        },
        methods: {
            handleClick(i) {
                this.list.forEach((item, index) => {
                    if (i == index) {
                        this.listright.push(item);
                        this.list.splice(index, 1)
                    }
                })
            },
            back(i) {
                this.listright.forEach((item, index) => {
                    if (i == index) {
                        this.list.push(item);
                        this.listright.splice(index, 1)
                    }
                })
            }

        }
    };
</script>
<style scoped>
    li {
        list-style: none;
    }

    .list {
        display: flex;
        justify-content: center;
        position: relative;
    }

    .left-cont, .right-cont {
        width: 200px;
        height: 300px;
        border: 1px solid #f2f2f2;
        overflow: hidden;
    }

    .left ul li:hover, .right ul li:hover {
        background: #f2f2f2;
    }

    .left ul, .right ul {
        width: 100%;
        height: 300px;
        overflow-y: auto;
        padding: 0;
        text-indent: 2em;

    }

    .left ul li, .right ul li {
        height: 50px;
        line-height: 50px;
        width: 100%;
    }

    .middle {
        position: relative;
        font-size: 24px;
        padding: 0 20px;
    }

    .middle-icon {
        position: absolute;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
    }
</style>


