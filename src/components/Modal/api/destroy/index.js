import globalModalId from './../confirm/globalModalId'

// 移除Modal
function destroy(mask) {
  if (!mask) {
    // eslint-disable-next-line
    mask = document.getElementById(globalModalId)
  }
  if (mask) {
    // 动画移除
    mask.classList.remove('active')
    mask.querySelector('.modal-alert').classList.remove('active')

    // DOM移除
    if (mask.timeout) window.clearTimeout(mask.timeout)
    mask.timeout = setTimeout(() => {
      mask?.parentNode?.removeChild?.(mask)
    }, 300)
  }
}

export default destroy
