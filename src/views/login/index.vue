<template>
  <div
    class="login flex items-center justify-center"
    :style="`background-image: url(${loginBgImg});`"
  >
    <el-form ref="formRef" :model="modelRef" :rules="rulesRef" class="login-container">
      <div class="logo text-center"><img :src="loginLogo" /></div>
      <h2 class="title">{{ loginText }}</h2>
      <el-form-item prop="mobile">
        <el-input v-model="modelRef.mobile" size="large" placeholder="请填写手机号">
          <template #prepend>
            <i-ep-user />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="modelRef.password" type="password" size="large" placeholder="请填写密码">
          <template #prepend>
            <i-ep-lock />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          class="btn-border-color btn-login"
          type="primary"
          @click="handleSubmit"
          >登录</el-button
        >
      </el-form-item>
      <div class="line" />
      <div class="operate">
        <span>忘记密码</span>
      </div>
    </el-form>
    <div class="footer">
      <a href="http://beian.miit.gov.cn" target="_blank">陕ICP备19020854号</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import md5 from 'js-md5'
import { useAppStore, useUserStore } from '@/store'
import { useCommon } from '@/hooks'
import type { FormInstance } from 'element-plus'

const userStore = useUserStore()
const { message } = useCommon()
const { loginLogo, loginText, loginBgImg } = storeToRefs(useAppStore())

const formRef = ref<FormInstance>()
const modelRef = reactive({
  mobile: '',
  password: ''
})
const rulesRef = reactive({
  mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const handleSubmit = () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      loginFun()
    } else {
      console.log('error submit!', fields)
    }
  })
}

const loading = ref(false)
const loginFun = async () => {
  loading.value = true
  const res = await userStore.Login({
    username: modelRef.mobile,
    password: md5(modelRef.password.trim())
  })
  if (res) {
    message.success('登录成功')
    location.replace(location.href.split('#')[0])
  }
  loading.value = false
}
</script>

<style lang="scss" scoped src="./index.scss" />
