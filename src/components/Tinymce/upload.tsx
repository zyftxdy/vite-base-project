import { useCommon } from '@/hooks'
import { publicUploadFile } from '@/utils/constant'
import type { FileList } from '#/base'

export default defineComponent({
  props: {
    show: Boolean
  },
  emits: ['update:show', 'upload-done'],
  setup(props, { emit }) {
    const { emitter } = useCommon()
    const fileList = ref<FileList[]>()
    const showDialog = computed({
      get: () => props.show,
      set: val => {
        emit('update:show', val)
      }
    })

    emitter.on('submit', () => {
      if (unref(fileList)) {
        const list = unref(fileList)?.map(item => item.imageUrl)
        emit('upload-done', list)
      }
      emitter.emit('success')
    })

    return () => (
      <usual-dialog
        v-model:show={showDialog.value}
        title="上传图片">
        <usual-upload
          v-model:file-list={fileList.value}
          type="list"
          max-length={999}
          upload-url={publicUploadFile}
        />
      </usual-dialog>
    )
  }
})
