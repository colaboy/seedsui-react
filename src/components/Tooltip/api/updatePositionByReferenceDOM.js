import getPositionByReferenceDOM from './getPositionByReferenceDOM'

// 修改元素位置相对于参考元素的定位
function updatePositionByReferenceDOM(
  current,
  { referenceDOM, animation, bottom, top, left, right, offset } = {}
) {
  // 自动计算位置
  let position = getPositionByReferenceDOM({ referenceDOM, animation })

  // 自定义位置
  if (typeof bottom === 'number') {
    current.style.bottom = bottom + 'px'
  } else if (typeof top === 'number') {
    current.style.top = top + 'px'
  }
  // 从下往上弹-计算位置
  else if (typeof position.bottom === 'number') {
    current.style.bottom = parseInt(position.bottom + (offset?.bottom || 0)) + 'px'
  }
  // 从上往下弹
  else if (typeof position.top === 'number') {
    current.style.top = parseInt(position.top + (offset?.top || 0)) + 'px'
  }

  // 自定义位置
  if (typeof left === 'number') {
    current.style.left = left + 'px'
  } else if (typeof right === 'number') {
    current.style.top = right + 'px'
  }
  // 左右弹出-计算位置
  // 左侧弹出
  else if (typeof position.left === 'number') {
    current.style.left = parseInt(position.left + (offset?.left || 0)) + 'px'
  }
  // 右侧弹出
  else if (typeof position.right === 'number') {
    current.style.right = parseInt(position.right + (offset?.right || 0)) + 'px'
  }
}

export default updatePositionByReferenceDOM
