<template>
  <div class="cadre-home">
    <el-menu
      default-active="post-assessment"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item index="post-assessment">工作考核</el-menu-item>
      <el-menu-item index="post-cadreposition">任职证明</el-menu-item>
      <el-menu-item index="post-cadreinfo">基本信息</el-menu-item>
      <el-menu-item index="get-cadreinfolist">查看待审核信息</el-menu-item>
      <el-menu-item index="post-assessmentlist">查看待审核工作考核列表</el-menu-item>
      <el-menu-item index="post-positionlist">查看待审核任职证明列表</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    handleSelect(key) {
      this.$router.push(`/home/${key}`);
    }
  }
};
</script>
<style scoped>
.cadre-home {
  display: flex;
  height: 100vh;
}
.el-menu-vertical-demo {
  width: 200px;
}
</style>