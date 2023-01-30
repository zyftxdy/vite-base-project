import qs from 'qs'
import axios from 'axios'
import type { AxiosOptions, UploadFileParams, ResponseType } from './types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { isFunction } from '@vue/shared'
import { RequestEnum, ContentTypeEnum } from '@/enums/http'

class ZAixos {
  private instance: AxiosInstance
  private options: AxiosOptions

  constructor(options: AxiosOptions) {
    this.options = options
    this.instance = axios.create(options)
    this.setupInterceptors()
  }

  private getInterceptors() {
    const { interceptors } = this.options
    return interceptors
  }

  private setupInterceptors() {
    const interceptors = this.getInterceptors()

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = interceptors

    this.instance.interceptors.request.use(config => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.instance.interceptors.request.use(undefined, requestInterceptorsCatch)

    this.instance.interceptors.response.use(response => {
      let res
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(response)
      }
      return res
    }, undefined)

    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.instance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers
    const contentType = headers?.['Content-type'] || headers?.['content-type']

    if (contentType === ContentTypeEnum.FORM_DATA || config.method === RequestEnum.GET) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'indices', allowDots: true })
    }
  }

  get<T = ResponseType>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: RequestEnum.GET })
  }

  post<T = ResponseType>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: RequestEnum.POST })
  }

  upload<T = ResponseType>(config: AxiosRequestConfig, param: UploadFileParams): Promise<T> {
    const formData = new FormData()
    const customFilename = param.name || 'file'

    if (param.filename) {
      formData.append(customFilename, param.file, param.filename)
    } else {
      formData.append(customFilename, param.file)
    }

    return this.request<T>({
      ...config,
      method: RequestEnum.POST,
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA
      }
    })
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    config = this.supportFormData(config)

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default ZAixos
