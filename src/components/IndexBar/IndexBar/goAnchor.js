import activeButton from './activeButton'

// 滚动到指定位置
function goAnchor({ scrollerDOM, sidebarDOM, tooltipDOM, x, y }) {
  let currentButtonDOM = document.elementFromPoint(x, y)
  if (!currentButtonDOM?.classList?.contains?.('indexbar-button')) return

  // 获取link文本
  let linkName = currentButtonDOM.getAttribute('data-indexbar-link')
  if (!linkName) return

  // 选中button
  activeButton(currentButtonDOM, sidebarDOM)

  // 修改tooltip文字
  tooltipDOM.innerHTML = linkName || ''

  // 对应滚动容器中的目标元素
  let anchor = scrollerDOM.querySelector('[data-indexbar-anchor="' + linkName + '"]')

  // 移动位置
  if (anchor) scrollerDOM.scrollTop = anchor.offsetTop
}

export default goAnchor
