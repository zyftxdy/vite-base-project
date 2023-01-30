import type { App } from 'vue'

import AnimationText from '@/components/AnimationText/index.vue'
import PageTitle from '@/components/PageTitle/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Qrcode from '@/components/Qrcode/index.vue'
import Calender from '@/components/Calender/index'
import Cropper from '@/components/Cropper/index.vue'
import CropperModel from '@/components/Cropper/CropperModel.vue'
import Description from '@/components/Description/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'
import UsualSearch from '@/components/UsualSearch/index.vue'
import UsualTable from '@/components/UsualTable/table/index.vue'
import UsualDialog from '@/components/UsualDialog/index.vue'
import UsualUpload from '@/components/UsualUpload/index.vue'

const components = {
  AnimationText,
  PageTitle,
  SvgIcon,
  Qrcode,
  Calender,
  Cropper,
  CropperModel,
  Description,
  Tinymce,
  UsualSearch,
  UsualTable,
  UsualDialog,
  UsualUpload
}

export default function (app: App) {
  for (const component in components) {
    app.component(component, (components as Recordable)[component])
  }
}
