import Months from './Months'

// 上下拉动
function slideY(op, { duration, weekStart, drawDate, cellHeight, bodyHeight, body, bodyY }) {
  // 添加动画
  body.style.transitionDuration = duration + 'ms'

  let height = 0
  let translateY = 0
  let drawDateRowIndex = Months.getDateRowIndex(drawDate, weekStart)

  // 样式标记展开和收缩, 暂时无意义
  if (op) {
    body.classList.remove('expand')
    body.classList.remove('collapse')
    body.classList.add(op)
  }

  // 展开
  if (op === 'expand') {
    height = bodyHeight
    translateY = 0
    bodyY.setAttribute('data-translateY', translateY)
  }
  // 收缩
  else if (op === 'collapse') {
    height = cellHeight

    translateY = -drawDateRowIndex * cellHeight
    bodyY.setAttribute('data-translateY', translateY)
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
}

export default slideY
