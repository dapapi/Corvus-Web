<template>
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th v-for="(item, index) in columns" :key="index">{{ item.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(items, index) in tbodyData" :key="index">
                <template v-for="(item, j) in items">
                    <td v-if="item.needRender" v-html="item.value" :key="j"></td>
                    <td v-else :key="j">>{{ item.value }}</td>
                </template>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: ['columns', 'dataSource'],

    data () {
        return {
        }
    },

    mounted () {
    },

    computed: {
        tbodyData () {
            let renderData = []
            if (Array.isArray(this.dataSource) && this.dataSource.length > 0) {
                const tItems = this.columns.map(n => {
                    let _obj = {}
                    _obj.key = n.key
                    if (n.render) {
                        _obj.render = n.render
                        _obj.event = n.event
                    }
                    return _obj
                })

                renderData = this.dataSource.map(n => {
                    let obj = {}
                    tItems.map(m => {
                        let temp = {}
                        if (m.render) {
                            temp.value = m.render
                            temp.needRender = true
                            temp.event = m.event
                        } else {
                            temp.value = n[m.key]
                            temp.needRender = false
                        }
                        obj[m.key] = temp
                    })
                    return obj
                })
            }
            return renderData
        }
    },

    methods: {
    }
}
</script>

<style lang="scss" scoped>

</style>
