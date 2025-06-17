<template>
  <div class="form-container">
    <h2 class="form-title">干部信息</h2>
    <table class="info-table">
      <tr>
        <td>姓 名</td><td><input v-model="form.name" /></td>
        <td>性 别</td><td><input v-model="form.gender" /></td>
        <td>出生年月</td><td><input v-model="form.birth_date" /></td>
        <td rowspan="4" class="photo-cell">
          <img v-if="form.photo_url" :src="form.photo_url" class="photo" />
          <input type="file" @change="uploadPhoto" />
        </td>
      </tr>
      <tr>
        <td>年 龄</td><td><el-input-number v-model="form.age" :min="0" :max="150" /></td>
        <td>民 族</td><td><input v-model="form.ethnic_group" /></td>
        <td>籍 贯</td><td><input v-model="form.native_place" /></td>
      </tr>
      <tr>
        <td>出 生 地</td><td><input v-model="form.birth_place" /></td>
        <td>政治面貌</td><td><input v-model="form.political_status" /></td>
        <td>参加工作时间</td><td><input v-model="form.work_start_date" /></td>
      </tr>
      <tr>
        <td>健康状况</td><td><input v-model="form.health_status" /></td>
        <td>专业技术职务</td><td><input v-model="form.professional_title" /></td>
        <td>熟悉专业与专长</td><td><input v-model="form.specialty" /></td>
      </tr>
      <tr>
        <td>现任职务</td>
        <td colspan="6"><input v-model="form.current_position" /></td>
      </tr>
      <tr>
        <td>奖惩情况</td>
        <td colspan="6"><textarea v-model="form.awards_and_punishments" rows="2" /></td>
      </tr>
      <tr>
        <td>年度考核结果</td>
        <td colspan="6"><textarea v-model="form.annual_assessment" rows="2" /></td>
      </tr>
      <tr>
        <td>全日制学历</td><td><input v-model="form.full_time_education_degree" /></td>
        <td>毕业院校及专业</td><td colspan="2"><input v-model="form.full_time_education_school" /></td>
        <td>在职学历</td><td><input v-model="form.on_the_job_education_degree" /></td>
      </tr>
      <tr>
        <td>在职毕业院校及专业</td>
        <td colspan="6"><input v-model="form.on_the_job_education_school" /></td>
      </tr>
      <tr>
        <td>联系电话</td><td><input v-model="form.phone" /></td>
        <td>电子邮箱</td><td><input v-model="form.email" /></td>
        <td>填表人</td><td><input v-model="form.filled_by" /></td>
      </tr>
      <tr>
        <td>报送单位</td><td><input v-model="form.reporting_unit" /></td>
        <td>审批权限</td><td colspan="3"><input v-model="form.approval_authority" /></td>
      </tr>
      <tr>
        <td>行政任命情况</td>
        <td colspan="6"><input v-model="form.administrative_appointment" /></td>
      </tr>
    </table>

    <h3 class="form-title">简历信息</h3>
    <table class="info-table">
      <tr>
        <td>起始时间</td><td>结束时间</td><td>所在单位</td><td>部门</td><td>职务</td><td>操作</td>
      </tr>
      <tr v-for="(resume, index) in form.resumes" :key="index">
        <td><input v-model="resume.start_date" /></td>
        <td><input v-model="resume.end_date" /></td>
        <td><input v-model="resume.organization" /></td>
        <td><input v-model="resume.department" /></td>
        <td><input v-model="resume.position" /></td>
        <td><el-button type="danger" size="small" @click="removeResume(index)">删除</el-button></td>
      </tr>
    </table>
    <el-button size="small" type="primary" @click="addResume">添加简历</el-button>

    <h3 class="form-title">家庭成员信息</h3>
    <table class="info-table">
      <tr>
        <td>关系</td><td>姓名</td><td>出生日期</td><td>政治面貌</td><td>工作单位</td><td>操作</td>
      </tr>
      <tr v-for="(member, index) in form.family_members" :key="index">
        <td><input v-model="member.relation" /></td>
        <td><input v-model="member.name" /></td>
        <td><input v-model="member.birth_date" /></td>
        <td><input v-model="member.political_status" /></td>
        <td><input v-model="member.work_unit" /></td>
        <td><el-button type="danger" size="small" @click="removeFamilyMember(index)">删除</el-button></td>
      </tr>
    </table>
    <el-button size="small" type="primary" @click="addFamilyMember">添加家庭成员</el-button>

    <div class="form-buttons">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton, ElMessage } from 'element-plus'
