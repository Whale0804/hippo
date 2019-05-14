<template>
    <section style="-webkit-app-region: drag" class="login">
        <div class="logo">
            <img src="../../../static/logo.png"  alt="">
        </div>
        <div class="form">
            <h2 class="title">登录</h2>
            <div class="form-group">
                <!-- <label for="AccessKey">AccessKey</label> -->
                <input type="password" class="form-control" id="username" v-model="hippo.username" placeholder="username">
            </div>
            <div class="form-group">
                <!-- <label for="SecretKey">SecretKey</label> -->
                <input type="password" class="form-control" id="password" v-model="hippo.password" placeholder="password">
            </div>
            <el-button type="primary" @click.prevent="onLogin" size="small" class="btn">确定</el-button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                hippo: {
                    username: "",
                    password: ""
                },
                AccessToken: ""
            };
        },
        methods: {
            onLogin : function(){
                this.$electron.ipcRenderer.send("onLogin", "haha");
            }
        }
    }
</script>

<style scoped>
    .login {
        background: #AEA7A1;
        width: 100%;
        height: 100%;
    }
    .logo {
        width: 72px;
        margin: 0 auto;
        padding-top: 10%;
    }
    img {
       width: 64px;;
    }
    .form {
        width: 240px;
        margin: 0 auto;
        background: #fff;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        padding: 30px;
    }
    .form .title {
        text-align: center;
        font-size: 18px;
        line-height: 26px;
        margin-bottom: 15px;
        color: #409EFF;
    }
    .form-group {
        margin-bottom: 15px;
    }
    .form-control {
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #D7DAE2;
        border-radius: 4px;
        -webkit-transition: border-color ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
        -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    .btn {
        width: 100%;
        background: #928B83;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
        color:    #D7DAE2;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #D7DAE2;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #D7DAE2;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #D7DAE2;
    }
</style>
