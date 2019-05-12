<template>
    <div style="-webkit-app-region: drag">
        <el-container class="container">
            <el-header style="-webkit-app-region: drag">
                <h1 class="logo">
                    <img src="../../../static/logo.png" alt="logo"> Hippo
                </h1>
                <el-tooltip effect="dark" content="登出" placement="top">
                    <div class="quit" @click="onLogout">
                        <img src="../../../static/icon/quit.svg" alt="quit">
                    </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="GitHub" placement="top">
                    <div class="github" @click="GitHub">
                        <img src="../../../static/icon/github.png" alt="quit">
                    </div>
                </el-tooltip>
            </el-header>
            <el-container>
                <el-container style="position: relative;">
                    <el-aside width="230px" class="aside">
                        <div class="side-wrapper">
                            <div>
                                <el-button type="primary" @click="createLink" round size="small" class="btn">新建链接</el-button>
                            </div>
                            <div class="db-list">
                                1
                            </div>
                        </div>
                    </el-aside>
                    <el-container>
                        <el-main class="main">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </el-main>
                    </el-container>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  methods: {
      GitHub: function () {
          this.$electron.shell.openExternal("https://github.com/githinkcn/hippo");
      },
      onLogout: function () {
          this.$electron.ipcRenderer.send("onLogout", false);
      },
      createLink: function () {
          localStorage.setItem("key","123")
      }
  },
  mounted() {
      this.$electron.ipcRenderer.on("msg", (event, data) => {
          console.log(data)
      });
      console.log(localStorage.getItem("key"));
  },
  watch: {

  },
  components: {

  }
};
</script>

<style lang="scss" scoped>
    .container{
        height: 650px;
    }
    .el-header {
        background-color: #AEA7A1;
        color: #fff;
        position: relative;
        .logo {
            width: 280px;
            height: 29px;
            font-size: 21px;
            margin-top: 22px;
            line-height: 29px;
            img {
                width: 32px;
                height: auto;
                vertical-align: top;
            }
        }
        .github {
            position: absolute;
            bottom: 18px;
            right: 60px;
            width: 15px;
            cursor:pointer;
            img {
                width: 22px;
                height: auto;
            }
        }
        .quit {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 20px;
            cursor:pointer;
            img {
                width: 100%;
                height: auto;
            }
        }
    }
    .aside {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to bottom, #efefef, #efefef);
    }
    .main {
        padding: 0;
        margin: 0;
        overflow: hidden;
        display: flex;
        flex: 1;
        flex-shrink: 0;
    }
    .side-wrapper{
        padding: 30px;
        display: flex;
        flex-direction: column;
        height: 100%;
        .btn{
            width: 100%;
        }
    }
    .db-list{
        background: #5daf34;
        margin-top: 10px;
        height: 100%;
        width: 100%;
    }
</style>
