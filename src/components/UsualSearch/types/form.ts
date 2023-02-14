export interface FormActionType {
  updateSchema: (field: string, list: any[]) => void
  getFieldsValue: () => Recordable
}
