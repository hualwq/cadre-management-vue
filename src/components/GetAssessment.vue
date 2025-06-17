<template>
  <div class="assessment-container">
    <h2 class="page-title">干部工作考核列表</h2>

    <div class="filter-bar">
      <el-checkbox v-model="showUnauditedOnly" @change="handleFilterChange">
        只看未审核
      </el-checkbox>
    </div>

    <el-table :data="assessments" style="width: 100%" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="user_id" label="学（工）号" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="category" label="类别" />
      <el-table-column prop="assess_dept" label="考核部门" />
      <el-table-column prop="year" label="年份" />
      <el-table-column
      prop="work_summary"
      label="工作总结"
      show-overflow-tooltip
    >
      <template #default="{ row }">
        {{ row.work_summary.length > 15 ? row.work_summary.slice(0, 15) + '...' : row.work_summary }}
      </template>
    </el-table-column>

      <el-table-column prop="grade" label="评定等级" />
      <el-table-column prop="Audited" label="是否审核" width="100">
        <template #default="{ row }">
          <el-tag :type="row.Audited ? 'success' : 'warning'">
            {{ row.Audited ? '已审核' : '未审核' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="viewDetail(row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import request from '../utils/request.js'

const assessments = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const showUnauditedOnly = ref(false)

const router = useRouter()

const fetchAssessments = async () => {
  try {
    const res = await request.get('/admin/assessmentbypage', {
      params: {
        page: currentPage.value,
        audited: showUnauditedOnly.value ? false : undefined,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    if (res.data.code === 200) {
      assessments.value = res.data.data.lists
      total.value = res.data.data.total
    } else {
      console.error('后端返回异常:', res.data)
    }
  } catch (error) {
    console.error('获取考核数据失败:', error)
  }
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
  fetchAssessments()
}

const handleFilterChange = () => {
  currentPage.value = 1
  fetchAssessments()
}

const viewDetail = (id) => {
  router.push(`/assessment/detail/${id}`)
}

onMounted(() => {
  fetchAssessments()
})
</script>

<style scoped>
.assessment-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
}

.filter-bar {
  margin-bottom: 15px;
  text-align: center;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
