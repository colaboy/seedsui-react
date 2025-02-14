// popsate run latest window.autoSafeAreaResizeHandle
function handleAutoSafeAreaPopState() {
  window.autoSafeAreaResizeHandle()
}

// Singleton reize event
function onResize(fn) {
  if (typeof fn !== 'function') return

  // Update fn to window.autoSafeAreaResizeHandle
  window.autoSafeAreaResizeHandle = fn

  // Singleton
  if (!window.autoSafeAreaResizeEvent) {
    window.autoSafeAreaResizeEvent = true

    // Press physical back keying, history.back
    window.removeEventListener('popstate', handleAutoSafeAreaPopState, false)
    window.addEventListener('popstate', handleAutoSafeAreaPopState, false)

    // 改写原型, 若不单例, 改写两次相同的方法将会死循环
    // history.push
    let originalPushState = window.history.pushState
    window.history.pushState = function () {
      handleAutoSafeAreaPopState()
      originalPushState.apply(window.history, arguments)
    }

    // Page init, history.replace
    let originalReplaceState = window.history.replaceState
    window.history.replaceState = function () {
      handleAutoSafeAreaPopState()
      originalReplaceState.apply(window.history, arguments)
    }
  }
}

export default onResize
