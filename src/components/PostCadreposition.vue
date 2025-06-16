<template>
  <div class="position-container">
    <h2 class="page-title">干部任职证明（电子文件）</h2>
    
    <div class="application-info">
      <span>申请时间</span>
      <el-date-picker
        v-model="form.applyDate"
        type="date"
        placeholder="选择日期"
        style="width: 200px"
      />
    </div>
    
    <el-form ref="positionForm" :model="form" label-width="80px" class="info-form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学（工）号">
            <el-input v-model="form.studentId" placeholder="请输入学（工）号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" placeholder="请输入电子邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="院系">
            <el-input v-model="form.department" placeholder="请输入院系" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类别">
            <el-select v-model="form.category" placeholder="请选择类别" style="width: 100%">
              <el-option label="专职团干部" value="专职团干部" />
              <el-option label="兼职团干部" value="兼职团干部" />
              <el-option label="教师" value="教师" />
              <el-option label="学生" value="学生" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任职部门">
            <el-select v-model="form.office" placeholder="请选择任职部门" style="width: 100%">
              <el-option label="校团委内设部门" value="校团委内设部门" />
              <el-option label="学生会" value="学生会" />
              <el-option label="研究生会" value="研究生会" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任职年度">
            <el-select v-model="form.academicYear" placeholder="请选择任职年度" style="width: 100%">
              <el-option v-for="year in years" :key="year" :label="year" :value="year" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
    <h3 class="section-title">任职信息</h3>
    <div class="position-table-container">
      <table class="position-table">
        <thead>
          <tr>
            <th>学年</th>
            <th>部门</th>
            <th>职务</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in form.positions" :key="index">
            <td>
              <el-input v-model="item.year" placeholder="XX学年" />
            </td>
            <td>
              <el-input v-model="item.department" placeholder="部门" />
            </td>
            <td>
              <el-input v-model="item.position" placeholder="职务" />
            </td>
            <td>
              <el-button type="danger" size="small" @click="removePosition(index)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-button size="small" type="primary" @click="addPosition">添加任职信息</el-button>
    

    
    <div class="action-buttons">
      <el-button type="primary" @click="getPositionCertificate">获取任职电子证明</el-button>
      <el-button @click="previewCertificate">预览</el-button>
      <el-button v-if="showDownloadBtn" type="success" @click="downloadCertificate">下载任职电子签章证明</el-button>
    </div>
    
    <div class="file-preview" v-if="fileUrl">
      <div class="file-info">
        <span>{{fileName}}</span>
        <el-button size="small" @click="previewFile">预览</el-button>
      </div>
      <div class="file-actions">
        <el-button size="small" @click="getPositionHistory">获取任职历史</el-button>
        <el-button size="small" @click="getYearPosition">获取年度任职</el-button>
        <el-button size="small" type="primary" @click="downloadFile">下载</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// eslint-disable-next-line
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

const positionForm = ref(null)
const form = ref({
  id: '', // 干部ID
  applyDate: '', // 申请时间
  name: '', // 姓名
  studentId: '', // 学（工）号
  phone: '', // 手机号码
  email: '', // 电子邮箱
  department: '', // 院系
  category: '', // 类别
  office: '', // 任职部门
  academicYear: '', // 任职年度
  positions: [
    { year: '', department: '', position: '' } // 任职信息
  ],
  certificateUrl: '', // 证明文件URL
  fileUrl: '' // 下载文件URL
})

// 生成年份选项（过去10年到未来1年）
const years = ref([])
// eslint-disable-next-line
const instructions = ref([{}, {}, {}, {}]) // 4个使用说明区域
const fileUrl = ref('')
const fileName = ref('')
const showDownloadBtn = ref(false)

// 生成年份选项
function generateYears() {
  const currentYear = new Date().getFullYear()
  const yearOptions = []
  for (let i = currentYear - 10; i <= currentYear + 1; i++) {
    yearOptions.push(`${i}-${i + 1}学年`)
  }
  years.value = yearOptions
}

// 添加任职信息
function addPosition() {
  form.value.positions.push({
    year: '',
    department: '',
    position: ''
  })
}

