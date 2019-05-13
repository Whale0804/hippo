<template>
  <el-container id="app" style="-webkit-app-region: drag">
      <el-header>
        <div class="hippo-header">
          <div class="hippo-header-name">
            <img src="../../../static/logo.png" alt="">
            <h1>Hippo</h1>
          </div>
          <div class="hippo-header-action">
            <el-tooltip placement="top" content="Github">
              <img src="../../../static/icon/github.png" class="github" alt="" @click="openGithub">
            </el-tooltip>
            <el-tooltip placement="top" content="Redis Shell Tool">
              <img src="../../../static/icon/shell.png" class="shell" alt="" @click="openShell">
            </el-tooltip>
          </div>
        </div>
      </el-header>
      <window-view ref="windowView"></window-view>
  </el-container>
</template>

<script>
import windowView from './windowView'
export default {
  name: 'frameViews',
  components: {
    windowView
  },
  data (){
    return {
      dialogFormVisible: false,
    }
  },
  methods: {
    openGithub: function () {
      this.$electron.shell.openExternal("https://github.com/githinkcn/hippo");
    },
    openShell: function () {
      this.$refs.windowView.openShell()
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-header {
    background-color: #AEA7A1;
    color: #fff;
  }
  .hippo-header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    margin-top: 20px;
    line-height: 40px;
  }
  .hippo-header-name {
    flex: 1;
    display: flex;
    align-items: center; /*垂直居中*/
    img {
      height: 32px;
    }
    h1 {
      font-size: 20px;
      padding-left: 10px;
    }
  }
  .hippo-header-action {
    display: flex;
    align-items: center; /*垂直居中*/
    .github {
      height: 20px;
      cursor: pointer;
      padding: 0 10px;
    }
    .shell {
      height: 26px;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
