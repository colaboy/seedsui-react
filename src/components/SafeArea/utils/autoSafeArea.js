import needsSafeArea from './needsSafeArea'
import onResize from './onResize'

// Set global safe area
function autoSafeArea(className = 'auto-safe-area-children') {
  if (needsSafeArea()) {
    document.documentElement.classList.add(className)
  } else {
    document.documentElement.classList.remove(className)
  }
}

function init(className) {
  onResize(() => {
    autoSafeArea(className)
  })
}

export default init
