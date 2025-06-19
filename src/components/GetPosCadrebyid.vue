<template>
  <div class="form-container">
    <h2 class="form-title">已审核干部信息</h2>
    <table class="info-table">
      <tr>
        <td>姓 名</td><td>{{ detail.name }}</td>
        <td>性 别</td><td>{{ detail.gender }}</td>
        <td>出生年月</td><td>{{ detail.birth_date }}</td>
        <td rowspan="4" class="photo-cell">
          <img v-if="detail.photo_url" :src="detail.photo_url" class="photo" />
        </td>
      </tr>
      <tr>
        <td>年 龄</td><td>{{ detail.age }}</td>
        <td>民 族</td><td>{{ detail.ethnic_group }}</td>
        <td>籍 贯</td><td>{{ detail.native_place }}</td>
      </tr>
      <tr>
        <td>出 生 地</td><td>{{ detail.birth_place }}</td>
        <td>政治面貌</td><td>{{ detail.political_status }}</td>
        <td>参加工作时间</td><td>{{ detail.work_start_date }}</td>
      </tr>
      <tr>
        <td>健康状况</td><td>{{ detail.health_status }}</td>
        <td>专业技术职务</td><td>{{ detail.professional_title }}</td>
        <td>熟悉专业与专长</td><td>{{ detail.specialty }}</td>
      </tr>
      <tr>
        <td>现任职务</td>
        <td colspan="6">{{ detail.current_position }}</td>
      </tr>
      <tr>
        <td>奖惩情况</td>
        <td colspan="6">{{ detail.awards_and_punishments }}</td>
      </tr>
      <tr>
        <td>年度考核结果</td>
        <td colspan="6">{{ detail.annual_assessment }}</td>
      </tr>
      <tr>
        <td>全日制学历</td><td>{{ detail.full_time_education_degree }}</td>
        <td>毕业院校及专业</td><td colspan="2">{{ detail.full_time_education_school }}</td>
        <td>在职学历</td><td>{{ detail.on_the_job_education_degree }}</td>
      </tr>
      <tr>
        <td>在职毕业院校及专业</td>
        <td colspan="6">{{ detail.on_the_job_education_school }}</td>
      </tr>
      <tr>
        <td>联系电话</td><td>{{ detail.phone }}</td>
        <td>电子邮箱</td><td>{{ detail.email }}</td>
        <td>填表人</td><td>{{ detail.filled_by }}</td>
      </tr>
      <tr>
        <td>报送单位</td><td>{{ detail.reporting_unit }}</td>
        <td>审批权限</td><td colspan="3">{{ detail.approval_authority }}</td>
      </tr>
      <tr>
        <td>行政任命情况</td>
        <td colspan="6">{{ detail.administrative_appointment }}</td>
      </tr>
    </table>

    <h3 class="form-title">简历信息</h3>
    <table class="info-table">
      <tr>
        <td>起始时间</td><td>结束时间</td><td>所在单位</td><td>部门</td><td>职务</td>
      </tr>
      <tr v-for="(resume, index) in resumeList" :key="index">
        <td>{{ resume.start_date }}</td>
        <td>{{ resume.end_date }}</td>
        <td>{{ resume.organization }}</td>
        <td>{{ resume.department }}</td>
        <td>{{ resume.position }}</td>
      </tr>
    </table>

    <h3 class="form-title">家庭成员信息</h3>
    <table class="info-table">
      <tr>
        <td>关系</td><td>姓名</td><td>出生日期</td><td>政治面貌</td><td>工作单位</td>
      </tr>
      <tr v-for="(member, index) in familyList" :key="index">
        <td>{{ member.relation }}</td>
        <td>{{ member.name }}</td>
        <td>{{ member.birth_date }}</td>
        <td>{{ member.political_status }}</td>
        <td>{{ member.work_unit }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import axios from 'axios'
import request from '../utils/request.js'

const route = useRoute()
const id = route.query.id

const detail = ref({})
const resumeList = ref([])
const familyList = ref([])

const fetchCadreInfo = async () => {
  try {
    const res = await request.get('/admin/phmodbyid', { params: { id } })
    if (res.data.code === 200) {
      detail.value = res.data.data
      fetchResume()
    }
  } catch (err) {
    console.error('获取干部基本信息失败:', err)
  }
}

const fetchResume = async () => {
  try {
    const res = await request.get('/cadre/getposexpbyposid', { params: { id } })
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
.form-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  font-family: "SimSun", serif;
}
.form-title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0 10px;
}
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
.info-table td {
  border: 1px solid black;
  padding: 5px;
  vertical-align: middle;
  text-align: center;
}
.photo-cell {
  width: 140px;
  text-align: center;
}
.photo {
  width: 120px;
  height: 160px;
  object-fit: cover;
  margin-bottom: 5px;
  border: 1px solid #aaa;
}
</style>