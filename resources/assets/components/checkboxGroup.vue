<template>
    <div class="checkbox-group">
        <template >
            <div 
                class="checkbox-custom checkbox-primary"
                style="display: inline-block; margin: 10px 10px;"
                v-for="(item, index) in optionData"
                :key="index"
            >
                <input type="checkbox" :value="item.value" :id="item.id" v-model="checkeData" />
                <label :for="item.id">{{ item.name }}</label>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: ['optionData'],
    data () {
        return {
            checkeData: []
        }
    },
    watch: {
        checkeData() {
            this.$emit('onchange', this.checkeData)
        }
    },
    mounted () {

    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

</style>

