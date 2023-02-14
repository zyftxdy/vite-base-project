<template>
  <div class="cropper-model">
    <div class="model-left">
      <div class="cropper-bg" :style="{ height: height, width: '100%' }">
        <cropper
          v-if="src"
          :src="src"
          :height="height"
          :circled="circled"
          @cropend="cropend"
        ></cropper>
      </div>
      <el-upload :auto-upload="false" :show-file-list="false" :on-change="onChange">
        <el-button class="btn-small btn-border-color">选择图片</el-button>
      </el-upload>
    </div>
    <div v-if="imgUrl" class="model-right">
      <div class="cropper-img" :style="{ height: height }">
        <el-image :src="imgUrl" />
      </div>
      <el-button :loading="loading" class="btn-small btn-border-color" @click="handleUpload"
        >确认上传</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import Cropper from './index.vue'
import { useCommon } from '@/hooks'
import type { UploadFile, UploadRawFile } from 'element-plus'
import type { CropperResult } from './type'

const props = defineProps({
  height: { type: String, default: '300px' },
  circled: { type: Boolean, default: false }
})
const emits = defineEmits(['success'])

const { reqApi, message } = useCommon()

const src = ref('')
const fileName = ref('')
const imgUrl = ref('')
const blobRef = ref<Blob>()
const loading = ref(false)

// file -> base64
const onChange = (file: UploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw as UploadRawFile)
  reader.onload = e => {
    src.value = (e.target?.result as string) ?? ''
    fileName.value = file.name
  }
}

const cropend = ({ url, blob }: CropperResult) => {
  imgUrl.value = url
  blobRef.value = blob
}
const handleUpload = async () => {
  loading.value = true
  try {
    const res = await reqApi.common.uploadPublic({
      file: unref(blobRef) as Blob,
      filename: unref(fileName)
    })
    message.success('upload success!')
    emits('success', res.data)
  } catch (err: any) {
    message.error(err)
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.cropper-model {
  display: flex;
  .model-left {
    width: 55%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .model-right {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 15px;
    .cropper-img {
      margin-bottom: 16px;
      :deep(.el-image) {
        height: 100%;
      }
    }
  }
}
.cropper-bg {
  background: #eee;
  background-image: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.25) 25%,
      transparent 0,
      transparent 75%,
      rgba(0, 0, 0, 0.25) 0
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.25) 25%,
      transparent 0,
      transparent 75%,
      rgba(0, 0, 0, 0.25) 0
    );
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
  margin-bottom: 16px;
}
</style>
