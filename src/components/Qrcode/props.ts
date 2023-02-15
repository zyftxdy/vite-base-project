import type { QRCodeRenderersOptions } from 'qrcode'

export const defaultOptions: QRCodeRenderersOptions = {
  margin: 2
}

export const qrcodeProps = {
  codeUrl: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 200
  },
  logo: {
    type: String,
    default: ''
  },
  options: {
    type: Object as PropType<QRCodeRenderersOptions>,
    default: () => defaultOptions
  },
  tag: {
    type: String as PropType<'canvas' | 'img'>,
    default: 'canvas'
  }
}
