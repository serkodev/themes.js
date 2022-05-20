const MEDIA = '(prefers-color-scheme: dark)'

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e)
    e = window.matchMedia(MEDIA)

  const isDark = e.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

class Theme {
  removeListenerFunc?: Function
  currentTheme = ''

  constructor(theme = 'auto') {
    this.setTheme(theme)
  }

  private observe() {
    if (this.removeListenerFunc !== undefined)
      return

    const media = window.matchMedia(MEDIA)
    const handler = this.handleMediaQuery.bind(this)
    try {
      media.addEventListener('change', handler)
      this.removeListenerFunc = () => {
        media.removeEventListener('change', handler)
      }
    } catch (e1) {
      try {
        // Safari
        media.addListener(handler)
        this.removeListenerFunc = () => {
          media.removeListener(handler)
        }
      } catch (e2) {
        console.error(e2)
      }
    }
    this.handleMediaQuery(media)
  }

  private stopObserve() {
    if (this.removeListenerFunc !== undefined) {
      this.removeListenerFunc()
      delete this.removeListenerFunc
    }
  }

  private handleMediaQuery(e: MediaQueryListEvent | MediaQueryList) {
    const theme = getSystemTheme(e)
    this.applyTheme(theme)
  }

  private applyTheme(theme: string) {
    if (theme === this.currentTheme)
      return

    const e = document.documentElement
    if (e.classList.contains(this.currentTheme)) {
      e.classList.remove(this.currentTheme)
    }
    e.classList.add(theme)
    this.currentTheme = theme
  }

  setTheme(theme: string) {
    if (theme === 'auto') {
      this.observe()
    } else {
      this.stopObserve()
      this.applyTheme(theme)
    }
  }
}

export default Theme
