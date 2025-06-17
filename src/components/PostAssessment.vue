<template>
  <div class="assessment-container">
    <h2 class="page-title">干部工作考核</h2>

    <el-form ref="assessmentForm" :model="form" label-width="100px" class="form-wrapper">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="学（工）号">
            <el-input v-model="form.user_id" placeholder="请输入学（工）号" />
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
          <el-form-item label="考核部门">
            <el-select v-model="form.assess_dept" multiple placeholder="请选择考核部门" style="width: 100%">
              <el-option label="校团委" value="校团委" />
              <el-option label="院系党委" value="院系党委" />
              <el-option label="院系团委" value="院系团委" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="考核年度">
            <el-input v-model="form.year" placeholder="请输入考核年度" />
          </el-form-item>
        </el-col>
      </el-row>

      <h3 class="section-title">本年度主要工作说明</h3>
      <div class="work-summary-container">
        <el-input
          v-model="form.work_summary"
          type="textarea"
          :rows="10"
          placeholder="请围绕本人本年度主要工作展开说明（1000字以内）"
          maxlength="1000"
          show-word-limit
        />
      </div>

      <el-form-item style="text-align: center; margin-top: 20px;">
        <el-button type="primary" @click="submitForm">提交考核</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

const assessmentForm = ref(null)

const form = ref({
  user_id: '',         // 学（工）号
  department: '',      // 院系
  category: '',        // 类别
  assess_dept: [],     // 考核部门（数组形式，提交时转为字符串）
  year: '',            // 考核年度（字符串输入）
  work_summary: '',    // 工作说明
})

// 提交表单
async function submitForm() {
  if (assessmentForm.value) {
    await assessmentForm.value.validate(async (valid) => {
      if (valid) {
        try {
          const submitData = {
            user_id: form.value.user_id,
            department: form.value.department,
            category: form.value.category,
            assess_dept: form.value.assess_dept.join(','), // 数组转逗号字符串
            year: Number(form.value.year), // 转为数字
            work_summary: form.value.work_summary
          }

          const response = await request.post('/cadre/assessment', submitData)

          if (response.data.code === 200) {
            ElMessage.success('考核信息提交成功')
          } else {
            ElMessage.error(response.data.msg || '提交失败，请重试')
          }
        } catch (error) {
          console.error('提交考核信息失败', error)
          ElMessage.error('提交失败，请检查网络连接')
        }
      } else {
        console.log('表单验证失败')
        return false
      }
    })
  }
}

// 重置表单
function resetForm() {
  ElMessageBox.confirm('确定要重置表单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (assessmentForm.value) {
      assessmentForm.value.resetFields()
    }
  }).catch(() => {})
}
</script>

<style scoped>
.assessment-container {
  max-width: 1200px;
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

.form-wrapper {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 25px 0 15px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.work-summary-container {
  max-width: 600px;
  margin: 0 auto 20px auto;
}

@media (max-width: 768px) {
  .form-wrapper {
    padding: 15px;
  }

  .page-title {
    font-size: 20px;
  }

  .section-title {
    font-size: 16px;
  }
}
</style>
