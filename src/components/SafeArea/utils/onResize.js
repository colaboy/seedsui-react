function onResize(fn) {
  if (!window.autoSafeAreaResizeEvent) {
    // Listener viewer change
    requestAnimationFrame(() => {
      fn()
    })

    // Listener url change
    // window.addEventListener('popstate', fn, false)
  }
}

export default onResize
