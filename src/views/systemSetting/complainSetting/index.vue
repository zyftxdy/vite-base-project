<template>
  <div class="complain_setting content-box">
    <el-button
      class="btn-bigger btn-border-color margin-bottom15"
      type="primary"
      @click="handleEdit()"
    >
      <template #icon><i-ep-plus /></template>添加投诉类别
    </el-button>
    <usual-table
      v-model:page-num="query.current"
      v-model:page-size="query.size"
      :loading="loading"
      :list="state.list"
      :columns="state.columns"
      :total="state.total"
      @pagination="getList"
    >
      <template #action="{ row }">
        <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
        <el-button link type="danger" @click="handleDel(row.categoryId)">删除</el-button>
      </template>
    </usual-table>

    <usual-dialog v-model:show="show" :title="title" width="24%">
      <el-form ref="formRef" :model="modelRef" :rules="rulesRef" label-width="100px">
        <el-form-item label="类别名称：" prop="categoryName">
          <el-input
            v-model="modelRef.categoryName"
            placeholder="请填写类别名称"
            maxlength="10"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="类别状态：" class="is-required">
          <el-radio-group v-model="modelRef.status">
            <el-radio label="NORMAL">启用</el-radio>
            <el-radio label="DISABLE">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </usual-dialog>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { backPageNum } from '@/utils/mUtils'
import { columns } from './enum'
import type { ListState } from '#/base'
import type { FormInstance } from 'element-plus'

const { emitter, message, reqApi } = useCommon()
const { messageConfirm } = useMessage()
const query = reactive({
  current: 1,
  size: 10
})
const state = reactive<ListState>({
  list: [],
  columns: columns,
  total: 0
})
const { loading, run: getList } = useRequest(() => reqApi.sysytem.categoryList(query), {
  immediate: true,
  onSuccess: res => {
    state.list = res.records
    state.total = res.total
  }
})

const show = ref(false)
const title = ref('')
const formRef = ref<FormInstance>()
const modelRef = reactive({
  categoryName: '',
  status: 'NORMAL',
  categoryId: ''
})
const rulesRef = reactive({
  categoryName: [{ required: true, message: '请填写类别名称', trigger: 'blur' }]
})

const handleEdit = (row?: Recordable) => {
  show.value = true
  title.value = `${row ? '编辑' : '添加'}投诉类别`
  if (row) {
    for (const key in modelRef) {
      modelRef[key as keyof typeof modelRef] = row[key] ?? ''
    }
  }
}
emitter.on('submit', () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      submitFun()
    } else {
      console.log('error submit!', fields)
    }
  })
})
const { run: submitFun } = useRequest(
  () =>
    modelRef.categoryId
      ? reqApi.sysytem.categoryEdit(modelRef)
      : reqApi.sysytem.categoryAdd(modelRef),
  {
    onSuccess: () => {
      message.success('操作成功')
      emitter.emit('success')
      getList()
    }
  }
)

const handleDel = (id: string) => {
  messageConfirm({
    message: '确定要删除吗？'
  }).then(() => onDel(id))
}
const { run: onDel } = useRequest(id => reqApi.sysytem.categoryDel({ categoryId: id }), {
  onSuccess: () => {
    message.success('删除成功')
    query.current = backPageNum(state.list, query.current)
    getList()
  }
})
</script>
