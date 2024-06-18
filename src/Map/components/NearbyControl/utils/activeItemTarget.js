// 选中项
function activeItemTarget(target) {
  let container = target.closest('.map-nearbyControl')
  if (!container) return
  Array.from(container.querySelectorAll('.map-nearbyControl-item')).forEach((el) => {
    el.classList.remove('active')
  })
  target.classList.add('active')
}

export default activeItemTarget
