// 将用于判断的动画格式化为css中的动画
function getDataAnimation(animation) {
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
}

export default getDataAnimation