import request from '@/utils/request'

const form = ref({
  name: '',
  gender: '',
  birth_date: '',
  age: 0,
  ethnic_group: '',
  native_place: '',
  birth_place: '',
  political_status: '',
  work_start_date: '',
  health_status: '',
  professional_title: '',
  specialty: '',
  phone: '',
  current_position: '',
  awards_and_punishments: '',
  annual_assessment: '',
  email: '',
  filled_by: '',
  full_time_education_degree: '',
  full_time_education_school: '',
  on_the_job_education_degree: '',
  on_the_job_education_school: '',
  reporting_unit: '',
  approval_authority: '',
  administrative_appointment: '',
  photo_url: '',
  resumes: [],
  family_members: []
})

function addResume() {
  form.value.resumes.push({
    user_id: form.value.user_id,
    start_date: '', end_date: '', organization: '', department: '', position: ''
  })
}

function addFamilyMember() {
  form.value.family_members.push({
    user_id: form.value.user_id,
    relation: '', name: '', birth_date: '', political_status: '', work_unit: ''
  })
}

function removeResume(index) {
  form.value.resumes.splice(index, 1)
}

function removeFamilyMember(index) {
  form.value.family_members.splice(index, 1)
}

async function uploadPhoto(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    form.value.photo_url = reader.result
  }
  reader.readAsDataURL(file)
}

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new File([u8arr], filename, { type: mime })
}

async function submitForm() {
  try {
    const mainRes = await request.post('/cadre/cadreinfo', { ...form.value })
    if (mainRes.data.code !== 200) {
      ElMessage.error('提交干部信息失败：' + mainRes.data.msg)
      return
    }
    const user_id = mainRes.data.data?.user_id || form.value.user_id
    form.value.user_id = user_id

    for (const resume of form.value.resumes) {
      resume.user_id = user_id
      await request.post('/cadre/resume', resume)
    }

    for (const member of form.value.family_members) {
      member.user_id = user_id
      await request.post('/cadre/familymember', member)
    }

    if (form.value.photo_url && !form.value.photo_url.startsWith('http')) {
      const file = dataURLtoFile(form.value.photo_url, 'photo.jpg')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('cadreId', user_id)
      const imgRes = await request.post('/cadre/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (imgRes.data.code !== 200) {
        ElMessage.error('照片上传失败：' + imgRes.data.msg)
        return
      }
    }

    ElMessage.success('全部信息提交成功')
  } catch (error) {
    ElMessage.error('提交异常')
    console.error(error)
  }
}

function resetForm() {
  for (let key in form.value) {
    if (Array.isArray(form.value[key])) {
      form.value[key] = []
    } else {
      form.value[key] = ''
    }
  }
  form.value.resumes.push({
    user_id: '', start_date: '', end_date: '', organization: '', department: '', position: ''
  })
  form.value.family_members.push({
    user_id: '', relation: '', name: '', birth_date: '', political_status: '', work_unit: ''
  })
  form.value.photo_url = ''
}
</script>

<style scoped>
/* 与原样式一致 */
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
input, textarea {
  width: 95%;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: inherit;
  padding: 2px;
}
textarea {
  resize: none;
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
.form-buttons {
  margin-top: 20px;
  text-align: center;
}
</style>