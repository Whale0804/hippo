<template>
  <el-container id="app" style="-webkit-app-region: drag">
      <el-header>

      </el-header>
      <window-view></window-view>
  </el-container>
</template>

<script>
import windowView from './windowView'
export default {
  name: 'frameViews',
  components: {
    windowView
  }
}
</script>
<style lang="scss" scoped>
  .el-header {
    background-color: #AEA7A1;
    color: #fff;
  }
</style>
