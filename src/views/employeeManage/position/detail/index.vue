<template>
  <el-form
    ref="formRef"
    :model="modelRef"
    :rules="rulesRef"
    label-width="100px"
    class="position_detail p-6 content-box"
  >
    <div class="flex">
      <div class="flex-1 mr-8">
        <el-form-item label="职位名称：" prop="name">
          <el-input v-model="modelRef.name" placeholder="请填写职位名称" maxlength="10" show-word-limit/>
        </el-form-item>
      </div>
      <div class="flex-1 mr-8">
        <el-form-item label="职位状态：" class="is-required">
          <el-radio-group v-model="modelRef.status">
            <el-radio label="NORMAL">启用</el-radio>
            <el-radio label="DISABLE">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="flex-1 mr-8"/>
    </div>
    <el-form-item label="备注：">
      <el-input
        type="textarea"
        v-model="modelRef.remarks"
        :rows="4"
        placeholder="请输入备注"
        maxlength="50"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="功能权限：" class="is-required">
      <el-tree
        ref="treeRef"
        :data="result"
        :props="{
          children: 'children',
          label: 'title'
        }"
        :check-strictly="true"
        show-checkbox
        default-expand-all
        node-key="resourceId"
        @check="nodeCheckClick"
      />
    </el-form-item>
    <el-form-item>
      <el-button class="btn-small btn-border-color" type="primary" @click="handleSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { useRouteQuery } from '@vueuse/router'
import type { ModelRef, CheckedList } from '../enum'
import type { FormInstance } from 'element-plus'
import type TreeStore from 'element-plus/es/components/tree/src/model/tree-store'
import type Node from 'element-plus/es/components/tree/src/model/node'

const { reqApi, message } = useCommon()
const { messageConfirm } = useMessage()

const formRef = ref<FormInstance>()
const modelRef = reactive<ModelRef>({
  name: '',
  status: 'NORMAL',
  remarks: '',
  resourceIds: []
})
const rulesRef = reactive({
  name: [{ required: true, message: '请输入职位名称', trigger: 'blur' }]
})
const roleId = useRouteQuery('id', '')
const treeRef = ref<TreeStore>()
const checkIds = computed(() => {
  let checkIds: string[] = []
  unref(treeRef)?.getCheckedNodes().map(item => {
    checkIds.push(item.resourceId)
  })
  return checkIds
})
const { run: getDetail } = useRequest(() => reqApi.role.roleInfo({ roleId: unref(roleId) }), {
  onSuccess: res => {
    Object.assign(modelRef, res)
    unref(treeRef)?.setCheckedKeys(modelRef.resourceIds)
  }
})
const { result } = useRequest<Recordable[]>(() => reqApi.common.getMenuTree(), {
  defaultValue: [],
  immediate: true,
  onSuccess: () => {
    unref(roleId) && getDetail()
  }
})

const handleSubmit = () => {
  unref(formRef)?.validate((valid, fields) => {
    if (valid) {
      const message = `确定要${unref(roleId) ? '修改' : '添加'}该职位吗？`
      messageConfirm({ message: message })
      .then(() => {
        submitForm()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const { run: submitForm } = useRequest(() => unref(roleId) ? reqApi.role.roleUpdate(modelRef) : reqApi.role.roleAdd(modelRef), {
  onBefore: () => {
    modelRef.resourceIds = checkIds.value
    modelRef.roleId = unref(roleId) ?? ''
  },
  onSuccess: () => {
    message.success(unref(roleId) ? '修改成功' : '添加成功')
    window.location.reload()
  }
})

// 菜单树操作
const nodeCheckClick = (data: Recordable, checkedList: CheckedList) => {
  const checked = checkedList.checkedKeys.includes(data.resourceId)
  const node = unref(treeRef)?.getNode(data) as Node
  nodePChange(node, checked)
  if (node.childNodes != null) {
    nodeCChange(node, checked)
  }
}
// 节点改变 - 父
const nodePChange = (node: Node, boolean: boolean) => {
  if (node && node.parent) {
    const parent = node.parent
    if (parent.childNodes.some(item => item.checked) && !boolean) return
    if (node.level >= 3 && !boolean) return
    unref(treeRef)?.setChecked(node.parent.key, boolean, false)
    node && nodePChange(node.parent, boolean)
  }
}
// 节点改变 - 子
const nodeCChange = (node: Node, boolean: boolean) => {
    if (node && node.childNodes) {
    node.childNodes.forEach(item => {
      unref(treeRef)?.setChecked(item.key, boolean, false)
      nodeCChange(item, boolean)
    })
  }
}
</script>

<style lang="scss" scoped>
.position_detail{
  :deep(.el-input),
  :deep(.el-textarea){
    width: 320px;
  }
  :deep(.el-tree){
    margin-top: 20px;
  }
}
</style>
