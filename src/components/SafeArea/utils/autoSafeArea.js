import needsSafeArea from './needsSafeArea'

// Set global safe area
function autoSafeArea(className = 'auto-safe-area-children') {
  if (needsSafeArea()) {
    document.documentElement.classList.add(className)
  } else {
    document.documentElement.classList.remove(className)
  }
}

export default autoSafeArea
