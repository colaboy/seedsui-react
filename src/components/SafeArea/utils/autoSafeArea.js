import needsSafeArea from './needsSafeArea'
import onResize from './onResize'

// Set global safe area
function autoSafeArea({ className = 'auto-safe-area-children', isSafeArea, debug } = {}) {
  if (typeof isSafeArea === 'function') {
    window.seedsIsSafeArea = isSafeArea()
  }
  if (debug) {
    document.documentElement.classList.add(className)
    document.documentElement.style.setProperty('--safe-area-inset-top', '44px')
    document.documentElement.style.setProperty('--safe-area-inset-bottom', '34px')
    return
  }
  if (needsSafeArea()) {
    document.documentElement.classList.add(className)
  } else {
    document.documentElement.classList.remove(className)
  }
}

function init(config) {
  autoSafeArea(config)
  onResize(() => {
    autoSafeArea(config)
  })
}

export default init
