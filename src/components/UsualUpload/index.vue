<script lang="tsx">
import { basicProps, INIT_WIDTH, INIT_HEIGHT } from './props'
import { cloneDeep } from 'lodash-es'
import { useCommon } from '@/hooks'
import authCache from '@/utils/cache/auth'
import { baseUrl, uploadFile } from '@/utils/constant'
import {
  createElementVNode,
  createVNode,
  mergeProps,
  TransitionGroup,
  openBlock,
  createBlock,
  renderList,
  createElementBlock,
  renderSlot } from 'vue'
import type { UploadRawFile } from 'element-plus'

const standard = 200

export default defineComponent({
  props: basicProps,
  emits: ['update:image', 'update:image-url', 'update:file-list', 'uploaded'],
  setup(props, _ctx) {
    const { emit, slots } = _ctx
    const { message } = useCommon()
    const uploadState = reactive({
      loading: false,
      myHeaders: { token: authCache.get() },
      https: baseUrl, // 图片地址
      uploadFile: props.uploadUrl || uploadFile, // 上传地址
    })

    const fileUrl = ref('')
    const file = computed({
      get: () => props.image,
      set: val => {
        emit('update:image', val)
      }
    })
    const fileList = computed({
      get: () => cloneDeep(props.fileList),
      set: val => {
        emit('update:file-list', val)
      }
    })
    const uploadFormats = computed(() => props.imageLimit.join('、'))

    const beforeUpload = (e: UploadRawFile) => {
      const type = e.name.substring(e.name.lastIndexOf('.') + 1)
      if (!unref(uploadFormats).includes(type)) {
        message.error(`上传图片只能是${unref(uploadFormats)}格式!`)
        return false
      }
      if (e.size > 1024*1024*props.imageSize) {
        message.error(`上传图片应在${props.imageSize}M以内`)
        return false
      }
      uploadState.loading = true
    }
    const handleSuccess = (e: any) => {
      if (e.code === 200) {
        if (props.type === 'single') {
          file.value = e.data.fileNo
          fileUrl.value = e.data.fileUrl
          emit('update:image-url', e.data.fileUrl)
        } else {
          const list = unref(fileList)
          const data = {
            imageNo: e.data.fileNo,
            imageUrl: e.data.fileUrl
          }
          list.push(data)
          fileList.value = list
        }
        emit('uploaded')
      } else {
        message.error('上传失败')
      }
      uploadState.loading = false
    }

    const setScalce = (max: number) => {
      let scale = 1
      let result = max
      while (result > standard) { // 对大于200的进行按比例缩放
        scale++
        result = Math.floor(max / scale)
      }
      return scale
    }
    const uploadWidth = ref(INIT_WIDTH)
    const uploadHeight = ref(INIT_HEIGHT)
    watch([() => props.width, () => props.height], ([width, height]) => {
      if (width && height) {
        const scale = setScalce(Math.max(width, height))
        uploadWidth.value =  Math.floor(width / scale)
        uploadHeight.value = Math.floor(height / scale)
      }
    }, {
      immediate: true
    })
    // 生成上传容器
    const setUploadWare = () => {
      const tagName = unref(file) ? 'img' : 'span'
      const child = unref(file) ? null : [ <i-ep-plus class='el-icon'/> ]
      const uploadProps: Recordable = unref(file) ? { src: fileUrl.value || props.imageUrl } : { class: 'border border-dashed border-slate-200' }
      let attributes: Recordable = {
        class: 'upload-span',
        style: {
          width: `${uploadWidth.value}px`,
          height: `${uploadHeight.value}px`
        }
      }
      attributes = mergeProps(attributes, uploadProps)
      return createElementVNode(tagName, attributes, child, 8, ['style', 'class', 'src'])
    }

    // 生成图片上传
    const setImageWare = () => {
      let attributes: Recordable = {
        headers: uploadState.myHeaders,
        action: uploadState.https + uploadState.uploadFile,
        showFileList: false,
        beforeUpload: beforeUpload,
        onSuccess: handleSuccess
      }
      let tips = ''
      switch (props.type) {
        case 'single':
          tips = `${ props.imageDesc ? '请上传' + props.imageDesc + '，' : '' }
                  ${ (props.width && props.height) ? `建议尺寸${props.width}*${props.height}px，` : '' }
                  大小不超过${props.imageSize}M，
                  支持${uploadFormats.value}格式`
          break
        case 'list':
          attributes = mergeProps(attributes, {
            class: 'picture-li',
            key: 'upload-li'
          })
          break
      }
      return createVNode(<el-upload v-loading={uploadState.loading}/>, attributes, {
        default: () => [
          setUploadWare(),
          renderSlot(slots, 'default')
        ],
        tip: () => [
          props.type === 'single' && createElementVNode('div', { class: 'el-upload__tip' }, tips, 1),
          props.extraTips && createElementVNode('div', { class: 'extra_tips' }, props.extraTips, 1)
        ]
      })
    }

    // 生成视频上传
    const setVideoWare = () => {

    }

    const show = ref(false)
    const previewUrl = ref('')
    const handlePreview = (index: number) => {
      previewUrl.value = unref(fileList)[index].imageUrl
      show.value = true
    }

    const handleDelete = (index: number) => {
      const list = unref(fileList)
      list.splice(index, 1)
      fileList.value = list
    }

    return () => {
      const { type, maxLength, imageSize } = props
      const pList = unref(fileList),
            formats = unref(uploadFormats)
      return (
        createElementVNode('div', {
          class: 'usual_upload',
          style: {
            '--upload--width': uploadWidth.value + 'px',
            '--upload--height': uploadHeight.value + 'px'
          }
        }, [
          type === 'single' && setImageWare(),
          type === 'list' && [
            openBlock(), createBlock(TransitionGroup, {
              name: 'move',
              tag: 'ul',
              class: 'pictureList flex',
              mode: 'out-in'
            }, {
              default: () => [
                renderList(pList, (item, index) => {
                  return openBlock(), createElementBlock('li', {
                    class: 'pictureItem',
                    key: item.imageNo
                  }, [
                    createVNode(<el-image/>,  {
                      src: item.imageUrl,
                      style: {
                        width: `${uploadWidth.value}px`,
                        height: `${uploadHeight.value}px`
                      }
                    }, {
                      error: () => createElementVNode('div', { class: 'image-slot' }, [
                        createVNode(<el-icon/>, null, {default: () => <i-ep-picture/>}, -1)
                      ], -1)
                    }, 8, ['src', 'style']),
                    createElementVNode('div', {
                      class: 'mask'
                    }, [
                      createVNode(<el-icon/>, {
                        onClick: () => handlePreview(index)
                      }, {default: () => <i-ep-view/>}, -1),
                      createVNode(<el-icon/>, {
                        onClick: () => handleDelete(index)
                      }, {default: () => <i-ep-delete/>}, -1)
                    ], -1)
                  ], 16)
                }),
                pList.length < maxLength && setImageWare()
              ]
            }, 8, ['name']),
            createElementVNode('div', {
              class: 'tips'
            }, `${(props.width && props.height) ? `建议尺寸${props.width}*${props.height}px，` : ''}最多上传${ maxLength }张图片，大小不超过${ imageSize }M,支持${ formats }格式`, 1)
          ],
          createVNode(<el-dialog v-model={show.value}/>, {
            title: '图片预览'
          }, {
            default: () => createVNode(<el-image/>, {
              src: previewUrl.value,
              class: 'w-full'
            }, null, 8, ['src'])
          })
        ], 8, ['style'])
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.usual_upload{
  ul{
    margin: 0;
    padding: 0;
  }
  .pictureList{
    .pictureItem{
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      .image-slot{
        background: #f5f7fa;
        color: var(--el-text-color-secondary);
        font-size: 30px;
      }
      .mask{
        background: rgba(20, 21, 20, 0.34);
        color: $color-fff;
        transition: opacity .26s;
        .el-icon{
          font-size: 16px;
          cursor: pointer;
          &:nth-child(1) {
            margin-right: 8px;
          }
        }
      }
      &:hover{
        .mask{
          opacity: 1;
        }
      }
    }
  }
  .upload-span {
    .el-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  :deep(.el-upload) {
    display: inline-block;
  }
  :deep(.el-loading-mask) {
    width: var(--upload--width);
    height: var(--upload--height);
  }
  .tips{
    font-size: 12px;
    margin-top: 6px;
    color: var(--el-text-color-regular);
  }
  .extra_tips{
    color: $EE3D11;
    font-size: 12px;
  }
}
</style>
