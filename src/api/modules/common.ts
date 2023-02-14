// @ts-nocheck
import ZHttp from '@/utils/axios'
import type { UploadFileParams } from '@/utils/axios/types'

// 上传文件
export const uploadPublic = (param: UploadFileParams) => {
  return ZHttp.upload(
    {
      url: '/file/upload/public'
    },
    param
  )
}
