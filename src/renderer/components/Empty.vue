<template>
    <div class="connects-empty">
        <img src="../../../static/logo.png" class="logo" alt="">
        <div class="connects-empty-name">
            <h1>Hippo</h1>
            <h2><i class="el-icon-magic-stick"></i> Hippo最好看和最好用的Redis客户端。</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Empty"
    }
</script>

<style lang="scss" scoped>
    .connects-empty {
        display: flex;
        flex-direction: column;
        padding: 30px;
        height: 100%;
        width: 100%;
        margin-top: 100px;
    }
    .logo {
        width: 128px;
        margin: 0 auto;
    }
    .connects-empty-name {
        text-align: center;
        margin-top: 15px;
    h1 {
        font-size: 32px;
        color: #706963;
    }
    h2 {
        font-size: 20px;
        color: #AEA7A1;
    .el-icon-magic-stick {
        color: #dd6161;
        font-weight: bold;
    }
    }
    }
</style>
