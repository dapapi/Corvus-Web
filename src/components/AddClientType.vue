<template>
    <div class="client-type">
        <div class="site-action" data-plugin="actionBtn" data-toggle="modal" @click="show">
            <button type="button"
                    class="site-action-toggle btn-raised btn btn-success btn-floating waves-effect waves-classic">
                <i class="front-icon iconfont icon-tianjia animation-scale-up" aria-hidden="true"></i>
                <i class="back-icon iconfont icon-tianjia animation-scale-up" aria-hidden="true"></i>
            </button>
        </div>
        <ul>
            <li v-for="(item, index) in clientTypeArr"
                :style="{right: XPos(index), bottom: YPos(index), transitionDelay: `${index * 0.1}s` }"
                :class="visible?'show':''"
                @click="handleClick(item.value)"
                :key="index">{{ item.name.split('客户')[0] }}
            </li>
        </ul>
    </div>
</template>

<script>
    import config from '../assets/js/config'

    export default {
        name: 'AddClientType',
        props: ['type'],
        data() {
            return {
                visible: false
            }
        },

        computed: {
            clientTypeArr: function () {
                if (this.type === 'project') {
                    let arr = config.clientTypeArr;
                    arr.push({name: '基础客户', value: 5});
                    return arr
                } else {
                    return config.clientTypeArr
                }
            }
        },

        methods: {
            // 显示、隐藏
            show() {
                this.visible = !this.visible
            },
            XPos(num) {
                return `calc(12px + 2rem + ${Math.sin(Math.PI / 4 * num) * 78}px)`
            },
            YPos(num) {
                return `calc(35px + 2rem + ${Math.cos(Math.PI / 4 * num) * 78}px)`
            },
            handleClick(val) {
                this.$emit('change', val)
                this.show()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .client-type {
        ul {
            li {
                display: inline-block;
                width: 46px;
                height: 46px;
                line-height: 46px;
                border-radius: 50%;
                color: #fff;
                font-weight: bold;
                background: #4caf50;
                text-align: center;
                cursor: pointer;
                position: fixed;
                opacity: 0;
                transition: opacity 0.8s;
            }
            li.show {
                opacity: 1;
            }
        }
    }
</style>
