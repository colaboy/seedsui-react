import getTranslateValue from './getTranslateValue'
import MathUtil from './../../../MathUtil'

// 添加拖动事件
function DragList({
  container,
  lists,
  cellSize = 44,
  // 拖动结束返回项数
  onDragEnd
}) {
  let touches = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    endX: 0,
    endY: 0,
    startTimeStamp: 0,
    duration: 0,
    diffX: 0,
    diffY: 0,
    posY: 0,
    currentPosY: 0,
    direction: null
  }

  let slot = null
  let slotIndex = null
  let slotHeight = null

  // 触摸事件
  function onTouchStart(e) {
    slot = e.target
    slotIndex = slot.getAttribute('slotindex')
    slotHeight = (lists[slotIndex].length - 1) * cellSize

    touches.startX = e.clientX || e.touches[0].clientX
    touches.startY = e.clientY || e.touches[0].clientY
    touches.posY = Number(getTranslateValue(slot.style.transform) || 0)

    // 清除动画
    slot.style.webkitTransitionDuration = 0

    // 记录点击时间
    touches.startTimeStamp = e.timeStamp
  }
  function onTouchMove(e) {
    e.preventDefault()

    touches.currentY = e.clientY || e.touches[0].clientY
    touches.diffY = touches.startY - touches.currentY
    touches.currentPosY = touches.posY - touches.diffY

    slot.style.webkitTransform = `translateY(${touches.currentPosY}px)`
  }
  function onTouchEnd(e) {
    touches.endX = e.clientX || e.changedTouches[0].clientX
    touches.endY = e.clientY || e.changedTouches[0].clientY
    touches.diffX = touches.startX - touches.endX
    touches.diffY = touches.startY - touches.endY
    // 判断是否是tap
    if (Math.abs(touches.diffX) < 6 && Math.abs(touches.diffY) < 6) {
      return
    }

    // 计算拖动时间
    touches.duration = e.timeStamp - touches.startTimeStamp

    // 惯性值计算
    let inertia = MathUtil.inertia({
      cellSize: cellSize,
      distance: touches.diffY,
      duration: touches.duration,
      currentPosition: touches.currentPosY,
      minPosition: 0,
      maxPosition: slotHeight
    })

    // 如果touches.diffY为负数, 则向上拉动, translateY向上为负数
    let position = -inertia.position

    // 滚动到指定位置
    slot.style.webkitTransitionDuration = inertia.duration + 'ms'
    slot.posY = position
    slot.style.webkitTransform = `translateY(${position}px)`

    // 更新值
    onDragEnd &&
      onDragEnd({
        slotIndex: slotIndex,
        rowIndex: inertia.index
      })
  }

  function events(action) {
    container[action]('touchstart', onTouchStart, false)
    container[action]('touchmove', onTouchMove, false)
    container[action]('touchend', onTouchEnd, false)
    container[action]('touchcancel', onTouchEnd, false)
  }

  return {
    events: events
  }
}

export default DragList
