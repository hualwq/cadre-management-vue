<template>
  <div class="cadre-home">
    <el-menu
      default-active="post-assessment"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item index="get-assessment">工作考核</el-menu-item>
      <el-menu-item index="get-cadrepos">干部任职证明</el-menu-item>
      <el-menu-item index="post-cadreinfo">干部基本信息</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    handleSelect(key) {
      this.$router.push(`/cadrehome/${key}`);
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