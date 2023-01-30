class LocalCache {
  set(key: string, value: any) {
    if (!key) {
      return
    }
    value = JSON.stringify(value)
    window.localStorage.setItem(key, value)
  }
  get(key: string) {
    if (!key) {
      return
    }
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : ''
  }
  remove(key: string) {
    if (!key) {
      return
    }
    window.localStorage.removeItem(key)
  }
  clear() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
