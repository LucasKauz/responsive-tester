import Color from 'color'
import hotjar from './hotjar';
import './scss/main.scss'

// Root
const root = document.documentElement;

class DeviceSwitcher {
  
  constructor (main) {
    this.main = main
  }

  setPhone () {
    this.main.classList.remove('watch-mode')
  }

  setWatch () {
    this.main.classList.add('watch-mode')
  }
}

window.addEventListener('DOMContentLoaded', function () {
  // hotjar is just a test
  if (window.location.hash === '#hotjar') {
    hotjar()
  }

  const deviceSwitcher = new DeviceSwitcher(document.body)

  const colorBtns = [...document.getElementsByClassName('ColorSwitcher__btn')]
  colorBtns.forEach(el => {
    el.style.backgroundColor = el.dataset['color']
    el.addEventListener('click', (e) => {
      const btnColor = e.target.dataset['color']

      root.style.setProperty('--base', btnColor)
      root.style.setProperty('--base-200', Color(btnColor).darken(0.3))
    })
  })

  document.getElementById('SwitchPhone').addEventListener('click', () => {
    deviceSwitcher.setPhone()
  })

  document.getElementById('SwitchWatch').addEventListener('click', () => {
    deviceSwitcher.setWatch()
  })
})