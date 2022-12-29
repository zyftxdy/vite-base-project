/**
 * @description: base64 to blob
 */
 export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)![1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 *
 * @param url 图片的网络地址
 * @param mineType
 * @returns
 * @description img url to base64
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.crossOrigin = ''
    img.src = url
    img.onload = function() {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imageUrl = canvas.toDataURL(mineType || 'image/png')
      resolve(imageUrl)
    }
  })
}
