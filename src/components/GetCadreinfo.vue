<template>
  <div class="cadre-container">
    <h2 class="page-title">干部基本信息列表</h2>

    <el-table :data="cadres" style="width: 100%" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="user_id" label="学（工）号" />
      <el-table-column prop="reporting_unit" label="所在单位" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="viewDetail(row.user_id)">查看详情</el-button>
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
import axios from 'axios'

const cadres = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

const router = useRouter()

const fetchCadres = async () => {
  try {
    const res = await axios.get('/admin/cadrebypage', {
      params: {
        page: currentPage.value,
      },
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
