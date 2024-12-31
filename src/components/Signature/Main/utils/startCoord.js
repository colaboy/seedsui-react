// 计算无素的top left bottom center的起始绘制位置，能够保证此元素正好绘制到指定的英文位置
function startCoord(targetWidth, targetHeight, position, { width, height }) {
  let posArr = position.split(' ').map(function (item, index) {
    let x = 0
    let y = 0
    // 如果是数字
    if (!isNaN(item)) {
      if (index === 0) return { x: item }
      if (index === 1) return { y: item }
    }
    // 如果是字符串
    if (item === 'top') return { y: 0 }
    if (item === 'left') return { x: 0 }
    if (item === 'right') {
      x = width < targetWidth ? 0 : width - targetWidth
      return { x: x }
    }
    if (item === 'bottom') {
      y = height < targetHeight ? 0 : height - targetHeight
      return { y: y }
    }
    if (item === 'center') {
      x = (width - targetWidth) / 2
      return { x: x }
    }
    if (item === 'middle') {
      y = (height - targetHeight) / 2
      return { y: y }
    }
    return { x: 0, y: 0 }
  })
  let posJson = {
    x: 0,
    y: 0
  }
  posArr.forEach(function (item) {
    if (item.x) {
      posJson.x = item.x
    } else if (item.y) {
      posJson.y = item.y
    }
  })
  return {
    x: posJson.x || 0,
    y: posJson.y || 0
  }
}

export default startCoord
