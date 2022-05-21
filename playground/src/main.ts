import './style.css'
import Themes from '../../src/index'

// eslint-disable-next-line no-new
const themes = new Themes()

const themeForm = (document.getElementsByName('themeForm')[0]) as HTMLFormElement

const updateStatus = () => {
  themeForm.theme.value = themes.theme || 'auto'
  themeForm.sync.checked = themes.sync
}

themes.onChange = () => {
  updateStatus()
}

themeForm.theme.forEach((input: HTMLElement) => {
  input.addEventListener('change', (e: Event) => {
    const theme = (e.target as HTMLInputElement).value
    const sync = themeForm.sync.checked
    themes.theme = theme
    if (sync) {
      themes.commit()
    }
    updateStatus()
  })
})

themeForm.sync.addEventListener('change', (e: Event) => {
  const sync = (e.target as HTMLInputElement).checked
  themes.sync = sync
  updateStatus()
})

themeForm.btnRemove.addEventListener('click', () => {
  themes.theme = null
  themes.commit()
  updateStatus()
})

updateStatus()
