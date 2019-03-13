<template>
    <div class="avatar" :style="sizeStyle">
        <img v-if="showImg" :src="this.imgUrl" alt="头像" />
        <div v-else class="avatar-main" :style="{backgroundColor: this.color}">
            {{ this.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Avatar",
    props: ["imgUrl"], // size为数字 为width与height
    data() {
        return {
            name: '',
            color: '',
            showImg: false,
            sizeStyle: {
                width: '',
                height: ''
            },
        };
    },

    mounted () {
       this.resize()
    },

    computed: {
        _imgUrl () {
            return this.imgUrl
        }
    },

    watch: {
        _imgUrl () {
            this.resize()
        }
    },

    methods: {
        resize () {
            if (this.imgUrl) {
                if (this.imgUrl.substr(0, 1) === '#') {
                    this.showImg = false
                    this.name = this.imgUrl.substr(this.imgUrl.length - 2, 2)
                    this.color = this.imgUrl.substr(0, 7)
                } else {

                    this.showImg = true
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.avatar {
    width: 30px;
    height: 30px;
    display: inline-block;
    font-size: 12px;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .avatar-main {
        width: 100%;
        height: 100%;
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #3188E6;
    }
}
</style>