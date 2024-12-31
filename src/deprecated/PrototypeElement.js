// 获取样式
Element.prototype.getStyles = function () {
  return window.getComputedStyle(this)
}

Element.prototype.getStyleValue = function (property) {
  return window.getComputedStyle(this).getPropertyValue(property)
}

// 获取当前容器距离目标父容器的间距
Element.prototype.getOffsetTop = function (targetEl) {
  let currentEl = this
  if (!targetEl || !currentEl) return 0
  let offsetTop = 0
  function sumOffsetTop(el) {
    if (targetEl.innerHTML === el.innerHTML || !el || el.tagName === 'BODY') return
    offsetTop += el.offsetTop
    sumOffsetTop(el.parentNode)
  }
  return sumOffsetTop(currentEl)
}

// 获取当前容器距离目标父容器的间距
Element.prototype.getOffsetBottom = function (targetEl) {
  let currentEl = this
  if (!targetEl || !currentEl) return 0
  let offsetTop = getOffsetTop(currentEl, targetEl) + currentEl.offsetHeight
  return targetEl.scrollHeight - offsetTop
}

// 滚动高度和容器高度不一致说明有更多
Element.prototype.isTextMore = function () {
  let currentEl = this
  if (Math.abs(currentEl.scrollHeight - currentEl.clientHeight) > 2) {
    return true
  }
  return false
}
