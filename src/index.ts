const MEDIA = '(prefers-color-scheme: dark)'

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e)
    e = window.matchMedia(MEDIA)

  const isDark = e.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

class Theme {
  _theme: string | null = null

  // sync with other window with same localstorage
  _sync = false

  onChange?: Function

  private removeMediaListenerFunc?: Function
  private removeStorageListenerFunc?: Function
  private documentTheme = ''
  private storageKey = 'theme'

  constructor(theme?: string) {
    if (theme) {
      this.theme = theme
    } else {
      this.theme = null
    }
  }

  // localStorage
  private loadTheme(): string | undefined {
    try {
      const theme = localStorage.getItem(this.storageKey)
      return theme || undefined
    } catch (e) {}
  }

  private observeStorage() {
    if (this.removeStorageListenerFunc !== undefined)
      return

    const handler = (e: StorageEvent) => {
      if (e.key !== this.storageKey) {
        return
      }
      this.setTheme(e.newValue || undefined)
    }
    window.addEventListener('storage', handler)
    this.removeStorageListenerFunc = () => {
      window.removeEventListener('storage', handler)
    }

    this.setTheme(this.loadTheme())
  }

  // media
  private observe() {
    if (this.removeMediaListenerFunc !== undefined)
      return

    const media = window.matchMedia(MEDIA)
    const handler = this.handleMediaQuery.bind(this)
    try {
      media.addEventListener('change', handler)
      this.removeMediaListenerFunc = () => {
        media.removeEventListener('change', handler)
      }
    } catch (e1) {
      try {
        // Safari
        media.addListener(handler)
        this.removeMediaListenerFunc = () => {
          media.removeListener(handler)
        }
      } catch (e2) {
        console.error(e2)
      }
    }
    this.handleMediaQuery(media)
  }

  private handleMediaQuery(e: MediaQueryListEvent | MediaQueryList) {
    const theme = getSystemTheme(e)
    this.applyTheme(theme)
  }

  private applyTheme(theme: string) {
    if (theme === this.documentTheme)
      return

    const e = document.documentElement
    if (e.classList.contains(this.documentTheme)) {
      e.classList.remove(this.documentTheme)
    }
    e.classList.add(theme)
    this.documentTheme = theme

    if (this.onChange) {
      this.onChange(theme)
    }
  }

  private setTheme(theme = 'auto') {
    this._theme = theme

    if (theme === 'auto') {
      this.observe()
    } else {
      // remove if needed
      if (this.removeMediaListenerFunc !== undefined) {
        this.removeMediaListenerFunc()
        delete this.removeMediaListenerFunc
      }
      this.applyTheme(theme)
    }
  }

  get theme() {
    return this._theme
  }

  set theme(theme: string | null) {
    this._theme = theme

    if (!theme) {
      this.sync = true
    } else {
      this.sync = false
      this.setTheme(theme)
    }
  }

  get sync() {
    return this._sync
  }

  set sync(sync: boolean) {
    if (this._sync === sync)
      return
    this._sync = sync

    if (sync) {
      this.observeStorage()
    } else {
      if (this.removeStorageListenerFunc) {
        this.removeStorageListenerFunc()
        delete this.removeStorageListenerFunc
      }
    }
  }

  commit(sync = true) {
    // save theme to local storage
    try {
      if (this.theme) {
        localStorage.setItem(this.storageKey, this.theme)
      } else {
        localStorage.removeItem(this.storageKey)
      }
    } catch (e) {}

    this.sync = sync
  }
}

export default Theme
