export const getPropsSlot = (slots: Recordable, props: Recordable, prop = 'default') => {
  return props[prop] ?? slots[prop]?.()
}
