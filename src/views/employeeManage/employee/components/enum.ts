export interface ModelRef {
  name: string
  mobile: string
  roleId: string
  deptId: string
  status: string
  userId?: string
}

export const rules = {
  name: [{ required: true, message: '请填写员工姓名', trigger: 'blur' }],
  mobile: [{ required: true, message: '请填写手机号码', trigger: 'blur' }],
  deptId: [{ required: true, message: '请选择部门', trigger: 'change' }],
  roleId: [{ required: true, message: '请选择职位', trigger: 'change' }]
}
