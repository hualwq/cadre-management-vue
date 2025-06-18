<template>
  <div class="position-history-container">
    <h2 class="title">干部任职证明（电子文件）</h2>

    <div class="section right-align">
      <span>申请时间：</span>
      <span>{{ detail.applied_at_year }} 年 {{ detail.applied_at_month }} 月 {{ detail.applied_at_day }} 日</span>
    </div>

    <el-table :data="baseInfoTable" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="label" label="" width="120" />
      <el-table-column prop="value" label="" />
      <el-table-column v-if="hasThirdColumn" prop="value2" label="" />
    </el-table>

    <div class="section">
      <strong>任职信息</strong>
      <ul>
        <li v-for="(exp, index) in positionList" :key="index">
          {{ exp.academic_year }} 学年于 {{ exp.office }} 担任 {{ exp.positions || '未知职务' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, ElMessage } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = route.query.id
const detail = ref({})
const positionList = ref([])

const baseInfoTable = ref([])
const hasThirdColumn = true

const fetchPositionHistory = async () => {
  try {
    // 获取基本信息
    const res1 = await axios.get('/admin/phmodbyid', { params: { id } })
    if (res1 && res1.data && res1.data.code === 200) {
      detail.value = res1.data.data
      buildBaseTable()
      await fetchPositionExp(detail.value.user_id)
    } else {
      console.error('获取基本信息失败，响应数据不符合预期:', res1);
      ElMessage.error('获取基本信息失败，请稍后重试');
    }
  } catch (err) {
    console.error('获取基本信息失败:', err)
    ElMessage.error('获取基本信息失败，请稍后重试');
  }
}

const fetchPositionExp = async (cadre_id) => {
  try {
    const res2 = await axios.get('/admin/poexpbycadreid', { params: { cadre_id } })
    if (res2 && res2.data && res2.data.code === 200) {
      positionList.value = res2.data.data || []
    } else {
      console.error('获取任职记录失败，响应数据不符合预期:', res2);
      ElMessage.error('获取任职记录失败，请稍后重试');
    }
  } catch (err) {
    console.error('获取任职记录失败:', err)
    ElMessage.error('获取任职记录失败，请稍后重试');
  }
}

const buildBaseTable = () => {
  baseInfoTable.value = [
    { label: '姓名', value: detail.value.name, value2: `学（工）号：${detail.value.user_id}` },
    { label: '手机号码', value: detail.value.phone_number, value2: `电子邮箱：${detail.value.email}` },
    { label: '院系', value: detail.value.department, value2: `类别：${detail.value.category}` },
    { label: '任职部门', value: detail.value.office, value2: `任职年度：${detail.value.academic_year}` }
  ]
}

onMounted(() => {
  if (id) {
    fetchPositionHistory()
  } else {
    console.error('未获取到有效的 id 参数')
    ElMessage.error('未获取到有效的任职证明记录 id，请检查链接')
  }
})
</script>

<style scoped>
.position-history-container {
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.section {
  margin-top: 20px;
  font-size: 16px;
}

.right-align {
  text-align: right;
}

ul {
  margin-top: 10px;
  padding-left: 20px;
}

li {
  line-height: 1.8;
}
</style>