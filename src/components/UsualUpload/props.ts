import type { FileList } from '#/base'

export const INIT_WIDTH = 104
export const INIT_HEIGHT = 104

export const basicProps = {
  type: {
    type: String as PropType<'single' | 'list'>,
    default: 'single'
  },
  uploadUrl: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  imageSize: {
    type: Number,
    default: 10
  },
  imageLimit: {
    type: Array as PropType<string[]>,
    default: () => ['jpg', 'png', 'jpeg']
  },
  fileList: {
    type: Array as PropType<FileList[]>,
    default: () => []
  },
  maxLength: {
    type: Number,
    default: 1
  },
  width: Number,
  height: Number,
  imageDesc: String,
  extraTips: String,
  showUploadVideo: {
    type: Boolean,
    default: false
  }
}
