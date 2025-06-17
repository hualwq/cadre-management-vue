<template>
  <div class="cadre-container">
    <div class="content-wrapper">
      <h2 class="page-title">干部基本信息列表</h2>

      <div class="filter-section">
        <el-checkbox v-model="showOnlyUnapproved" @change="fetchCadres">
          只看待审核
        </el-checkbox>
      </div>

      <div class="table-wrapper">
        <el-table :data="cadres" style="width: 100%" border>
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="gender" label="性别" align="center" />
          <el-table-column prop="birth_date" label="出生日期" align="center" />
          <el-table-column prop="ethnic_group" label="民族" align="center" />
          <el-table-column prop="native_place" label="籍贯" align="center" />
          <el-table-column prop="Audited" label="是否审核" width="100" align="center">
            <template #default="{ row }">
              <el-tag :type="row.Audited ? 'success' : 'warning'">
                {{ row.Audited ? '已审核' : '未审核' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="viewDetail(row.user_id)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request.js'

const cadres = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const showOnlyUnapproved = ref(false)

const router = useRouter()

const fetchCadres = async () => {
  try {
    const res = await request.get('/admin/cadrebypage', {
      params: {
        page: currentPage.value,
        unapproved_only: showOnlyUnapproved.value
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    if (res.data.code === 200) {
      cadres.value = res.data.data.lists
      total.value = res.data.data.total
    }
  } catch (error) {
    console.error('获取干部信息失败:', error)
  }
}

const handlePageChange = (newPage) => {
  currentPage.value = newPage
  fetchCadres()
}

const viewDetail = (userId) => {
  router.push(`/cadre/detail/${userId}`)
}

onMounted(() => {
  fetchCadres()
})
</script>

<style scoped>
.cadre-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.content-wrapper {
  width: 80%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
}

.filter-section {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.table-wrapper {
  width: 100%;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

/* Center align all cell content in the table */
:deep(.el-table .cell) {
  text-align: center;
}
</style>