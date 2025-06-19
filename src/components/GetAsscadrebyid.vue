<template>
  <div class="assessment-detail-container">
    <h2 class="page-title">已审核考核详情</h2>

    <el-descriptions :column="2" border>
      <el-descriptions-item label="学（工）号">{{ detail.user_id }}</el-descriptions-item>
      <el-descriptions-item label="院系">{{ detail.department }}</el-descriptions-item>
      <el-descriptions-item label="类别">{{ detail.category }}</el-descriptions-item>
      <el-descriptions-item label="考核部门">{{ detail.assess_dept }}</el-descriptions-item>
      <el-descriptions-item label="考核年度">{{ detail.year }}</el-descriptions-item>
    </el-descriptions>

    <h3 class="section-title">本年度主要工作说明</h3>
    <div class="work-summary-container">
      <p>{{ detail.work_summary }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import axios from 'axios'
import request from '../utils/request'

const route = useRoute()
const id = route.query.id

const detail = ref({})

const fetchAssessment = async () => {
  try {
    const res = await request.get('/admin/assmodbyid', {
      params: { id }
    })
    if (res.data.code === 200) {
      detail.value = res.data.data
    }
  } catch (error) {
    console.error('获取考核详情失败:', error)
  }
}

onMounted(() => {
  fetchAssessment()
})
</script>

<style scoped>
.assessment-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 25px 0 15px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.work-summary-container {
  max-width: 600px;
  margin: 0 auto 20px auto;
}
</style>