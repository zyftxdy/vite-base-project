<template>
  <el-form
    ref="formRef"
    :model="modelRef"
    :rules="rulesRef"
    class="border-b border-solid border-gray-300 mb-2">
    <el-form-item label="旧密码" prop="oldPass">
      <el-input v-model="modelRef.oldPass" type="password" placeholder="请填写旧密码"/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input v-model="modelRef.newPass" type="password" placeholder="请填写新密码"/>
    </el-form-item>
  </el-form>
  <el-button class="btn-small btn-border-color" @click="onClick">修改密码</el-button>
  <el-button class="btn-small btn-usual" @click="logout">退出登录</el-button>
</template>

<script setup lang="ts">
import md5 from 'js-md5'
import { useCommon, useMessage, useRequest } from '@/hooks'
import { useUserStore } from '@/store'
import type { FormInstance, FormRules } from 'element-plus'

const store = useUserStore()
const { reqApi, message } = useCommon()
const { messageConfirm } = useMessage()

const formRef = ref<FormInstance>()
const modelRef = reactive({
  oldPass: '',
  newPass: ''
})
const rulesRef = reactive<FormRules>({
  oldPass: [{ required: true, message: '请填写旧密码', trigger: 'blur' }],
  newPass: [{ required: true, message: '请填写新密码', trigger: 'blur' }]
})

const onClick = () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      messageConfirm({ message: '确认要修改密码吗？' })
      .then(() => submit())
    } else {
      console.log('error submit!', fields)
    }
  })
}

const { run: submit } = useRequest(() => reqApi.common.updatePassword({
  oldPass: md5(modelRef.oldPass.trim()),
  newPass: md5(modelRef.newPass.trim())
}), {
  onSuccess: () => {
    message.success('修改成功，请重新登录！')
    onLogout()
  }
})

const logout = () => {
  messageConfirm({ message: '确认要退出吗？' })
    .then(() => onLogout())
}
const onLogout = () => {
  store.FedLogOut().then(() => {
    location.replace(location.href.split('#')[0])
  })
}
</script>
