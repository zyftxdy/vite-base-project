import { cloneDeep } from 'lodash-es'
import { searchProps } from './../props'
import type { SearchOptions } from '#/base'
import type { ExtractPropTypes, Ref } from 'vue'

interface UseValuesProp {
  schemaRef: Ref<SearchOptions[]>
  searchForm: Recordable
  getProps: ExtractPropTypes<typeof searchProps>
}

export function useValues({ schemaRef, searchForm, getProps }: UseValuesProp) {
  const getFieldsValue = () => {
    return searchForm
  }

  const updateSchema = (field: string, list: any[]) => {
    schemaRef.value.map(item => {
      if (item.component === 'GROUP') {
        const i = item.subOptions.findIndex(n => n.field === field)
        if (i !== -1) {
          item.subOptions[i].optionsList = list
        }
      } else if (item.field === field) {
        item.optionsList = list
      }
    })
    schemaRef.value = unref(schemaRef).map(option => dealOptions(option))
  }

  const dealOptions = (target: SearchOptions) => {
    if (target.component === 'GROUP') {
      target.subOptions.map(m => dealOptions(m))
    } else {
      searchForm[target.field] = target.defaultValue
      target.optionsList &&
        target.optionsList.map(n => {
          n.optionKey = target.optionKey ? n[target.optionKey] : n.value
          n.optionLabel = target.optionLabel ? n[target.optionLabel] : n.label
        })
    }
    return target
  }

  watch(
    () => getProps.schema,
    options => {
      schemaRef.value = cloneDeep(options).map(option => {
        return dealOptions(option)
      })
    },
    {
      deep: true,
      immediate: true
    }
  )

  return {
    getFieldsValue,
    updateSchema
  }
}
