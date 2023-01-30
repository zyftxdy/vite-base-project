import { ElMessageBox } from 'element-plus'
import axios from 'axios'
import ZAixos from './service'
import config from './config'
import checkStatus from './checkStatus'
import { RequestEnum } from '@/enums/http'
import cookieCache from '@/utils/cache/auth'
import { useUserStoreWithOut, useCancelStoreWithOut } from '@/store'
import type { AxiosInterceptors, ResponseType } from './types'

const interceptors: AxiosInterceptors<ResponseType> = {
  requestInterceptors: config => {
    const token = cookieCache.get()
    const cancelStore = useCancelStoreWithOut()
    if (token) {
      ;(config as Recordable).headers.token = token
    }
    if (config.method === RequestEnum.POST) {
      config.data = (config.data as string)
        ?.split('=')
        .filter(item => !item.includes('cascaders') && !item.includes('dates'))
        .join('=')
    }
    config.cancelToken = new axios.CancelToken(c => {
      cancelStore.addMap(config.url!, c)
    })
    return config
  },
  requestInterceptorsCatch: error => {
    return Promise.reject(error)
  },
  responseInterceptors: response => {
    const data = response.data
    const cancelStore = useCancelStoreWithOut()
    cancelStore.removeMap(response.config.url!)
    // 根据返回的code值来做不同的处理
    if (data.code !== 200) {
      const needReloginErrCode = [
        'token.not.exists',
        'token.not.opt.expire',
        'token.verify.error',
        'user.status.invalid'
      ]
      if (needReloginErrCode.includes(data.errCode ?? '')) {
        ElMessageBox.close()
        ElMessageBox.confirm(`${data.errMessage}，请重新登录`, '提示', {
          confirmButtonText: '确定',
          closeOnClickModal: false,
          showCancelButton: false,
          showClose: false,
          type: 'warning'
        })
          .then(() => {
            const userStore = useUserStoreWithOut()
            userStore.FedLogOut().then(() => {
              location.replace(location.href.split('#')[0])
            })
          })
          .catch()
      }
      return Promise.reject({ code: data.errCode, message: data.errMessage })
    }
    return data
  },
  responseInterceptorsCatch: (error: any) => {
    if (axios.isCancel(error)) {
      return Promise.reject(new Error(CANCAL_REQUEST))
    }
    return checkStatus(error)
  }
}

function createAxios() {
  return new ZAixos({
    baseURL: config.baseUrl,
    headers: config.headers,
    timeout: config.timeout,
    withCredentials: config.withCredentials,
    interceptors
  })
}

const ZHttp = createAxios()

export default ZHttp
