<template>
    <input
            type="file"
            class="dropify"
            data-max-file-size="500M"
    />
</template>
<script>

    export default {
        name: "dropify-file",
        props: [],
        mounted() {
            let self = this;

            $(this.$el).dropify({
                messages: {
                    'default': '请点击或者拖放一个文件到这里',
                    'replace': '拖放或者点击更新图片',
                    'remove': '删除',
                    'error': '上传出现错误'
                },
                error: {
                    'fileSize': '文件最大为 ({{ value }}).'
                }
            }).change(function (e) {

                let file = e.target.files[0];
                self.$emit('change', file);

            });

        }
    }

</script>
