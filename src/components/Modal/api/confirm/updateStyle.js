// 更新class和style
function updateStyle(target, { style, className, baseClassName }) {
  if (!target) return

  // 还原样式
  target.setAttribute('style', '')
  target.setAttribute('class', baseClassName)

  // 增加样式
  if (style) {
    for (let stylePropName in style) {
      target.style[stylePropName] = style[stylePropName]
    }
  }
  if (className) {
    target.className = `${baseClassName}${className ? ' ' + className : ''}`
  }
}

export default updateStyle
