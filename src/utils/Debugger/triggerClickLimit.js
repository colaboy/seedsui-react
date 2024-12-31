// Click limit times to callback
function triggerClickLimit(element, limit = 10, callback) {
  if (!element || element?.hasEventListener) return
  let clickCount = 0

  element.hasEventListener = true
  element.addEventListener('click', function () {
    clickCount++
    if (clickCount > limit) {
      callback && callback()
    }
  })
}

export default triggerClickLimit
