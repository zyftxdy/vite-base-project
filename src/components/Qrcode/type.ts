import { QRCodeRenderersOptions, QRCodeSegment } from 'qrcode'

export type ContentType = string | QRCodeSegment[]

export interface DrawParams {
  canvas: any
  text: ContentType
  width: number
  options?: QRCodeRenderersOptions
  logo?: string
}
