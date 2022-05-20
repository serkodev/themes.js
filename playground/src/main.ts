import './style.css'
import Themes from '../../src/index'

// eslint-disable-next-line no-new
const themes = new Themes()

const handleThemeSelected = (e: Event) => {
  const theme = (e.target as HTMLInputElement).value
  themes.setTheme(theme)
}

document.querySelectorAll('input[name=\'theme\']').forEach((input) => {
  input.addEventListener('change', handleThemeSelected)
})
