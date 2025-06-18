<template>
  <div class="cadre-info-container">
    <h2 class="title">干部详细信息</h2>

    <section class="info-section">
      <h3>基本信息</h3>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="姓名">{{ baseInfo.name }}</el-descriptions-item>
        <el-descriptions-item label="学（工）号">{{ baseInfo.user_id }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ baseInfo.gender }}</el-descriptions-item>
        <el-descriptions-item label="出生日期">{{ baseInfo.birth_date }}</el-descriptions-item>
        <el-descriptions-item label="民族">{{ baseInfo.ethnic_group }}</el-descriptions-item>
        <el-descriptions-item label="籍贯">{{ baseInfo.native_place }}</el-descriptions-item>
        <el-descriptions-item label="出生地">{{ baseInfo.birth_place }}</el-descriptions-item>
        <el-descriptions-item label="政治面貌">{{ baseInfo.political_status }}</el-descriptions-item>
        <el-descriptions-item label="工作时间">{{ baseInfo.work_start_date }}</el-descriptions-item>
        <el-descriptions-item label="健康状况">{{ baseInfo.health_status }}</el-descriptions-item>
        <el-descriptions-item label="职称">{{ baseInfo.professional_title }}</el-descriptions-item>
        <el-descriptions-item label="专业">{{ baseInfo.specialty }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ baseInfo.phone }}</el-descriptions-item>
        <el-descriptions-item label="电子邮箱">{{ baseInfo.email }}</el-descriptions-item>
        <el-descriptions-item label="现任职务">{{ baseInfo.current_position }}</el-descriptions-item>
        <el-descriptions-item label="奖惩情况">{{ baseInfo.awards_and_punishments }}</el-descriptions-item>
        <el-descriptions-item label="年度考核">{{ baseInfo.annual_assessment }}</el-descriptions-item>
        <el-descriptions-item label="填报人">{{ baseInfo.filled_by }}</el-descriptions-item>
        <el-descriptions-item label="全日制学历">{{ baseInfo.full_time_education_degree }}</el-descriptions-item>
        <el-descriptions-item label="全日制毕业院校">{{ baseInfo.full_time_education_school }}</el-descriptions-item>
        <el-descriptions-item label="在职学历">{{ baseInfo.on_the_job_education_degree }}</el-descriptions-item>
        <el-descriptions-item label="在职毕业院校">{{ baseInfo.on_the_job_education_school }}</el-descriptions-item>
        <el-descriptions-item label="报送单位">{{ baseInfo.reporting_unit }}</el-descriptions-item>
        <el-descriptions-item label="审批意见">{{ baseInfo.approval_authority }}</el-descriptions-item>
        <el-descriptions-item label="任命情况">{{ baseInfo.administrative_appointment }}</el-descriptions-item>
      </el-descriptions>
    </section>

    <section class="info-section">
      <h3>家庭成员</h3>
      <el-table :data="familyList" style="width: 100%" border>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="relation" label="关系" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="workplace" label="工作单位" />
        <el-table-column prop="position" label="职务" />
        <el-table-column prop="phone" label="联系电话" />
      </el-table>
    </section>

    <section class="info-section">
      <h3>简历信息</h3>
      <el-table :data="resumeList" style="width: 100%" border>
        <el-table-column prop="start_time" label="开始时间" />
        <el-table-column prop="end_time" label="结束时间" />
        <el-table-column prop="company" label="所在单位" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="position" label="职务" />
      </el-table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const user_id = route.query.user_id
const baseInfo = ref({})
const familyList = ref([])
const resumeList = ref([])

const fetchCadreInfo = async () => {
  try {
    const res = await axios.get('/admin/cadreinfo', { params: { user_id } })
    if (res.data.code === 200) {
      baseInfo.value = res.data.data
      fetchFamily(user_id)
      fetchResume(user_id)
    }
  } catch (err) {
    console.error('获取干部基本信息失败:', err)
  }
}

const fetchFamily = async (user_id) => {
  try {
    const res = await axios.get('/admin/fammonbycadreid', { params: { user_id } })
    if (res.data.code === 200) {
      familyList.value = res.data.data || []
    }
  } catch (err) {
    console.error('获取家庭成员信息失败:', err)
  }
}

const fetchResume = async (user_id) => {
  try {
    const res = await axios.get('/admin/resmonbycadreid', { params: { user_id } })
    if (res.data.code === 200) {
      resumeList.value = res.data.data || []
    }
  } catch (err) {
    console.error('获取简历信息失败:', err)
  }
}

onMounted(() => {
  fetchCadreInfo()
})
</script>

<style scoped>
.cadre-info-container {
  padding: 20px;
  font-family: "Microsoft YaHei", sans-serif;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}

.info-section {
  margin-top: 30px;
}

.info-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>