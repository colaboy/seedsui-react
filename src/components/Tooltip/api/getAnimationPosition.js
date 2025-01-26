// 根据动画判定方向
function getAnimationPosition(animation) {
  // 构建动画
  let position = ''
  switch (animation) {
    case 'slideLeft':
      position = 'right-middle'
      break
    case 'slideRight':
      position = 'left-middle'
      break
    case 'slideUp':
      position = 'bottom-center'
      break
    case 'slideDown':
      position = 'top-center'
      break
    case 'zoom':
      position = 'middle'
      break
    case 'fade':
      position = 'middle'
      break
    // Tooltip弹窗特有属性
    case 'slideUpLeft':
    case 'zoomUpLeft':
    case 'fadeUpLeft':
      position = 'bottom-left'
      break
    case 'slideDownLeft':
    case 'zoomDownLeft':
    case 'fadeDownLeft':
      position = 'top-left'
      break
    case 'slideUpRight':
    case 'zoomUpRight':
    case 'fadeUpRight':
      position = 'bottom-right'
      break
    case 'slideDownRight':
    case 'zoomDownRight':
    case 'fadeDownRight':
      position = 'top-right'
      break
    default:
      position = 'middle'
  }
  return position
}

export default getAnimationPosition
