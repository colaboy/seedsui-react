// 滚动到指定位置
function getAnchor({ x, y }) {
  let currentButtonDOM = document.elementFromPoint(x, y)
  if (!currentButtonDOM?.classList?.contains?.('indexbar-button')) return ''

  // 获取当前选中项
  let anchor = currentButtonDOM.getAttribute('data-indexbar-anchor-button')
  if (!anchor) return ''

  return anchor
}

export default getAnchor
