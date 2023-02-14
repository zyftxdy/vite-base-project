import type { FormActionType } from '../types/form'

export function useSearch() {
  const searchFrom = ref<Recordable>({})
  const formRef = ref<FormActionType>()

  const register = (formAction: FormActionType) => {
    formRef.value = formAction
    searchFrom.value = formAction.getFieldsValue()
  }

  const updateSchema = (field: string, list: any[]) => {
    unref(formRef)?.updateSchema(field, list)
  }

  return {
    register,
    searchFrom,
    updateSchema
  }
}
