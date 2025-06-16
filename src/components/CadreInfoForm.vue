<template>
  <div class="form-container">
    <h2 class="form-title">干部信息<br /></h2>
    <table class="info-table">
      <tr>
        <td>姓 名</td><td><input v-model="form.name" /></td>
        <td>性 别</td><td><input v-model="form.gender" /></td>
        <td>出生年月</td><td><input v-model="form.birthDate" /></td>
        <td rowspan="4" class="photo-cell">
          <img v-if="form.photoUrl" :src="form.photoUrl" class="photo" />
          <input type="file" @change="uploadPhoto" />
        </td>
      </tr>
      <tr>
        <td>年 龄</td><td><input v-model="form.age" /></td>
        <td>民 族</td><td><input v-model="form.ethnicGroup" /></td>
        <td>籍 贯</td><td><input v-model="form.nativePlace" /></td>
      </tr>
      <tr>
        <td>出 生 地</td><td><input v-model="form.birthPlace" /></td>
        <td>政治面貌</td><td><input v-model="form.politicalStatus" /></td>
        <td>参加工作时间</td><td><input v-model="form.workStartDate" /></td>
      </tr>
      <tr>
        <td>健康状况</td><td><input v-model="form.healthStatus" /></td>
        <td>专业技术职务</td><td><input v-model="form.professionalTitle" /></td>
        <td>熟悉专业与专长</td><td><input v-model="form.specialty" /></td>
      </tr>
      <tr>
        <td>现任职务</td>
        <td colspan="6"><input v-model="form.currentPosition" /></td>
      </tr>
      <tr>
        <td>奖惩情况</td>
        <td colspan="6"><textarea v-model="form.awardsAndPunishments" rows="2" /></td>
      </tr>
      <tr>
        <td>年度考核结果</td>
        <td colspan="6"><textarea v-model="form.annualAssessment" rows="2" /></td>
      </tr>
      <tr>
        <td>全日制学历</td><td><input v-model="form.fullTimeEducationDegree" /></td>
        <td>毕业院校及专业</td><td colspan="2"><input v-model="form.fullTimeEducationSchool" /></td>
        <td>在职学历</td><td><input v-model="form.onTheJobEducationDegree" /></td>
      </tr>
      <tr>
        <td>在职毕业院校及专业</td>
        <td colspan="6"><input v-model="form.onTheJobEducationSchool" /></td>
      </tr>
      <tr>
        <td>联系电话</td><td><input v-model="form.phone" /></td>
        <td>电子邮箱</td><td><input v-model="form.email" /></td>
        <td>填表人</td><td><input v-model="form.filledBy" /></td>
      </tr>
      <tr>
        <td>报送单位</td><td><input v-model="form.reportingUnit" /></td>
        <td>审批权限</td><td colspan="3"><input v-model="form.approvalAuthority" /></td>
      </tr>
      <tr>
        <td>行政任命情况</td>
        <td colspan="6"><input v-model="form.administrativeAppointment" /></td>
      </tr>
    </table>

    <h3 class="form-title">简历信息</h3>
    <table class="info-table">
      <tr>
        <td>起始时间</td>
        <td>结束时间</td>
        <td>所在单位</td>
        <td>部门</td>
        <td>职务</td>
        <td>操作</td>
      </tr>
      <tr v-for="(resume, index) in form.resumes" :key="index">
        <td><input v-model="resume.startDate" /></td>
        <td><input v-model="resume.endDate" /></td>
        <td><input v-model="resume.organization" /></td>
        <td><input v-model="resume.department" /></td>
        <td><input v-model="resume.position" /></td>
        <td>
          <el-button type="danger" size="small" @click="removeResume(index)">删除</el-button>
        </td>
      </tr>
    </table>
    <el-button size="small" type="primary" @click="addResume">添加简历</el-button>

    <h3 class="form-title">家庭成员信息</h3>
    <table class="info-table">
      <tr>
        <td>关系</td>
        <td>姓名</td>
        <td>出生日期</td>
        <td>政治面貌</td>
        <td>工作单位</td>
        <td>操作</td>
      </tr>
      <tr v-for="(member, index) in form.familyMembers" :key="index">
        <td><input v-model="member.relation" /></td>
        <td><input v-model="member.name" /></td>
        <td><input v-model="member.birthDate" /></td>
        <td><input v-model="member.politicalStatus" /></td>
        <td><input v-model="member.workUnit" /></td>
        <td>
          <el-button type="danger" size="small" @click="removeFamilyMember(index)">删除</el-button>
        </td>
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
  id: '',
  name: '', gender: '', birthDate: '', age: '',
  ethnicGroup: '', nativePlace: '', birthPlace: '',
  politicalStatus: '', workStartDate: '', healthStatus: '',
  professionalTitle: '', specialty: '', currentPosition: '',
  awardsAndPunishments: '', annualAssessment: '',
  email: '', filledBy: '',
  fullTimeEducationDegree: '', fullTimeEducationSchool: '',
  onTheJobEducationDegree: '', onTheJobEducationSchool: '',
  reportingUnit: '', approvalAuthority: '', administrativeAppointment: '',
  phone: '', photoUrl: '',
  resumes: [
    { cadreId: '', startDate: '', endDate: '', organization: '', department: '', position: '' }
  ],
  familyMembers: [
    { cadreId: '', relation: '', name: '', birthDate: '', politicalStatus: '', workUnit: '' }
  ]
})

