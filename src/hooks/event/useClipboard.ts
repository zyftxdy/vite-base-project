import { useCommon } from '../core/useCommon'

export default function useCliboard() {
  const { message } = useCommon()
  const clipboard = navigator.clipboard

  const writeClipboardText = async (text?: string) => {
    try {
      if (!text) {
        message.warning('没有要拷贝的内容')
        return
      }
      await clipboard.writeText(text as string)
      message.success('copy success!')
    } catch (err: any) {
      message.error(err)
    }
  }

  const writeClipboard = async () => {}

  const readClipboardText = async () => {
    try {
      const text = await clipboard.readText()
      return text
    } catch (err: any) {
      message.error(err)
    }
  }

  const readClipboard = async () => {}

  return {
    writeClipboardText,
    readClipboardText,
    writeClipboard,
    readClipboard
  }
}
