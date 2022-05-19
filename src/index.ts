const MEDIA = '(prefers-color-scheme: dark)'

class Theme {
  constructor() {
    const media = window.matchMedia(MEDIA)
    try {
      media.addEventListener('change', this.handleMediaQuery)
    }
    catch (e1) {
      try {
        // Safari
        media.addListener(this.handleMediaQuery)
      }
      catch (e2) {
        console.error(e2)
      }
    }
    this.handleMediaQuery(media)
  }

  handleMediaQuery(e: MediaQueryListEvent | MediaQueryList) {
    console.log('media', e)
  }
}

export default Theme
