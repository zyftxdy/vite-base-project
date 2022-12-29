import { dataURLtoBlob, urlToBase64 } from './file'

/**
 * Download online pictures
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom)
  })
}

/**
 * Download pictures based on base64
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, filename, mime, bom)
}

/**
 * Download according to the background interface file stream
 * @param {*} data
 * @param {*} filename
 * @param {*} mime
 * @param {*} bom
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

export function downloadUrl({
  url,
  fileName,
  target = '_blank'
}: {
  url: string,
  target?: string,
  fileName?: string
}) {
  const link = document.createElement('a')
  link.href = url
  link.target = target
  link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)

  const e = new MouseEvent('click')
  link.dispatchEvent(e)
}
