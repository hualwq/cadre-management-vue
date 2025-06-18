<template>
  <div class="assessment-detail-container">
    <h2 class="page-title">考核详情</h2>

    <el-descriptions :column="2" border>
      <el-descriptions-item label="姓名">{{ detail.name }}</el-descriptions-item>
      <el-descriptions-item label="学（工）号">{{ detail.user_id }}</el-descriptions-item>
      <el-descriptions-item label="电话">{{ detail.phone }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ detail.email }}</el-descriptions-item>
      <el-descriptions-item label="部门">{{ detail.department }}</el-descriptions-item>
      <el-descriptions-item label="类别">{{ detail.category }}</el-descriptions-item>
      <el-descriptions-item label="考核部门">{{ detail.assess_dept }}</el-descriptions-item>
      <el-descriptions-item label="年份">{{ detail.year }}</el-descriptions-item>
      <el-descriptions-item label="是否审核">
        <el-tag :type="detail.Audited ? 'success' : 'warning'">
          {{ detail.Audited ? '已审核' : '未审核' }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <div class="summary-section">
      <h3>工作总结</h3>
      <p class="summary-text">{{ detail.work_summary }}</p>
    </div>

    <div class="grade-section">
      <h3>考核等级</h3>
      <el-radio-group v-model="selectedGrade">
        <el-radio-button label="优秀" />
        <el-radio-button label="合格" />
        <el-radio-button label="不合格" />
      </el-radio-group>
    </div>

    <div class="submit-button">
      <el-button type="primary" @click="submitGrade" :disabled="!selectedGrade">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, ElMessage } from 'vue-router'
// import axios from 'axios'
import request from '../utils/request.js'

const route = useRoute()
// 从路由参数中获取 id
const id = route.query.id

const detail = ref({})
const selectedGrade = ref('')

// 获取考核详情的函数
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
    ElMessage.error('获取考核详情失败，请稍后重试')
  }
}

// 提交考核等级的函数
const submitGrade = async () => {
  try {
    const res = await request.post('/admin/assessment', {
      id: detail.value.id,
      result: selectedGrade.value
    })
    if (res.data.code === 200) {
      ElMessage.success('提交成功')
    } else {
      ElMessage.error('提交失败')
    }
  } catch (error) {
    ElMessage.error('提交出错')
    console.error(error)
  }
}

// 组件挂载时调用获取考核详情的函数
onMounted(() => {
  if (id) {
    fetchAssessment()
  } else {
    console.error('未获取到有效的 id 参数')
    ElMessage.error('未获取到有效的考核记录 id，请检查链接')
  }
})
</script>

<style scoped>
.assessment-detail-container {
  padding: 20px;
}

.page-title {
  font-size: 22px;
  margin-bottom: 20px;
}

.summary-section {
  margin-top: 30px;
}

.summary-text {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 6px;
  white-space: pre-wrap;
}

.grade-section {
  margin-top: 30px;
}

.submit-button {
  margin-top: 20px;
}
</style>