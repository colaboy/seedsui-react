// Singleton reize event
function onResize(fn) {
  if (typeof fn !== 'function') return

  // Singleton
  if (!window.autoSafeAreaResizeEvent) {
    window.autoSafeAreaResizeEvent = true

    // Press physical back keying, history.back
    window.removeEventListener('popstate', fn, false)
    window.addEventListener('popstate', fn, false)

    // 改写原型, 若不单例, 改写两次相同的方法将会死循环
    // history.push
    let originalPushState = window.history.pushState
    window.history.pushState = function () {
      fn && fn()
      originalPushState.apply(window.history, arguments)
    }

    // Page init, history.replace
    let originalReplaceState = window.history.replaceState
    window.history.replaceState = function () {
      fn && fn()
      originalReplaceState.apply(window.history, arguments)
    }
  }
}

export default onResize
