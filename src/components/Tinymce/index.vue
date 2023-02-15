<template>
  <div class="tinymce-div" :class="{ fullscreen }">
    <upload v-model:show="show" @upload-done="uploadDone" />
    <el-button
      v-show="showbtn"
      :disabled="readonly"
      class="btn-big btn-border-color upload_btn"
      @click="show = true"
      >上传图片</el-button
    >
    <textarea :id="tinymceId"></textarea>
  </div>
</template>

<script setup lang="ts">
import tinymce from 'tinymce'
import 'tinymce/themes/silver'
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons/js/emojis'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import { toolbar, plugins } from './tinymce'
import { Editor, RawEditorOptions } from 'tinymce'
import { buildShortUUID } from '@/utils/uuid'
import Upload from './upload'

const props = defineProps({
  skinName: {
    type: String as PropType<'oxide' | 'oxide-dark'>,
    default: 'oxide'
  },
  langName: {
    type: String as PropType<'en' | 'zh_CN'>,
    default: 'zh_CN'
  },
  height: {
    type: Number,
    default: 320
  },
  modelValue: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['inited', 'init-error', 'update:model-value', 'change'])

const show = ref(false)
const fullscreen = ref(false)
const showbtn = ref(false)
const editorRef = ref<Nullable<Editor>>(null)
const tinymceId = ref<string>(buildShortUUID('vue-tiny'))
const initOptions = computed<RawEditorOptions>(() => {
  const { skinName, langName, height } = props
  return {
    selector: `#${unref(tinymceId)}`,
    height: height,
    language: langName,
    language_url: `/static/tinymce/langs/${langName}.js`,
    plugins: plugins,
    toolbar: toolbar,
    auto_focus: 'none',
    promotion: false, // 关闭高级功能升级
    branding: false, // 隐藏右下角技术支持
    skin: skinName, // 设置皮肤
    skin_url: `/static/tinymce/skins/ui/${skinName}`,
    content_css: `/static/tinymce/skins/ui/${skinName}/content.min.css`,
    inline: false, // 内联模式
    setup: (editor: Editor) => {
      editorRef.value = editor
      editor.on('init', e => initSetup(e))
    }
  }
})

const initSetup = (e: any) => {
  const editor = unref(editorRef) as Editor
  bindModelHandlers(editor)
  showbtn.value = true
}

const setValue = (editor: Editor, val: string, prevVal?: string) => {
  if (editor && typeof val === 'string' && val !== prevVal && val !== editor.getContent()) {
    editor.setContent(val)
  }
}

const bindModelHandlers = (editor: Editor) => {
  watch(
    () => props.modelValue,
    (val, preVal) => {
      setValue(editor, val, preVal)
    },
    {
      immediate: true
    }
  )
  watch(
    () => props.readonly,
    val => {
      editor.mode.set(val ? 'readonly' : 'design')
    },
    {
      immediate: true
    }
  )
  editor.on('change keyup undo redo setContent', () => {
    const content = editor.getContent()
    emit('update:model-value', content)
    emit('change', content)
  })
  editor.on('FullscreenStateChanged', e => {
    fullscreen.value = e.state
  })
}

const uploadDone = (arr: string[]) => {
  const editor = unref(editorRef) as Editor
  let content = editor.getContent() ?? ''
  arr.forEach(val => {
    content = content + `<img src="${val}" style="width: 100%; height: auto;"/>`
  })
  setValue(editor, content)
}

onMounted(() => {
  initEditor()
})
onBeforeUnmount(() => {
  destoryEditor()
})
onActivated(() => {
  initEditor()
})
onDeactivated(() => {
  destoryEditor()
})

const initEditor = () => {
  tinymce
    .init(unref(initOptions))
    .then(editor => {
      emit('inited', editor)
    })
    .catch(err => {
      emit('init-error', err)
    })
}
const destoryEditor = () => {
  tinymce.remove(unref(initOptions).selector!)
}
</script>

<style lang="scss" scoped>
.tinymce-div {
  position: relative;
  width: 100%;
  &.fullscreen {
    z-index: 2000;
    .upload_btn {
      position: fixed;
      z-index: 2000;
    }
  }
  .upload_btn {
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 20;
  }
}
</style>
