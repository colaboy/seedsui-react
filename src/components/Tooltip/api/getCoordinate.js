import getAnimationPosition from './getAnimationPosition'

// 根据源位置计算弹框位置
function getCoordinate(source, animation) {
  if (!source || Object.prototype.toString.call(source).indexOf('[object HTML') === -1) return null
  // 获取子元素的位置
  let rect = source.getBoundingClientRect()
  let top = null
  let bottom = null
  let left = null
  let right = null
  // 根据不同位置的弹窗，计算位置
  let position = getAnimationPosition(animation)
  // 从下往上弹
  if (position.indexOf('bottom') === 0) {
    bottom = window.innerHeight - rect.top
  }
  // 从上往下弹
  else {
    top = rect.top + rect.height
  }

  // 左侧弹出
  if (position.indexOf('left') !== -1) {
    left = rect.left
  }
  // 右侧弹出
  else if (position.indexOf('right') !== -1) {
    right = window.innerWidth - rect.left - rect.width
  }
  return {
    bottom,
    top,
    left,
    right
  }
}

export default getCoordinate
