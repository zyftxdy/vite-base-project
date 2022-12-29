import { ElMessageBox } from 'element-plus'
import type { ElMessageBoxOptions } from 'element-plus'
import 'element-plus/es/components/message-box/style/css'

export default function useMessage() {
  const messageConfirm = ({
    message,
    title = '提示',
    type = 'warning',
    center = false,
    showCancelButton = true,
    closeOnClickModal = false,
    confirmButtonText = '确认',
    cancelButtonText = '取消'
  }: ElMessageBoxOptions) => {
    return ElMessageBox.confirm(message, title, {
      type,
      center,
      showCancelButton,
      closeOnClickModal,
      confirmButtonText,
      cancelButtonText
    })
  }

  return {
    messageConfirm
  }
}
