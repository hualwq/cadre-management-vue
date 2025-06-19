<template>
  <div class="form-container">
    <h2 class="form-title">干部信息</h2>
    <table class="info-table">
      <tr>
        <td>姓 名</td><td><input v-model="form.name" /></td>
        <td>性 别</td><td><input v-model="form.gender" /></td>
        <td>出生年月</td><td><input v-model="form.birth_date" /></td>
        <td rowspan="4" class="photo-cell">
          <img
            v-if="form.photo_url"
            :src="form.photo_url"
            class="photo"
            @error="form.photo_url = null"
          />

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
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const form = ref({
  user_id: '',
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

const originalForm = ref({})
const photoFile = ref(null) // 保存原始上传图片

const fetchUserId = async () => {
  try {
    const res = await request.get('/cadre/getuserid')
    if (res.data.code === 200 && res.data.data) {
      form.value.user_id = res.data.data.user_id
      return res.data.data.user_id
    }
  } catch (err) {
    console.error('获取用户 ID 失败', err)
    ElMessage.error('获取用户 ID 失败')
  }
  return null
}

const fetchData = async () => {
  const userId = await fetchUserId()
  if (!userId) return

  try {
    const res = await request.get('/admin/cadreinfo', {
      params: { user_id: userId }
    })
        if (res.data.code === 200 && res.data.data) {
      Object.assign(form.value, res.data.data)
      Object.assign(originalForm.value, res.data.data)

      if (res.data.data.photourl) {
        form.value.photo_url = `http://localhost:8088/upload/images/${res.data.data.photourl}`
      }
    }


    const famRes = await request.get('/admin/fammonbycadreid', {
      params: { user_id: userId }
    })
    if (famRes.data.code === 200) {
      form.value.family_members = famRes.data.data || []
      originalForm.value.family_members = [...form.value.family_members]
    }

    const resRes = await request.get('/admin/resmonbycadreid', {
      params: { user_id: userId }
    })
    if (resRes.data.code === 200) {
      form.value.resumes = resRes.data.data || []
      originalForm.value.resumes = [...form.value.resumes]
    }
  } catch (err) {
    console.error('数据加载失败', err)
  }
}

onMounted(() => {
  fetchData()
})

// 比较两个对象，返回有变化的字段
const getChangedFields = (obj1, obj2) => {
  const changed = {}
  for (const key in obj1) {
    if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      changed[key] = obj1[key]
    }
  }
  return changed
}

async function submitForm() {
  try {
    const method = form.value.user_id ? 'put' : 'post'
    const mainData = { ...form.value }
    delete mainData.photo_url

    const changedMainFields = getChangedFields(mainData, originalForm.value)
    if (Object.keys(changedMainFields).length > 0) {
      const mainRes = await request[method]('/cadre/cadreinfo', changedMainFields)

      if (mainRes.data.code !== 200) {
        ElMessage.error('提交失败：' + mainRes.data.msg)
        return
      }

      const user_id = mainRes.data.data?.user_id || form.value.user_id
      form.value.user_id = user_id
    }

    for (const resume of form.value.resumes) {
      const originalResume = originalForm.value.resumes.find(r => r.id === resume.id)
      if (originalResume) {
        const changedResumeFields = getChangedFields(resume, originalResume)
        if (Object.keys(changedResumeFields).length > 0) {
          resume.user_id = form.value.user_id
          await request.put('/cadre/resume', { ...changedResumeFields, user_id: form.value.user_id })
        }
      } else {
        resume.user_id = form.value.user_id
        await request.post('/cadre/resume', resume)
      }
    }

    for (const member of form.value.family_members) {
      const originalMember = originalForm.value.family_members.find(m => m.id === member.id)
      if (originalMember) {
        const changedMemberFields = getChangedFields(member, originalMember)
        if (Object.keys(changedMemberFields).length > 0) {
          member.user_id = form.value.user_id
          await request.put('/cadre/familymember', { ...changedMemberFields, user_id: form.value.user_id })
        }
      } else {
        member.user_id = form.value.user_id
        await request.post('/cadre/familymember', member)
      }
    }

    if (photoFile.value) {
      try {
        const formData = new FormData()
        formData.append('image', photoFile.value)

        const imgRes = await request.post('/cadre/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (imgRes.data.code !== 200) {
          ElMessage.error('照片上传失败：' + imgRes.data.msg)
          return
        }
      } catch (error) {
        console.error('照片上传错误:', error)
        ElMessage.error('照片上传过程中发生错误')
        return
      }
    }

    ElMessage.success('提交成功')
  } catch (e) {
    console.error(e)
    ElMessage.error('提交出错')
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
}

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
  photoFile.value = file

  const reader = new FileReader()
  reader.onload = () => {
    form.value.photo_url = reader.result
  }
  reader.readAsDataURL(file)
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