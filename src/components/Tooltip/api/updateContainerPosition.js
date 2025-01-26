import getCoordinate from './getCoordinate'

function updateContainerPosition(params) {
  const { source, target, animation, bottom, top, left, right, offset } = params || {}
  // 自动计算位置
  let position = getCoordinate(source, animation)

  // 自定义位置
  if (typeof bottom === 'number') {
    target.style.bottom = bottom + 'px'
  } else if (typeof top === 'number') {
    target.style.top = top + 'px'
  }
  // 从下往上弹-计算位置
  else if (typeof position.bottom === 'number') {
    target.style.bottom = parseInt(position.bottom + (offset?.bottom || 0)) + 'px'
  }
  // 从上往下弹
  else if (typeof position.top === 'number') {
    target.style.top = parseInt(position.top + (offset?.top || 0)) + 'px'
  }

  // 自定义位置
  if (typeof left === 'number') {
    target.style.left = left + 'px'
  } else if (typeof right === 'number') {
    target.style.top = right + 'px'
  }
  // 左右弹出-计算位置
  // 左侧弹出
  else if (typeof position.left === 'number') {
    target.style.left = parseInt(position.left + (offset?.left || 0)) + 'px'
  }
  // 右侧弹出
  else if (typeof position.right === 'number') {
    target.style.right = parseInt(position.right + (offset?.right || 0)) + 'px'
  }
}

export default updateContainerPosition
