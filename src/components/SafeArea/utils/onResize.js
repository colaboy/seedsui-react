function onResize(fn) {
  if (!window.autoSafeAreaResizeEvent) {
    // Singleton
    window.autoSafeAreaResizeEvent = true

    // Singleton
    window.removeEventListener('popstate', fn, false)

    // Press physical back keying, history.back
    window.addEventListener('popstate', fn, false)

    // 闭包, 防止window.history.pushState被外部修改
    ;(function () {
      let originalPushState = window.history.pushState

      // history.push
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
    })()
  }
}

export default onResize
