<template>
    <el-container style="height: 100%;-webkit-app-region: drag;">
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
        <el-container style="padding: 30px">
            <router-view></router-view>
        </el-container>
    </el-container>
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
          this.$router.push({
              path: '/hello'
          })
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
