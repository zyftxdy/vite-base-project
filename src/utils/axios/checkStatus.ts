export default function checkStatus(
  err: any
) {
  if (err.response && err.response.code) {
    switch (err.response.code) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未授权，请登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
        break
    }
  }
  if (err.message.includes('timeout')) err.message = '网络请求超时！'
  if (err.message.includes('Network')) err.message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  return Promise.reject({ message: err.message })
}
