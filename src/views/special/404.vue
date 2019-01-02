<template>
    <div class="main">
        <div class="content">
            <div class="code">404</div>
            <p>没有找到该页面!</p>
            <router-link to="/"><button class="btn btn-primary">回到主页</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.main {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
.content {
    position: relative;
    top: -80px;
    display: inline-block;
    text-align: center;
    margin-top: -20px;
}
.code {
    font-size: 130px;
    color: #666;
    font-weight: 400;
}
.main p {
    font-size: 24px;
    color: #666;
}
.main .btn {
    margin-top: 20px;
}
</style>
