// 创建debugger
function createDebugElement() {
  // 创建 div 元素
  const div = document.createElement('div')

  // 设置 id 和样式
  div.id = '_debug_trigger_'
  div.style.position = 'absolute'
  div.style.bottom = '44px'
  div.style.left = '0'
  div.style.width = '24px'
  div.style.height = '100px'
  div.style.zIndex = '999'

  // 将元素添加到 body
  document.body.appendChild(div)

  return div
}

export default createDebugElement
