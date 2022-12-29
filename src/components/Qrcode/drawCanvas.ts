import { toCanvas } from 'qrcode'
import { DrawParams, ContentType } from './type'

export const drawCanvas = async ({
  canvas,
  text,
  width,
  options,
  logo
}: DrawParams): Promise<string> => {
  const canvasCtx = await toCanvas(canvas, text, {
    width,
    ...options
  }) as unknown as HTMLCanvasElement

  if (!logo) {
    return new Promise((resolve) => {
      resolve(canvasCtx.toDataURL())
    })
  }
  const ctx = canvasCtx.getContext('2d')!

  const image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.src = logo

  const drawLogo = (image: HTMLImageElement) => {
    const ctxWidth = canvasCtx.width
    const logoWidth = ctxWidth * 0.15
    const x = (ctxWidth - logoWidth) / 2
    const y = (ctxWidth - logoWidth) / 2
    ctx.drawImage(image, x, y, logoWidth, logoWidth)
  }

  return new Promise((resolve) => {
    image.onload = () => {
      drawLogo(image)
      resolve(canvasCtx.toDataURL())
    }
  })
}

export const getErrorCorrectionLevel = (content: ContentType) => {
  if (content.length > 36) {
    return 'M'
  } else if (content.length > 16) {
    return 'Q'
  } else {
    return 'H'
  }
}

