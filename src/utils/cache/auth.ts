import Cookies from 'js-cookie'

class CookieCache {
  private TokenKey = 'Token'

  get() {
    return Cookies.get(this.TokenKey)
  }
  set(token: string) {
    return Cookies.set(this.TokenKey, token)
  }
  remove() {
    return Cookies.remove(this.TokenKey)
  }
}

export default new CookieCache()
