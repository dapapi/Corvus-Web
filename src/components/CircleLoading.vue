<template>
    <div class="loading"></div>
</template>
<script>
export default {

}
</script>

<style scope>
.loading{
            /*固定loading*/
            /* position: fixed; */
            z-index: 99999;
            /* top: 50%; */
            /* left: 50%; */
            /*垂直水平居中*/
            /* margin: -20px 0 0 -20px; */
            width: 30px;
            height: 30px;
            border: 2px solid;
            border-color: #00bcd4 #00bcd4 transparent;
            border-radius: 50%;
            box-sizing: border-box;
            /*动画时间1s，线性变化，无限循环*/
            animation: loading 1s linear infinite;
        }
        @keyframes loading{
            0%{
                transform: rotate(0deg);
            }
            100%{
                transform: rotate(360deg);
            }
        }
</style>
