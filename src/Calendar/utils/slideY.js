import getDateRowIndex from './getDateRowIndex'

// 上下拉动
function slideY(op, { type, duration, cellHeight, bodyHeight, activeDate, body, bodyY }) {
  // 添加动画
  body.style.transitionDuration = duration + 'ms'

  let newType = type
  let height = 0
  let translateY = 0

  // 展开
  if (op === 'expand') {
    height = bodyHeight
    translateY = 0
    bodyY.setAttribute('data-translateY', translateY)
    newType = 'month'
  }
  // 收缩
  else if (op === 'collapse') {
    height = cellHeight
    let weekRowIndex = getDateRowIndex(activeDate)
    translateY = -weekRowIndex * cellHeight
    bodyY.setAttribute('data-translateY', translateY)
    newType = weekRowIndex
  }
  // 维持现状
  else {
    height = body.getAttribute('data-height')
    translateY = bodyY.getAttribute('data-translateY')
  }
  body.style.height = height + 'px'
  bodyY.style.transform = 'translateY(' + translateY + 'px)'

  // 动画执行结束后刷新日历
  setTimeout(() => {
    // 清除动画
    body.style.transitionDuration = '0ms'

    // 重置拖动前高度
    body.removeAttribute('data-height')
  }, duration)

  return newType
}

export default slideY
