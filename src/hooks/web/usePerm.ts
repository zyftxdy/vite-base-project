import { useMenuStore } from '@/store'

export default function usePerm(args: string) {
  const menuStore = useMenuStore()
  const { userPerms } = storeToRefs(menuStore)
  const perm = ref(false)
  perm.value = unref(userPerms).includes(args)

  return perm
}
