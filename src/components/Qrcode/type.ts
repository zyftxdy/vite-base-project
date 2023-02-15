import { QRCodeRenderersOptions, QRCodeSegment } from 'qrcode'

export type ContentType = string | QRCodeSegment[]

export interface DrawParams {
  canvas: any
  text: ContentType
  width: number
  options?: QRCodeRenderersOptions
  logo?: string
}

export interface QrCodeActionType {
  downLoad: (fileName?: string) => void
}

export interface CallbackParam {
  url: string
  ctx: CanvasRenderingContext2D
}
