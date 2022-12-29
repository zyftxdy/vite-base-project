<template>
  <div class="interface_setting pb-6 content-box">
    <el-form :model="modelRef" label-width="140px">
      <!-- 机构端界面设置 -->
      <div class="instion">
        <page-title title="机构端界面设置"/>
        <div class="text-sm text-slate-700 font-medium">设置教培机构端的登录界面，<el-button link type="primary" @click="handleSample('1')">点此查看示例</el-button></div>
        <div class="flex">
          <div class="mr-6 flex-1">
            <el-form-item label="登陆界面广告背景：">
              <usual-upload
                :image-size="2"
                v-model:image="modelRef.picture1"
                :image-url="imageUrl.picture1Url"
                :upload-url="publicUploadFile"
                :width="600"
                :height="956"/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1">
            <el-form-item label="登陆界面logo：">
              <usual-upload
                :image-size="2"
                :image-limit="['png']"
                v-model:image="modelRef.logoBg"
                :image-url="imageUrl.logoBgUrl"
                :upload-url="publicUploadFile"
                :width="120"
                :height="30"
                extra-tips="推荐透明底白色的图片"/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1">
            <el-form-item label="登陆界面背景：">
              <usual-upload
                :image-size="2"
                v-model:image="modelRef.picture2"
                :image-url="imageUrl.picture2Url"
                :upload-url="publicUploadFile"
                :width="1920"
                :height="1200"/>
            </el-form-item>
          </div>
        </div>
        <div class="flex">
          <div class="mr-6 flex-1">
            <el-form-item label="文本一：">
              <el-input v-model="modelRef.ad1" placeholder="请填写第一行文字" maxlength="10" show-word-limit/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1">
            <el-form-item label="文本二：">
              <el-input v-model="modelRef.ad2" placeholder="请填写第二行文字" maxlength="10" show-word-limit/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1"/>
        </div>
        <div class="flex">
          <div class="mr-6 flex-1">
            <el-form-item label="文本三：">
              <el-input v-model="modelRef.ad4" placeholder="请填写第三行文字" maxlength="16" show-word-limit/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1">
            <el-form-item label="服务电话：">
              <el-input v-model="modelRef.ad5" placeholder="请填写服务电话" maxlength="16" show-word-limit/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1"/>
        </div>
        <div class="text-sm text-gray-700 font-medium">设置教培机构端的管理后台界面，<el-button link type="primary" @click="handleSample('2')">点此查看示例</el-button></div>
        <el-form-item label="后台产品logo：">
          <usual-upload
            :image-size="2"
            :image-limit="['png']"
            v-model:image="modelRef.logoC"
            :image-url="imageUrl.logoCUrl"
            :upload-url="publicUploadFile"
            :width="120"
            :height="30"
            extra-tips="推荐透明底彩色的图片"/>
        </el-form-item>
        <div class="text-sm text-gray-700 font-medium">设置教培机构端的网页标签小图标，<el-button link type="primary" @click="handleSample('3')">点此查看示例</el-button></div>
        <div class="flex">
          <div class="flex-1 mr-6">
            <el-form-item label="网页标签小图标：">
              <usual-upload
                :image-size="2"
                :image-limit="['ico']"
                v-model:image="modelRef.icon"
                :image-url="imageUrl.iconUrl"
                :upload-url="publicUploadFile"
                :width="120"
                :height="120"
                extra-tips="推荐透明底彩色的图片"/>
            </el-form-item>
            <el-form-item label="网页标签标题：">
              <el-input v-model="modelRef.ad6" placeholder="请填写网页标签标题" maxlength="24" show-word-limit/>
            </el-form-item>
          </div>
          <div class="flex-1 mr-6"/>
          <div class="flex-1 mr-6"/>
        </div>
      </div>
      <!-- 监管后台界面设置 -->
      <div class="backstage">
        <page-title title="监管后台界面设置"/>
        <div class="text-sm text-gray-700 font-medium">设置监管平台的登录界面，<el-button link type="primary" @click="handleSample('4')">点此查看示例</el-button></div>
        <div class="flex">
          <div class="mr-6 flex-1">
            <el-form-item label="登陆界面背景：">
              <usual-upload
                v-model:image="modelRef.picture5"
                :image-url="imageUrl.picture5Url"
                :image-size="2"
                :upload-url="publicUploadFile"
                :width="1920"
                :height="1080"/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1">
            <el-form-item label="登陆界面logo：">
              <usual-upload
                v-model:image="modelRef.picture6"
                :image-url="imageUrl.picture6Url"
                :image-size="2"
                :image-limit="['png']"
                :upload-url="publicUploadFile"
                :width="120"
                :height="30"
                extra-tips="推荐透明底彩色的图片"/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1"/>
        </div>
        <div class="flex">
          <div class="mr-6 flex-1">
            <el-form-item label="欢迎语：">
              <el-input v-model="modelRef.ad7" placeholder="请填写欢迎语" maxlength="16" show-word-limit/>
            </el-form-item>
          </div>
          <div class="mr-6 flex-1"/>
          <div class="mr-6 flex-1"/>
        </div>
        <div class="text-sm text-gray-700 font-medium">设置监管平台的管理后台界面，<el-button link type="primary" @click="handleSample('5')">点此查看示例</el-button></div>
        <div class="flex">
          <div class="flex-1 mr-6">
            <el-form-item label="后台产品logo：">
              <usual-upload
                v-model:image="modelRef.picture7"
                :image-url="imageUrl.picture7Url"
                :image-size="2"
                :image-limit="['png']"
                :upload-url="publicUploadFile"
                :width="120"
                :height="30"
                extra-tips="推荐透明底白色的图片"/>
            </el-form-item>
            <el-form-item label="后台产品标题：">
              <el-input v-model="modelRef.ad8" placeholder="请填写后台产品标题" maxlength="24" show-word-limit/>
            </el-form-item>
          </div>
          <div class="flex-1 mr-6"/>
          <div class="flex-1 mr-6"/>
        </div>
        <div class="text-sm text-gray-700 font-medium">设置监管平台的网页标签小图标，<el-button link type="primary" @click="handleSample('6')">点此查看示例</el-button></div>
        <div class="flex">
          <div class="flex-1 mr-6">
            <el-form-item label="网页标签小图标：">
              <usual-upload
                v-model:image="modelRef.picture8"
                :image-url="imageUrl.picture8Url"
                :image-size="2"
                :image-limit="['ico']"
                :upload-url="publicUploadFile"
                :width="120"
                :height="120"
                extra-tips="推荐透明底彩色的图片"/>
            </el-form-item>
            <el-form-item label="网页标签标题：">
              <el-input v-model="modelRef.ad9" placeholder="请填写网页标签标题" maxlength="24" show-word-limit/>
            </el-form-item>
          </div>
          <div class="flex-1 mr-6"/>
          <div class="flex-1 mr-6"/>
        </div>
      </div>
      <el-form-item>
        <el-button class="btn-small btn-border-color" type="primary" @click="handleClick">保存修改</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :title="showState.title"
      v-model="showState.show">
      <el-image :src="showState.imgBg"/>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { sample, ImageRef, ModelRef } from './enum'
import { publicUploadFile } from '@/utils/constant'
import { useCommon, useRequest } from '@/hooks'

const { reqApi, message } = useCommon()

const imageUrl = reactive<ReturnType<typeof ImageRef>>(ImageRef())
const modelRef = reactive<ReturnType<typeof ModelRef>>(ModelRef())

const setModel = (target: Recordable, source: Recordable) => {
  for (const key in target) {
    target[key] = source[key] ?? ''
  }
}
useRequest(() => reqApi.sysytem.channelDetail(), {
  immediate: true,
  onSuccess: res => {
    setModel(imageUrl, res)
    setModel(modelRef, res)
  }
})
const { run: handleClick } = useRequest(() => reqApi.sysytem.channelSave(modelRef), {
  onSuccess: () => {
    message.success('操作成功')
    window.location.reload()
  }
})

const showState = reactive({
  title: '',
  imgBg: '',
  show: false
})
const handleSample = (type: string) => {
  const data = sample(type)
  showState.title = data.title
  showState.imgBg = data.imgBg
  showState.show = true
}
</script>
