<template>
  <div class="proof-container">
    <h2 class="page-title">干部任职证明审核列表</h2>
    <el-button type="primary" @click="createNewPosition">新建任职证明</el-button>
    <el-table :data="proofList" style="width: 100%" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="user_id" label="学（工）号" />
      <el-table-column prop="department" label="部门" />
      <el-table-column prop="office" label="任职组织" />
      <el-table-column prop="academic_year" label="学年学期" />
      <el-table-column prop="applied_date" label="申请日期">
        <template #default="{ row }">
          {{ row.applied_at_year }}-{{ row.applied_at_month }}-{{ row.applied_at_day }}
        </template>
      </el-table-column>
      <el-table-column prop="Audited" label="是否审核" width="100">
        <template #default="{ row }">
          <el-tag :type="row.Audited ? 'success' : 'warning'">
            {{ row.Audited ? '已审核' : '未审核' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="viewDetail(row.id, row.Audited)">查看详情</el-button>
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
import { useRouter } from 'vue-router'
import request from '../utils/request.js'

const proofList = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

const router = useRouter()

const fetchProofList = async () => {
  try {
    const res = await request.get('/admin/phmodbypage', {
      params: {
        page: currentPage.value,
      },
    })
    if (res.data.code === 200) {
      proofList.value = res.data.data.lists
      total.value = res.data.data.total
    }
  } catch (error) {
    console.error('获取任职证明数据失败:', error)
  }
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
  fetchProofList()
}

const viewDetail = (id, audited) => {
  if (audited) {
    router.push({
      name: 'GetPosCadrebyid',
      query: {id}
    })
  } else {
    router.push({
      name: 'PostCadreposition',
      query: {id}
    })
  }
}

const createNewPosition = () => {
  router.push('/home/post-cadreposition')
}

onMounted(() => {
  fetchProofList()
})
</script>

<style scoped>
.proof-container {
  padding: 20px;
}

.page-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>