// 删除任职信息
function removePosition(index) {
  if (form.value.positions.length > 1) {
    form.value.positions.splice(index, 1)
  } else {
    ElMessage.warning('至少保留一条任职信息')
  }
}

// 获取任职电子证明
function getPositionCertificate() {
  ElMessage.success('已获取任职电子证明')
  showDownloadBtn.value = true
  form.value.certificateUrl = '模拟证明文件URL'
}

// 预览证明
function previewCertificate() {
  if (form.value.certificateUrl) {
    ElMessage.info('正在预览任职证明...')
    // 这里可以添加预览逻辑
  } else {
    ElMessage.warning('请先获取任职电子证明')
  }
}

// 下载任职电子签章证明
function downloadCertificate() {
  if (form.value.certificateUrl) {
    ElMessage.success('正在下载任职电子签章证明...')
    // 这里可以添加下载逻辑
  } else {
    ElMessage.warning('请先获取任职电子证明')
  }
}

// 调用/cadre/positionhistory接口
async function getPositionHistory() {
  try {
    // 构造提交数据
    const submitData = {
      cadreId: form.value.id,
      department: form.value.department,
      category: form.value.category,
      office: form.value.office,
      academicYear: form.value.academicYear,
      // 从当前日期获取年月日
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    }
    
    // 调用后端接口
    const response = await request.post('/cadre/positionhistory', submitData)
    
    if (response.data.code === 200) {
      ElMessage.success('任职历史信息提交成功')
      // 处理返回数据
      fileUrl.value = 'position_history.pdf'
      fileName.value = 'position_history.pdf'
    } else {
      ElMessage.error(response.data.msg || '提交失败，请重试')
    }
  } catch (error) {
    console.error('提交任职历史信息失败', error)
    ElMessage.error('提交失败，请检查网络连接')
  }
}

// 调用/cadre/yearposition接口
async function getYearPosition() {
  try {
    // 构造提交数据
    const submitData = {
      cadreId: form.value.id,
      posyear: form.value.academicYear,
      department: form.value.department,
      pos: form.value.positions.map(item => item.position).join(';')
    }
    
    // 调用后端接口
    const response = await request.post('/cadre/yearposition', submitData)
    
    if (response.data.code === 200) {
      ElMessage.success('年度任职信息提交成功')
      // 处理返回数据
      fileUrl.value = 'year_position.pdf'
      fileName.value = 'year_position.pdf'
    } else {
      ElMessage.error(response.data.msg || '提交失败，请重试')
    }
  } catch (error) {
    console.error('提交年度任职信息失败', error)
    ElMessage.error('提交失败，请检查网络连接')
  }
}

// 预览文件
function previewFile() {
  if (fileUrl.value) {
    ElMessage.info('正在预览文件...')
    // 这里可以添加文件预览逻辑
  } else {
    ElMessage.warning('暂无文件可预览')
  }
}

// 下载文件
function downloadFile() {
  if (fileUrl.value) {
    ElMessage.success('正在下载文件...')
    // 这里可以添加文件下载逻辑
  } else {
    ElMessage.warning('暂无文件可下载')
  }
}

// 页面加载完成后执行
onMounted(() => {
  generateYears()
  // 这里可以添加获取干部信息的逻辑
  // const cadreId = getCadreIdFromRoute()
  // if (cadreId) {
  //   loadCadreInfo(cadreId)
  // }
})
</script>

<style scoped>
.position-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

.application-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
}

.application-info span {
  margin-right: 10px;
  font-size: 16px;
}

.info-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 25px 0 15px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.position-table-container {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.position-table {
  width: 100%;
  border-collapse: collapse;
}

.position-table th, .position-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.position-table th {
  background-color: #f5f7fa;
  font-weight: bold;
}

.instruction-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.instruction-item {
  flex: 1 1 calc(50% - 10px);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.instruction-title {
  font-weight: bold;
  margin-bottom: 5px;
  color: #409EFF;
}

.instruction-content {
  line-height: 1.6;
  color: #606266;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.file-preview {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-top: 20px;
}

.file-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.file-info span {
  flex-grow: 1;
}

.file-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .position-container {
    padding: 10px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .instruction-item {
    flex: 1 1 100%;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .file-actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style>