import { defineStore } from 'pinia'

export const useRouteParamsStore = defineStore('routeParams', () => {
  const params = ref<Recordable>({})

  const setParams = (data: Recordable) => {
    params.value = data
  }

  return {
    params,
    setParams
  }
})
