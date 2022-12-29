<template>
  <div class="depart content-box">
    <el-button class="margin-bottom15 btn-big btn-border-color" type="primary" @click="handleEdit()">
      <template #icon><i-ep-plus/></template>添加部门
    </el-button>
    <usual-table
      :loading="loading"
      :columns="columns"
      :list="list"
      row-key="deptId"
      :tree-props="{children: 'childList', hasChildren: 'hasChildren'}">
      <template #action="{ row }">
        <template v-if="row.pid !== 0">
          <el-button link type="primary" @click="handleEdit(row.deptId)">编辑</el-button>
          <el-button link type="primary" @click="handleDel(row.deptId)">删除</el-button>
        </template>
        <span v-else>--</span>
      </template>
    </usual-table>

    <usual-dialog
      v-model:show="operState.showEdit"
      :title="operState.title"
    >
      <edit-depart :dept-id="operState.deptId" @getList="getList"/>
    </usual-dialog>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { columns } from './enum'
import editDepart from './components/editDepart.vue'

const { reqApi, message } = useCommon()
const { messageConfirm } = useMessage()

const { result: list, loading, run: getList } = useRequest<Recordable[]>(() => reqApi.depart.departList(), {
  defaultValue: [],
  immediate: true,
  formatResult: res => dealList(res)
})
const dealList = (list: any[]) => {
  if (!list.length) return []
  // @ts-ignore
  list.map(item => {
    item.parentId = item.pid
    item.children = dealList(item.childList)
  })
  return list
}

const operState = reactive({
  deptId: '',
  title: '',
  showEdit: false
})
const handleEdit = (id?: string) => {
  operState.deptId = id ?? ''
  operState.title = id ? '修改部门' : '添加部门'
  operState.showEdit = true
}
const handleDel = (id: string) => {
  messageConfirm({message: '确认要删除该部门吗？'})
  .then(() => {
    delDepart(id)
  })
}
const { run: delDepart } = useRequest(id => reqApi.depart.deptDel({ deptId: id }), {
  onSuccess: () => {
    message.success('删除成功')
    getList()
  }
})
</script>
