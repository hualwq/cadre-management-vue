<template>
  <div class="cadre-home">
    <el-menu
      default-active="post-assessment"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item index="post-assessment">岗位评估</el-menu-item>
      <el-menu-item index="post-cadreposition">岗位干部位置</el-menu-item>
      <el-menu-item index="cadre-info">干部信息</el-menu-item>
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