// 上传照片到后端
async function uploadPhoto(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('file', file)
    
    // 调用新的上传路由
    const res = await request.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (res.data.code === 200) {
      // 假设后端返回照片URL
      form.value.photoUrl = res.data.data.url
      ElMessage.success('照片上传成功')
    } else {
      ElMessage.error('照片上传失败：' + res.data.msg)
    }
  } catch (error) {
    ElMessage.error('照片上传异常')
    console.error(error)
  }
}

function addResume() {
  form.value.resumes.push({
    cadreId: form.value.id,
    startDate: '', endDate: '',
    organization: '', department: '', position: ''
  })
}

function addFamilyMember() {
  form.value.familyMembers.push({
    cadreId: form.value.id,
    relation: '', name: '',
    birthDate: '', politicalStatus: '', workUnit: ''
  })
}

function removeResume(index) {
  form.value.resumes.splice(index, 1)
}

function removeFamilyMember(index) {
  form.value.familyMembers.splice(index, 1)
}

async function submitForm() {
  try {
    // 1. 提交主干部信息
    const payload = { ...form.value }
    const mainRes = await request.post('/cadre/cadreinfo', payload, )
    
    if (mainRes.data.code !== 200) {
      ElMessage.error('提交干部信息失败：' + mainRes.data.msg)
      return
    }

    const cadreId = mainRes.data.data?.cadreId || form.value.id
    form.value.id = cadreId // 更新本地ID
    
    // 2. 上传照片（如果有新照片）
    if (form.value.photoUrl && !form.value.photoUrl.startsWith('data:')) {
      // 已有后端URL，无需重复上传
    } else if (form.value.photoUrl) {
      // 前端Base64格式，需要上传
      const file = dataURLtoFile(form.value.photoUrl, 'photo.jpg')
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await request.post('/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (uploadRes.data.code === 200) {
        form.value.photoUrl = uploadRes.data.data.url
      } else {
        ElMessage.error('照片上传失败：' + uploadRes.data.msg)
      }
    }

    // 3. 提交简历信息（修改为新路由）
    for (const resume of form.value.resumes) {
      resume.cadreId = cadreId
      await request.post('/cadre/resume', resume)
    }

    // 4. 提交家庭成员信息（修改为新路由）
    for (const member of form.value.familyMembers) {
      member.cadreId = cadreId
      await request.post('/cadre/familymember', member)
    }

    ElMessage.success('全部信息提交成功')
  } catch (error) {
    ElMessage.error('提交异常')
    console.error(error)
  }
}

// Base64转File工具函数
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        // eslint-disable-next-line
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type: mime});
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
    cadreId: '', startDate: '', endDate: '', organization: '', department: '', position: ''
  })
  form.value.familyMembers.push({
    cadreId: '', relation: '', name: '', birthDate: '', politicalStatus: '', workUnit: ''
  })
  form.value.photoUrl = ''
}
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