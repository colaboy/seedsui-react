// eslint-disable-next-line
export default {
  // 根据动画判定方向
  getAnimationPosition: function (animation) {
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
  },
  // 将用于判断的动画格式化为css中的动画
  getDataAnimation: function (animation) {
    if (animation.indexOf('slideLeft') === 0) {
      return 'slideLeft'
    }
    if (animation.indexOf('slideRight') === 0) {
      return 'slideRight'
    }
    if (animation.indexOf('slideUp') === 0) {
      return 'slideUp'
    }
    if (animation.indexOf('slideDown') === 0) {
      return 'slideDown'
    }
    if (animation.indexOf('zoom') === 0) {
      return 'zoom'
    }
    if (animation.indexOf('fade') === 0) {
      return 'fade'
    }
    return 'fade'
  },
  // 根据源位置计算弹框位置
  getCoordinate: function (source, animation) {
    if (!source || Object.prototype.toString.call(source).indexOf('[object HTML') === -1)
      return null
    // 获取子元素的位置
    let rect = source.getBoundingClientRect()
    let top = null
    let bottom = null
    let left = null
    let right = null
    // 根据不同位置的弹窗，计算位置
    let position = this.getAnimationPosition(animation)
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
  },
  // 更新容器位置
  updateContainerPosition: function (params) {
    const { source, target, animation, offset } = params
    // 自动计算位置
    let position = this.getCoordinate(source, animation)
    // 从下往上弹
    if (typeof position.bottom === 'number') {
      target.style.bottom = parseInt(position.bottom + (offset?.bottom || 0)) + 'px'
    }
    // 从上往下弹
    else if (typeof position.top === 'number') {
      target.style.top = parseInt(position.top + (offset?.top || 0)) + 'px'
    }

    // 左侧弹出
    if (typeof position.left === 'number') {
      target.style.left = parseInt(position.left + (offset?.left || 0)) + 'px'
    }
    // 右侧弹出
    else if (typeof position.right === 'number') {
      target.style.right = parseInt(position.right + (offset?.right || 0)) + 'px'
    }
  }
}
