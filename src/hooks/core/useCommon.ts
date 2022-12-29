import mitt from 'mitt'
import api from '@/api'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

export function useCommon() {
  const router = useRouter()
  const route = useRoute()
  const emitter = inject('emitter', mitt())

  return {
    router,
    route,
    message: ElMessage,
    emitter,
    reqApi: api
  }
}
