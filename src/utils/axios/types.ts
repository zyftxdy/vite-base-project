import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface AxiosOptions extends AxiosRequestConfig {
  interceptors: AxiosInterceptors
}

export interface AxiosInterceptors<T = any> {
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options?: AxiosOptions,
  ) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: Error) => void
  responseInterceptors?: (res: AxiosResponse<T>) => T | Promise<any>
  responseInterceptorsCatch?: (error: Error) => void
}

export interface ResponseType {
  code: number
  data: any
  errCode: string | null
  errMessage: string | null
  timestamp: number
}

export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
