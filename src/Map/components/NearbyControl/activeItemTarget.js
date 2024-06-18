// 选中项
function activeItemTarget(target) {
  let container = target.closest('.mappage-info-card')
  if (!container) return

  // 记录最近选择的选中项，切换tab时要用
  container.nearbyActive = target.getAttribute('data-nearby-item-id')
  Array.from(container.querySelectorAll('.mappage-info-item')).forEach((el) => {
    el.classList.remove('active')
  })
  target.classList.add('active')
}

export default activeItemTarget
