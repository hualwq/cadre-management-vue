<template>
  <div class="cadre-info-form-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2 class="page-title">干部信息详情</h2>
          <div class="action-buttons">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </div>
      </template>

      <div class="form-content">
        <!-- 基本信息 -->
        <h3 class="section-title">基本信息</h3>
        <el-form :model="form" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="form.name" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学工号">
                <el-input v-model="form.user_id" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="部门">
                <el-input v-model="form.department" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="类别">
                <el-input v-model="form.category" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任职组织">
                <el-input v-model="form.office" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学年学期">
                <el-input v-model="form.academic_year" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="申请日期">
                <el-input :value="`${form.applied_at_year}-${form.applied_at_month}-${form.applied_at_day}`" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <el-tag :type="form.Audited ? 'success' : 'warning'">
                  {{ form.Audited ? '已审核' : '未审核' }}
                </el-tag>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位ID">
                <el-input v-model="form.pos_id" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 年度信息 -->
        <h3 class="section-title">年度信息</h3>
        <el-table :data="positionExpList" style="width: 100%" border>
          <el-table-column prop="year" label="年份" width="120" />
          <el-table-column prop="department" label="部门" width="180" />
          <el-table-column prop="position" label="职位" width="180" />
          <el-table-column prop="Audited" label="审核状态" width="120">
            <template #default="{ row }">
              <el-tag :type="row.Audited ? 'success' : 'warning'">
                {{ row.Audited ? '已审核' : '未审核' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import { useRoute } from 'vue-router'

// 获取路由参数
const route = useRoute()
const id = route.query.id

// 初始化数据
const form = ref({
  id: 0,
  user_id: '',
  name: '',
  phone_number: '',
  email: '',
  department: '',
  category: '',
  office: '',
  academic_year: '',
  positions: '',
  applied_at_year: 0,
  applied_at_month: 0,
  applied_at_day: 0,
  Audited: false,
  pos_id: 0
})

const positionExpList = ref([]) // 年度信息列表
const isLoading = ref(false) // 加载状态

// 加载干部信息
const fetchCadreInfo = async (cadreId) => {
  isLoading.value = true
  try {
    const response = await request.get('/admin/phmodbyid', {
      params: { id: cadreId }
    })
    
    if (response.data.code === 200) {
      form.value = response.data.data
      // 获取年度信息
      if (form.value.pos_id) {
        await fetchPositionExp(form.value.pos_id)
      }
    } else {
      ElMessage.error(response.data.msg || '获取干部信息失败')
    }
  } catch (error) {
    console.error('获取干部信息出错:', error)
    ElMessage.error('获取干部信息失败')
  } finally {
    isLoading.value = false
  }
}

// 加载年度信息
const fetchPositionExp = async (posId) => {
  try {
    const response = await request.get('/cadre/getposexpbyposid', {
      params: { id: posId }
    })
    
    if (response.data.code === 200) {
      positionExpList.value = response.data.data.lists || []
    } else {
      ElMessage.error(response.data.msg || '获取年度信息失败')
    }
  } catch (error) {
    console.error('获取年度信息出错:', error)
    ElMessage.error('获取年度信息失败')
  }
}

// 提交表单
const submitForm = () => {
  // 这里可以实现编辑功能，根据需求决定是否允许编辑
  ElMessage({
    type: 'info',
    message: '当前为查看模式，暂不支持编辑'
  })
}

// 重置表单
const resetForm = () => {
  // 重新加载数据
  fetchCadreInfo(id)
}

// 页面挂载时加载数据
onMounted(() => {
  if (id) {
    fetchCadreInfo(id)
  } else {
    ElMessage.error('缺少必要的参数ID')
  }
})
</script>

<style scoped>
.cadre-info-form-container {
  padding: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 16px;
  color: #303133;
  margin: 20px 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.action-buttons {
  display: flex;
  gap: 10px;
}
</style>